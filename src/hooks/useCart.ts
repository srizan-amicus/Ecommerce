import { useCallback, useState } from "react";
import {
  addCartItem,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../api/cartApi";
import type { CartItemApiResponse } from "../api/cartApi";
import type { AddToCartResult } from "../types/cart";
import useFetch from "./useFetch";

export default function useCart() {
  const {
    data: cartData,
    loading: isLoading,
    error: fetchError,
    execute: executeCart,
    setData: setCartItems,
  } = useFetch<CartItemApiResponse[]>(getCart);

  const [error, setError] = useState<string | null>(null);

  const cartItems = cartData ?? [];

  // Refresh cart data from the API
  const fetchCart = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);

      return await executeCart(undefined, {
        silent: true,
      });
    } catch (error) {
      console.error("Failed to refresh cart:", error);

      return false;
    }
  }, [executeCart]);

  // Add a product to the cart
  const addToCart = async (
    productId: number,
    quantity = 1,
  ): Promise<AddToCartResult> => {
    try {
      setError(null);

      await addCartItem(productId, quantity);

      const refreshed = await fetchCart();

      if (!refreshed) {
        const errorMessage = "Item added, but the cart could not be refreshed.";

        setError(errorMessage);

        return {
          success: false,
          error: errorMessage,
        };
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error("Failed to add item:", error);

      const errorMessage =
        error instanceof Error ? error.message : "Failed to add item to cart.";

      setError(errorMessage);

      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  // Update the quantity of an existing cart item
  const updateQuantity = async (
    productId: number,
    quantity: number,
  ): Promise<void> => {
    if (quantity < 1) {
      return;
    }

    try {
      setError(null);

      await updateCartItem(productId, quantity);

      const refreshed = await fetchCart();

      if (!refreshed) {
        setError("Quantity updated, but the cart could not be refreshed.");
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);

      setError("Failed to update quantity.");
    }
  };

  // Remove a product from the cart
  const removeFromCart = async (productId: number): Promise<void> => {
    try {
      setError(null);

      await removeCartItem(productId);

      const refreshed = await fetchCart();

      if (!refreshed) {
        setError("Item removed, but the cart could not be refreshed.");
      }
    } catch (error) {
      console.error("Failed to remove item:", error);

      setError("Failed to remove item.");
    }
  };

  // Remove all products from the cart
  const emptyCart = async (): Promise<void> => {
    try {
      setError(null);

      await clearCart();

      setCartItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);

      setError("Failed to clear cart.");
    }
  };

  // Derived value — no separate state is needed
  const subtotal = cartItems.reduce(
    (total, item) => total + item.itemSubtotal,
    0,
  );

  return {
    cartItems,
    subtotal,
    isLoading,
    error: error ?? fetchError,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    emptyCart,
  };
}
