/**
 * Payment Processing Module
 * Integrates with Paymob and Fawry payment gateways for Egyptian market
 */

export type PaymentMethod = "card" | "fawry" | "cod" | "wallet";
export type PaymentStatus = "pending" | "processing" | "completed" | "failed" | "refunded";

export interface PaymentTransaction {
  id: string;
  bookingId: string;
  amount: number;
  currency: "EGP";
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
  completedAt?: string;
  refundedAt?: string;
  refundAmount?: number;
  metadata?: Record<string, any>;
}

export interface PaymobConfig {
  apiKey: string;
  integrationId: string;
  iframeId: string;
}

export interface FawryConfig {
  merchantCode: string;
  securityKey: string;
  apiUrl: string;
}

/**
 * Initialize Paymob payment gateway
 */
export async function initializePaymob(config: PaymobConfig): Promise<boolean> {
  try {
    // In production, this would validate the API key with Paymob
    console.log("Paymob initialized with integration ID:", config.integrationId);
    return true;
  } catch (error) {
    console.error("Failed to initialize Paymob:", error);
    return false;
  }
}

/**
 * Initialize Fawry payment gateway
 */
export async function initializeFawry(config: FawryConfig): Promise<boolean> {
  try {
    // In production, this would validate credentials with Fawry
    console.log("Fawry initialized with merchant code:", config.merchantCode);
    return true;
  } catch (error) {
    console.error("Failed to initialize Fawry:", error);
    return false;
  }
}

/**
 * Process payment with Paymob (Card, Mobile Wallet)
 */
export async function processPaymobPayment(
  amount: number,
  email: string,
  phone: string,
  bookingId: string
): Promise<PaymentTransaction> {
  try {
    // In production, this would call Paymob API
    // Step 1: Create authentication token
    // Step 2: Create order
    // Step 3: Get payment key
    // Step 4: Redirect to payment iframe

    const transaction: PaymentTransaction = {
      id: `PMB_${Date.now()}`,
      bookingId,
      amount,
      currency: "EGP",
      method: "card",
      status: "processing",
      createdAt: new Date().toISOString(),
      metadata: {
        email,
        phone,
        gateway: "paymob",
      },
    };

    console.log("Processing Paymob payment:", transaction);
    return transaction;
  } catch (error) {
    console.error("Paymob payment failed:", error);
    throw new Error("Payment processing failed");
  }
}

/**
 * Process payment with Fawry (Bill Payment)
 */
