/**
 * Payment Gateway Integration Module
 * Supports: Paymob, Fawry, and Cash on Delivery
 */

export type PaymentMethod = "cod" | "card" | "fawry";

export interface PaymentRequest {
  bookingId: number;
  amount: number; // in EGP
  currency: string; // "EGP"
  description: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: PaymentMethod;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message: string;
  redirectUrl?: string;
}

/**
 * Paymob Payment Integration
 * Supports credit/debit cards and mobile wallets
 */
export async function initiatePaymobPayment(request: PaymentRequest): Promise<PaymentResponse> {
  try {
    // In production, this would call your backend API
    // which would communicate with Paymob's API
    const response = await fetch("/api/payments/paymob", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId: request.bookingId,
        amount: request.amount,
        currency: request.currency,
        description: request.description,
        customerEmail: request.customerEmail,
        customerPhone: request.customerPhone,
      }),
    });

    if (!response.ok) {
      throw new Error("Paymob payment initiation failed");
    }

    const data = await response.json();
    return {
      success: true,
      transactionId: data.transactionId,
      redirectUrl: data.paymentUrl,
      message: "Redirecting to payment gateway...",
    };
  } catch (error) {
    console.error("Paymob payment error:", error);
    return {
      success: false,
      message: "Failed to initiate Paymob payment",
    };
  }
}

/**
 * Fawry Payment Integration
 * Supports Fawry wallet and bill payment
 */
export async function initiateFawryPayment(request: PaymentRequest): Promise<PaymentResponse> {
  try {
    // In production, this would call your backend API
    // which would communicate with Fawry's API
    const response = await fetch("/api/payments/fawry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId: request.bookingId,
        amount: request.amount,
        currency: request.currency,
        description: request.description,
        customerEmail: request.customerEmail,
        customerPhone: request.customerPhone,
      }),
    });

    if (!response.ok) {
      throw new Error("Fawry payment initiation failed");
    }

    const data = await response.json();
    return {
      success: true,
      transactionId: data.transactionId,
      redirectUrl: data.paymentUrl,
      message: "Redirecting to Fawry payment...",
    };
  } catch (error) {
    console.error("Fawry payment error:", error);
    return {
      success: false,
      message: "Failed to initiate Fawry payment",
    };
  }
}

/**
 * Cash on Delivery Payment
 * No payment processing needed, payment collected at service completion
 */
export async function initiateCODPayment(request: PaymentRequest): Promise<PaymentResponse> {
  try {
    // For COD, we just need to confirm the booking
    // Payment will be collected when the service is completed
    return {
      success: true,
      transactionId: `COD-${request.bookingId}`,
      message: "Payment will be collected upon service completion",
    };
  } catch (error) {
    console.error("COD payment error:", error);
    return {
      success: false,
      message: "Failed to process COD payment",
    };
  }
}

/**
 * Process payment based on selected method
 */
export async function processPayment(request: PaymentRequest): Promise<PaymentResponse> {
  switch (request.paymentMethod) {
    case "card":
      return initiatePaymobPayment(request);
    case "fawry":
      return initiateFawryPayment(request);
    case "cod":
      return initiateCODPayment(request);
    default:
      return {
        success: false,
        message: "Invalid payment method",
      };
  }
}

/**
 * Verify payment status (called after payment gateway redirect)
 */
export async function verifyPayment(transactionId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/payments/verify/${transactionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Payment verification failed");
    }

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Payment verification error:", error);
    return false;
  }
}
