import { apiRequest } from "./apiClient";

export interface CartItemApiResponse {
  cartItemId: number;
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  itemSubtotal: number;
}

export interface AddCartItemRequest {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export interface CartCountResponse {
  itemCount: number;
}

export interface CartSubtotalResponse {
  subtotal: number;
}

export async function getCart(): Promise<CartItemApiResponse[]> {
  const response = await apiRequest("/api/v1/cart");

  if (!response.ok) {
    throw new Error("Failed to fetch cart");
  }

  return response.json();
}

export async function addCartItem(
  productId: number,
  quantity: number,
) {
  const response = await apiRequest("/api/v1/cart/items", {
    method: "POST",
    body: JSON.stringify({ productId, quantity }),
  });

  if (!response.ok) {
    const errorText = await response.text();

    console.error("Add to cart API error:", {
      status: response.status,
      productId,
      quantity,
      error: errorText,
    });

    throw new Error("Failed to add item to cart");
  }

  return response.json();
}

export async function updateCartItem(
  productId: number,
  quantity: number,
) {
  const response = await apiRequest(
    `/api/v1/cart/items/${productId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        quantity,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to update cart item");
  }

  return response.json();
}

export async function removeCartItem(
  productId: number,
) {
  const response = await apiRequest(
    `/api/v1/cart/items/${productId}`,
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to remove cart item");
  }
}

export async function clearCart() {
  const response = await apiRequest(
    "/api/v1/cart",
    {
      method: "DELETE",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to clear cart");
  }
}

export async function getCartCount(): Promise<CartCountResponse> {
  const response = await apiRequest(
    "/api/v1/cart/count",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cart count");
  }

  return response.json();
}

export async function getCartSubtotal(): Promise<CartSubtotalResponse> {
  const response = await apiRequest(
    "/api/v1/cart/subtotal",
  );

  if (!response.ok) {
    throw new Error("Failed to fetch cart subtotal");
  }

  return response.json();
}