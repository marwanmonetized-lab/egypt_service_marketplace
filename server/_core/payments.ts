/**
 * Payment Gateway Integration Backend
 * Handles communication with Paymob and Fawry APIs
 */

import { ENV } from "./env";

export interface PaymobPaymentRequest {
  bookingId: number;
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
  customerPhone: string;
}

export interface FawryPaymentRequest {
  bookingId: number;
  amount: number;
  currency: string;
  description: string;
  customerEmail: string;
  customerPhone: string;
}

/**
 * Initiate Paymob payment
 * Requires PAYMOB_API_KEY environment variable
 */
export async function initiatePaymobPayment(request: PaymobPaymentRequest) {
  try {
    if (!ENV.paymobApiKey) {
      throw new Error("Paymob API key not configured");
    }

    // Step 1: Create authentication token
    const authResponse = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        api_key: ENV.paymobApiKey,
      }),
    });

    if (!authResponse.ok) {
      throw new Error("Failed to authenticate with Paymob");
    }

    const authData = await authResponse.json();
    const token = authData.token;

    // Step 2: Create order
    const orderResponse = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        auth_token: token,
        delivery_needed: false,
        items: [
          {
            name: request.description,
            amount_cents: request.amount * 100,
            description: request.description,
            quantity: 1,
          },
        ],
      }),
    });

    if (!orderResponse.ok) {
      throw new Error("Failed to create Paymob order");
    }

    const orderData = await orderResponse.json();

    // Step 3: Create payment key
    const paymentKeyResponse = await fetch("https://accept.paymob.com/api/acceptance/payment_keys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        auth_token: token,
        amount_cents: request.amount * 100,
        expiration: 3600,
        order_id: orderData.id,
        billing_data: {
          apartment: "NA",
          email: request.customerEmail,
          floor: "NA",
          first_name: "Customer",
          street: "NA",
          postal_code: "NA",
          city: "Cairo",
          country: "EG",
          last_name: "Service",
          phone_number: request.customerPhone,
          state: "Cairo",
        },
        currency: request.currency,
        integration_id: ENV.paymobIntegrationId || "",
      }),
    });

    if (!paymentKeyResponse.ok) {
      throw new Error("Failed to create Paymob payment key");
    }

    const paymentKeyData = await paymentKeyResponse.json();

    return {
      success: true,
      transactionId: orderData.id.toString(),
      paymentUrl: `https://accept.paymob.com/api/acceptance/iframes/${ENV.paymobIntegrationId}?payment_token=${paymentKeyData.token}`,
    };
  } catch (error) {
    console.error("Paymob payment error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Initiate Fawry payment
 * Requires FAWRY_MERCHANT_CODE and FAWRY_SECURITY_KEY environment variables
 */
export async function initiateFawryPayment(request: FawryPaymentRequest) {
  try {
    if (!ENV.fawryMerchantCode || !ENV.fawrySecurityKey) {
      throw new Error("Fawry credentials not configured");
    }

    // Generate charge request signature
    const chargeSignatureData = `${ENV.fawryMerchantCode}${request.bookingId}${request.amount}${ENV.fawrySecurityKey}`;
    const chargeSignature = await generateSHA256Hash(chargeSignatureData);

    // Initiate charge request
    const chargeResponse = await fetch("https://api.fawry.com/ECommerceWeb/Fawry/charges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchantCode: ENV.fawryMerchantCode,
        merchantRefNum: request.bookingId.toString(),
        customerProfileId: request.customerEmail,
        customerName: "Service Customer",
        customerEmail: request.customerEmail,
        customerMobile: request.customerPhone,
        amount: request.amount,
        currencyCode: "EGP",
        description: request.description,
        chargeItems: [
          {
            itemId: "1",
            description: request.description,
            price: request.amount,
            quantity: 1,
          },
        ],
        signature: chargeSignature,
      }),
    });

    if (!chargeResponse.ok) {
      throw new Error("Failed to initiate Fawry payment");
    }

    const chargeData = await chargeResponse.json();

    return {
      success: true,
      transactionId: chargeData.fawryRefNumber,
      paymentUrl: `https://www.fawry.com/pay/${chargeData.authCode}`,
    };
  } catch (error) {
    console.error("Fawry payment error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Verify payment status
 */
export async function verifyPayment(transactionId: string, paymentMethod: string) {
  try {
    if (paymentMethod === "card") {
      return verifyPaymobPayment(transactionId);
    } else if (paymentMethod === "fawry") {
      return verifyFawryPayment(transactionId);
    } else if (paymentMethod === "cod") {
      return { success: true, status: "pending" };
    }
    return { success: false, status: "unknown" };
  } catch (error) {
    console.error("Payment verification error:", error);
    return { success: false, status: "error" };
  }
}

async function verifyPaymobPayment(orderId: string) {
  try {
    if (!ENV.paymobApiKey) {
      throw new Error("Paymob API key not configured");
    }

    const response = await fetch(`https://accept.paymob.com/api/ecommerce/orders/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ENV.paymobApiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to verify Paymob payment");
    }

    const data = await response.json();
    return {
      success: data.is_paid === true,
      status: data.is_paid ? "completed" : "pending",
    };
  } catch (error) {
    console.error("Paymob verification error:", error);
    return { success: false, status: "error" };
  }
}

async function verifyFawryPayment(fawryRefNumber: string) {
  try {
    if (!ENV.fawryMerchantCode || !ENV.fawrySecurityKey) {
      throw new Error("Fawry credentials not configured");
    }

    const statusSignatureData = `${ENV.fawryMerchantCode}${fawryRefNumber}${ENV.fawrySecurityKey}`;
    const statusSignature = await generateSHA256Hash(statusSignatureData);

    const response = await fetch("https://api.fawry.com/ECommerceWeb/Fawry/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        merchantCode: ENV.fawryMerchantCode,
        fawryRefNumber: fawryRefNumber,
        signature: statusSignature,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to verify Fawry payment");
    }

    const data = await response.json();
    return {
      success: data.statusCode === 200,
      status: data.statusCode === 200 ? "completed" : "pending",
    };
  } catch (error) {
    console.error("Fawry verification error:", error);
    return { success: false, status: "error" };
  }
}

/**
 * Generate SHA256 hash for Fawry signature
 */
async function generateSHA256Hash(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await crypto.subtle.digest("SHA-256", dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
