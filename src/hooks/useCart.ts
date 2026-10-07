import { useEffect, useState } from "react";
import {
  addCartItem,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../api/cartApi";
import type { CartItemApiResponse } from "../api/cartApi";

export default function useCart() {
  const [cartItems, setCartItems] = useState<CartItemApiResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial cart loading
  useEffect(() => {
    let cancelled = false;

    async function loadInitialCart() {
      try {
        const data = await getCart();

        if (!cancelled) {
          setCartItems(data);
        }
      } catch (error) {
        console.error("Failed to load cart:", error);

        if (!cancelled) {
          setError("Failed to load cart.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    loadInitialCart();

    return () => {
      cancelled = true;
    };
  }, []);

  // Refresh cart after cart operations
  async function fetchCart() {
    try {
      setError(null);

      const data = await getCart();

      setCartItems(data);
    } catch (error) {
      console.error("Failed to refresh cart:", error);
      setError("Failed to refresh cart.");
    }
  }

  const addToCart = async (productId: number, quantity = 1) => {
    try {
      setError(null);

      await addCartItem(productId, quantity);

      await fetchCart();
    } catch (error) {
      console.error("Failed to add item:", error);
      setError("Failed to add item to cart.");
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    if (quantity < 1) {
      return;
    }

    try {
      setError(null);

      await updateCartItem(productId, quantity);

      await fetchCart();
    } catch (error) {
      console.error("Failed to update quantity:", error);
      setError("Failed to update quantity.");
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      setError(null);

      await removeCartItem(productId);

      await fetchCart();
    } catch (error) {
      console.error("Failed to remove item:", error);
      setError("Failed to remove item.");
    }
  };

  const emptyCart = async () => {
    try {
      setError(null);

      await clearCart();

      setCartItems([]);
    } catch (error) {
      console.error("Failed to clear cart:", error);
      setError("Failed to clear cart.");
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.itemSubtotal,
    0,
  );

  return {
    cartItems,
    subtotal,
    isLoading,
    error,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    emptyCart,
  };
}
