import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

import {
  addCartItem,
  clearCart,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../api/cartApi";

import type { CartItemApiResponse } from "../api/cartApi";
import type { AddToCartResult } from "../types/cart";
import { cartReducer } from "./cartReducer";
import { CartContext } from "./cartContext";

const STORAGE_KEY = "swift-cart";

function getSavedCart(): CartItemApiResponse[] {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEY);

    if (!savedCart) {
      return [];
    }

    const parsed: unknown = JSON.parse(savedCart);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is CartItemApiResponse =>
        item !== null &&
        typeof item === "object" &&
        typeof item.cartItemId === "number" &&
        typeof item.productId === "number" &&
        typeof item.productName === "string" &&
        typeof item.quantity === "number" &&
        typeof item.price === "number" &&
        typeof item.itemSubtotal === "number",
    );
  } catch {
    return [];
  }
}

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, dispatch] = useReducer(
    cartReducer,
    undefined,
    getSavedCart,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Persist cart changes in localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (storageError) {
      console.error("Could not save cart:", storageError);
    }
  }, [cartItems]);

  // Load the backend cart when the provider mounts.
  useEffect(() => {
    const controller = new AbortController();

    async function loadInitialCart() {
      try {
        setError(null);

        const items = await getCart();

        if (controller.signal.aborted) {
          return;
        }

        dispatch({
          type: "SET_CART",
          payload: items,
        });
      } catch (caughtError) {
        if (controller.signal.aborted) {
          return;
        }

        console.error("Failed to load cart:", caughtError);
        setError("Could not load cart.");
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialCart();

    return () => {
      controller.abort();
    };
  }, []);

  // Refresh the cart without restarting the initial loading state.
  const fetchCart = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);

      const items = await getCart();

      dispatch({
        type: "SET_CART",
        payload: items,
      });

      return true;
    } catch (caughtError) {
      console.error("Failed to refresh cart:", caughtError);
      setError("Could not refresh the cart.");
      return false;
    }
  }, []);

  const addToCart = useCallback(
    async (productId: number, quantity = 1): Promise<AddToCartResult> => {
      try {
        setError(null);

        await addCartItem(productId, quantity);

        const refreshed = await fetchCart();

        if (!refreshed) {
          const message = "Item added, but the cart could not be refreshed.";

          setError(message);

          return { success: false, error: message };
        }

        return { success: true };
      } catch (caughtError) {
        const message =
          caughtError instanceof Error
            ? caughtError.message
            : "Failed to add item to cart.";

        setError(message);

        return { success: false, error: message };
      }
    },
    [fetchCart],
  );

  const updateQuantity = useCallback(
    async (productId: number, quantity: number): Promise<void> => {
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
      } catch (caughtError) {
        console.error("Failed to update quantity:", caughtError);
        setError("Failed to update quantity.");
      }
    },
    [fetchCart],
  );

  const removeFromCart = useCallback(
    async (productId: number): Promise<void> => {
      try {
        setError(null);

        await removeCartItem(productId);

        const refreshed = await fetchCart();

        if (!refreshed) {
          setError("Item removed, but the cart could not be refreshed.");
        }
      } catch (caughtError) {
        console.error("Failed to remove item:", caughtError);
        setError("Failed to remove item.");
      }
    },
    [fetchCart],
  );

  const emptyCart = useCallback(async (): Promise<void> => {
    try {
      setError(null);

      await clearCart();

      dispatch({ type: "CLEAR_CART" });
    } catch (caughtError) {
      console.error("Failed to clear cart:", caughtError);
      setError("Failed to clear cart.");
    }
  }, []);

  const subtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.itemSubtotal, 0),
    [cartItems],
  );

  const value = useMemo(
    () => ({
      cartItems,
      subtotal,
      isLoading,
      error,
      fetchCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      emptyCart,
    }),
    [
      cartItems,
      subtotal,
      isLoading,
      error,
      fetchCart,
      addToCart,
      updateQuantity,
      removeFromCart,
      emptyCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
