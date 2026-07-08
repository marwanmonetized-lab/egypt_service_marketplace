import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export type NotificationType =
  | "booking_confirmed"
  | "provider_accepted"
  | "provider_arrived"
  | "service_completed"
  | "booking_cancelled"
  | "review_reminder"
  | "loyalty_reward"
  | "special_offer"
  | "payment_received";

export interface NotificationPayload {
  type: NotificationType;
  title: string;
  body: string;
  data?: Record<string, any>;
}

/**
 * Initialize push notifications
 */
export async function initializeNotifications() {
  // Set notification handler
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowBanner: true,
      shouldShowList: true,
    } as any),
  });

  // Request permissions
  if (Platform.OS !== "web") {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      console.warn("Notification permissions not granted");
    }
  }
}

/**
 * Send a local notification
 */
export async function sendLocalNotification(payload: NotificationPayload) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: payload.title,
        body: payload.body,
        data: {
          type: payload.type,
          ...payload.data,
        },
        sound: "default",
        badge: 1,
      },
      trigger: { seconds: 1 } as any,
    });
  } catch (error) {
    console.error("Failed to send notification:", error);
  }
}

/**
 * Get push token for remote notifications
 */
export async function getPushToken(): Promise<string | null> {
  try {
    if (Platform.OS === "web") {
      return null;
    }

    const token = await Notifications.getExpoPushTokenAsync();
    return token.data;
  } catch (error) {
    console.error("Failed to get push token:", error);
    return null;
  }
}

/**
 * Notification templates for common scenarios
 */
export const notificationTemplates = {
  bookingConfirmed: (providerName: string, date: string, time: string): NotificationPayload => ({
    type: "booking_confirmed",
    title: "Booking Confirmed!",
    body: `Your booking with ${providerName} on ${date} at ${time} is confirmed.`,
  }),

  providerAccepted: (providerName: string): NotificationPayload => ({
    type: "provider_accepted",
    title: "Provider Accepted",
    body: `${providerName} has accepted your booking request.`,
  }),

  providerArrived: (providerName: string): NotificationPayload => ({
    type: "provider_arrived",
    title: "Provider Arrived",
    body: `${providerName} has arrived at your location.`,
  }),

  serviceCompleted: (providerName: string, amount: number): NotificationPayload => ({
    type: "service_completed",
    title: "Service Completed",
    body: `${providerName} has completed the service. Total: EGP ${amount}`,
  }),

  bookingCancelled: (reason: string): NotificationPayload => ({
    type: "booking_cancelled",
    title: "Booking Cancelled",
    body: `Your booking has been cancelled. Reason: ${reason}`,
  }),

  reviewReminder: (providerName: string): NotificationPayload => ({
    type: "review_reminder",
    title: "Share Your Feedback",
    body: `How was your experience with ${providerName}? Leave a review to help others.`,
  }),

  loyaltyReward: (points: number, tier: string): NotificationPayload => ({
    type: "loyalty_reward",
    title: "Loyalty Points Earned!",
    body: `You've earned ${points} points. You're now ${tier} tier member!`,
  }),

  specialOffer: (discount: number, service: string): NotificationPayload => ({
    type: "special_offer",
    title: "Special Offer for You",
    body: `Get ${discount}% off on ${service} services today only!`,
  }),

  paymentReceived: (amount: number): NotificationPayload => ({
    type: "payment_received",
    title: "Payment Received",
    body: `Payment of EGP ${amount} has been received successfully.`,
  }),
};

/**
 * Listen to notification responses
 */
export function setupNotificationListeners(
  onNotificationResponse: (notification: Notifications.Notification) => void
) {
  const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
    onNotificationResponse(response.notification);
  });

  return subscription;
}

/**
 * Schedule a notification for a specific time
 */
export async function scheduleNotificationForTime(
  payload: NotificationPayload,
  date: Date
) {
  try {
    const trigger = new Date(date);
    trigger.setSeconds(0);

    await Notifications.scheduleNotificationAsync({
      content: {
        title: payload.title,
        body: payload.body,
        data: {
          type: payload.type,
          ...payload.data,
        },
        sound: "default",
        badge: 1,
      },
      trigger: { date: trigger } as any,
    });
  } catch (error) {
    console.error("Failed to schedule notification:", error);
  }
}

/**
 * Cancel all pending notifications
 */
export async function cancelAllNotifications() {
  try {
    await Notifications.cancelAllScheduledNotificationsAsync();
  } catch (error) {
    console.error("Failed to cancel notifications:", error);
  }
}

/**
 * Get all scheduled notifications
 */
export async function getScheduledNotifications() {
  try {
    return await Notifications.getAllScheduledNotificationsAsync();
  } catch (error) {
    console.error("Failed to get scheduled notifications:", error);
    return [];
  }
}
