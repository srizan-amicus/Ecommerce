import { apiRequest } from "./apiClient";

export interface MockPaymentRequest {
  orderId: number;
  paymentMethod: string;
}

export interface MockPaymentResponse {
  orderId: number;
  paymentStatus: string;
  transactionReference: string;
  amount: number;
}

export async function processMockPayment(
  payment: MockPaymentRequest,
): Promise<MockPaymentResponse> {
  const response = await apiRequest("/api/payments/mock", {
    method: "POST",
    body: JSON.stringify(payment),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Payment processing failed.");
  }

  return response.json();
}
