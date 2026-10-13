import { apiRequest } from "./apiClient";

export interface CreateOrderRequest {
  addressId: number;
  shippingMethod: string;
  paymentMethod: string;
}

export interface PriceChange {
  productId?: number;
  productName?: string;
  oldPrice?: number;
  newPrice?: number;
  [key: string]: unknown;
}

export interface StockIssue {
  productId?: number;
  productName?: string;
  requestedQuantity?: number;
  availableQuantity?: number;
  [key: string]: unknown;
}

export interface CreateOrderResponse {
  subtotal: number;
  shippingCharge: number;
  tax: number;
  totalAmount: number;
  priceChanges: PriceChange[];
  stockIssues: StockIssue[];
  orderId: number;
}

export interface OrderHistoryItem {
  orderId: number;
  customerId: number;
  subtotal: number;
  shippingCharge: number;
  tax: number;
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
  createdBy?: number | null;
  updatedAt?: string | null;
  updatedBy?: number | null;
}

export interface OrderDetail extends OrderHistoryItem {
  items: {
    orderItemId: number;
    productId: number;
    productName: string;
    quantity: number;
    price: number;
    itemSubtotal: number;
  }[];
  shipping: {
    shippingName: string;
    shippingAddress: string;
    shippingCity: string;
    shippingState: string;
    shippingPostalCode: string;
    shippingMethod: string;
    shippingCharge: number;
  };
  payment: {
    paymentId?: number;
    orderId?: number;
    paymentStatus?: string;
    transactionReference?: string;
    amount?: number;
    paymentMethod?: string;
    createdAt?: string;
  } | null;
}

export interface OrderHistoryParams {
  status?: string;
  page?: number;
  pageSize?: number;
}

export async function createOrder(
  order: CreateOrderRequest,
): Promise<CreateOrderResponse> {
  const response = await apiRequest("/api/v1/checkout", {
    method: "POST",
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Checkout failed.");
  }

  const result: CreateOrderResponse = await response.json();

  if (
    !Number.isInteger(result.orderId) ||
    result.orderId <= 0 ||
    !Number.isFinite(result.subtotal) ||
    !Number.isFinite(result.shippingCharge) ||
    !Number.isFinite(result.tax) ||
    !Number.isFinite(result.totalAmount) ||
    !Array.isArray(result.priceChanges) ||
    !Array.isArray(result.stockIssues)
  ) {
    throw new Error(
      "The checkout API returned an invalid response. Please check My Orders before retrying.",
    );
  }

  return result;
}

export async function getOrderById(orderId: number): Promise<OrderDetail> {
  const response = await apiRequest(`/api/v1/orders/${orderId}`);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to fetch order details.");
  }

  return response.json();
}

export interface OrderHistoryResponse {
  orders: OrderHistoryItem[];
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export async function getOrderHistory(
  params: OrderHistoryParams = {},
): Promise<OrderHistoryResponse> {
  const query = new URLSearchParams();

  if (params.status) {
    query.set("status", params.status);
  }

  query.set("page", String(params.page ?? 1));
  query.set("pageSize", String(params.pageSize ?? 10));

  const response = await apiRequest(
    `/api/v1/orders/history?${query.toString()}`,
  );

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to fetch order history.");
  }

  return response.json();
}

export async function reorderOrder(orderId: number): Promise<void> {
  const response = await apiRequest(`/api/v1/orders/${orderId}/reorder`, {
    method: "POST",
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to reorder.");
  }
}