export async function processFawryPayment(
  amount: number,
  phone: string,
  bookingId: string
): Promise<PaymentTransaction> {
  try {
    // In production, this would call Fawry API
    // Step 1: Create charge request
    // Step 2: Get reference number
    // Step 3: User pays at Fawry agent or online
    // Step 4: Webhook confirms payment

    const transaction: PaymentTransaction = {
      id: `FWR_${Date.now()}`,
      bookingId,
      amount,
      currency: "EGP",
      method: "fawry",
      status: "pending",
      createdAt: new Date().toISOString(),
      metadata: {
        phone,
        gateway: "fawry",
        referenceNumber: `FWR${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      },
    };

    console.log("Processing Fawry payment:", transaction);
    return transaction;
  } catch (error) {
    console.error("Fawry payment failed:", error);
    throw new Error("Payment processing failed");
  }
}

/**
 * Process Cash on Delivery (COD)
 */
export async function processCODPayment(
  amount: number,
  bookingId: string
): Promise<PaymentTransaction> {
  try {
    const transaction: PaymentTransaction = {
      id: `COD_${Date.now()}`,
      bookingId,
      amount,
      currency: "EGP",
      method: "cod",
      status: "pending",
      createdAt: new Date().toISOString(),
      metadata: {
        gateway: "cod",
        paymentDue: "on_service_completion",
      },
    };

    console.log("COD payment created:", transaction);
    return transaction;
  } catch (error) {
    console.error("COD payment failed:", error);
    throw new Error("Payment processing failed");
  }
}

/**
 * Process wallet payment
 */
export async function processWalletPayment(
  amount: number,
  userId: string,
  bookingId: string
): Promise<PaymentTransaction> {
  try {
    // In production, this would check wallet balance and deduct amount
    const transaction: PaymentTransaction = {
      id: `WLT_${Date.now()}`,
      bookingId,
      amount,
      currency: "EGP",
      method: "wallet",
      status: "completed",
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      metadata: {
        userId,
        gateway: "wallet",
      },
    };

    console.log("Wallet payment processed:", transaction);
    return transaction;
  } catch (error) {
    console.error("Wallet payment failed:", error);
    throw new Error("Insufficient wallet balance");
  }
}

/**
 * Verify payment status
 */
export async function verifyPaymentStatus(
  transactionId: string,
  method: PaymentMethod
): Promise<PaymentStatus> {
  try {
    // In production, this would query the payment gateway API
    console.log(`Verifying ${method} payment: ${transactionId}`);

    // Simulate verification
    return "completed";
  } catch (error) {
    console.error("Payment verification failed:", error);
    return "failed";
  }
}

/**
 * Process refund
 */
export async function processRefund(
  transactionId: string,
  amount: number,
  reason: string
): Promise<PaymentTransaction> {
  try {
    // In production, this would call the payment gateway refund API
    const transaction: PaymentTransaction = {
      id: transactionId,
      bookingId: "",
      amount,
      currency: "EGP",
      method: "card",
      status: "refunded",
      createdAt: new Date().toISOString(),
      refundedAt: new Date().toISOString(),
      refundAmount: amount,
      metadata: {
        refundReason: reason,
      },
    };

    console.log("Refund processed:", transaction);
    return transaction;
  } catch (error) {
    console.error("Refund processing failed:", error);
    throw new Error("Refund processing failed");
  }
}

/**
 * Get payment methods available in Egypt
 */
export function getAvailablePaymentMethods(): PaymentMethod[] {
  return ["card", "fawry", "cod", "wallet"];
}

/**
 * Format amount for display
 */
export function formatAmount(amount: number, currency: string = "EGP"): string {
  return `${currency} ${amount.toLocaleString("en-EG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Calculate fees for payment method
 */
export function calculatePaymentFees(
  amount: number,
  method: PaymentMethod
): { subtotal: number; fee: number; total: number } {
  const feePercentages: Record<PaymentMethod, number> = {
    card: 0.03, // 3% for card
    fawry: 0.02, // 2% for Fawry
    cod: 0.0, // No fee for COD
    wallet: 0.0, // No fee for wallet
  };

  const feePercentage = feePercentages[method] || 0;
  const fee = amount * feePercentage;

  return {
    subtotal: amount,
    fee: Math.round(fee * 100) / 100,
    total: Math.round((amount + fee) * 100) / 100,
  };
}

/**
 * Generate payment receipt
 */
export function generatePaymentReceipt(transaction: PaymentTransaction): string {
  const receipt = `
PAYMENT RECEIPT
===============
Transaction ID: ${transaction.id}
Booking ID: ${transaction.bookingId}
Amount: ${formatAmount(transaction.amount)}
Method: ${transaction.method.toUpperCase()}
Status: ${transaction.status.toUpperCase()}
Date: ${new Date(transaction.createdAt).toLocaleString("en-EG")}

Thank you for your payment!
  `.trim();

  return receipt;
}

/**
 * Handle payment webhook (for async payment confirmations)
 */
export async function handlePaymentWebhook(
  payload: Record<string, any>
): Promise<PaymentTransaction | null> {
  try {
    const { transactionId, status, method } = payload;

    // In production, verify webhook signature
    // Update transaction status in database
    // Send notification to user

    console.log("Payment webhook received:", { transactionId, status, method });
    return null;
  } catch (error) {
    console.error("Webhook processing failed:", error);
    return null;
  }
}
