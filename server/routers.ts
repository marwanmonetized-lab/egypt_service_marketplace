import { COOKIE_NAME } from "../shared/const.js";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  providers: router({
    list: publicProcedure.query(() => {
      return [
        {
          id: 1,
          name: "Ahmed's Electrical",
          service: "Electrician",
          rating: 48,
          reviewCount: 245,
          pricePerHour: 150,
        },
      ];
    }),
  }),

  bookings: router({
    create: protectedProcedure
      .input(
        z.object({
          providerId: z.number(),
          serviceId: z.number(),
          bookingDate: z.string(),
          bookingTime: z.string(),
          specialRequests: z.string().optional(),
          paymentMethod: z.enum(["cod", "card", "fawry"]),
          totalAmount: z.number(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Create booking in database
        const bookingId = await db.createBooking({
          userId: ctx.user.id,
          providerId: input.providerId,
          serviceId: input.serviceId,
          bookingDate: input.bookingDate,
          bookingTime: input.bookingTime,
          specialRequests: input.specialRequests || null,
          paymentMethod: input.paymentMethod,
          totalAmount: input.totalAmount,
          status: "pending",
        });
        return bookingId;
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserBookings(ctx.user.id);
    }),

    getActive: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserActiveBookings(ctx.user.id);
    }),

    getPast: protectedProcedure.query(async ({ ctx }) => {
      return db.getUserPastBookings(ctx.user.id);
    }),
  }),
});

export type AppRouter = typeof appRouter;
