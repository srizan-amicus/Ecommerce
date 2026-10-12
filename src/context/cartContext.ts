import { createContext } from "react";
import type { CartItemApiResponse } from "../api/cartApi";
import type { AddToCartResult } from "../types/cart";

export interface CartContextValue {
  cartItems: CartItemApiResponse[];
  subtotal: number;
  isLoading: boolean;
  error: string | null;
  fetchCart: () => Promise<boolean>;
  addToCart: (productId: number, quantity?: number) => Promise<AddToCartResult>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  emptyCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined,
);
