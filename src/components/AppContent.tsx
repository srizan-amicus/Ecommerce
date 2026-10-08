import { useCallback, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Showcase from "../pages/showcase";
import Products from "../pages/Products";
import ProductList from "../pages/product-list";
import Home from "../pages/home";
import Header from "./PageContents/Header";
import useDebounce from "../hooks/useDebounce";
import CheckoutControlled from "../pages/checkout-controlled";
import CheckoutHookForm from "../pages/checkout-hook-form";
import useAuthBootstrap from "../hooks/useAuthBootstrap";
import useCart from "../hooks/useCart";
import Cart from "./Cart/Cart";
import Toast from "./Common/Toast";
import type { AddToCartResult } from "../types/cart";

function AppContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { isAuthLoading } = useAuthBootstrap();

  const {
    cartItems,
    subtotal,
    isLoading: isCartLoading,
    error: cartError,
    addToCart,
    updateQuantity,
    removeFromCart,
    emptyCart,
  } = useCart();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleAddToCart = useCallback(
    async (productId: number, quantity: number): Promise<AddToCartResult> => {
      const result = await addToCart(productId, quantity);

      if (result.success) {
        setToastMessage("Item successfully added to the cart!");
      } else if (result.error) {
        setToastMessage(result.error);
      }

      return result;
    },
    [addToCart],
  );

  const handleCloseToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {toastMessage && (
        <Toast message={toastMessage} onClose={handleCloseToast} />
      )}

      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />

        <Route path="/showcase" element={<Showcase />} />

        <Route path="/products" element={<Products />} />

        <Route
          path="/product-list"
          element={
            <ProductList
              searchTerm={debouncedSearchTerm}
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route path="/checkout-controlled" element={<CheckoutControlled />} />

        <Route
          path="/checkout-hook-form"
          element={
            <CheckoutHookForm cartItems={cartItems} subtotal={subtotal} />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              subtotal={subtotal}
              isLoading={isCartLoading}
              error={cartError}
              onQuantityChange={updateQuantity}
              onRemove={removeFromCart}
              onClearCart={emptyCart}
            />
          }
        />
      </Routes>
    </>
  );
}

export default AppContent;
