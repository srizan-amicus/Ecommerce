import { lazy, Suspense, useCallback, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";

import Showcase from "../pages/showcase";
import Products from "../pages/Products";
import ProductList from "../pages/product-list";
import ProductDetail from "../pages/productDetail";
import Home from "../pages/home";
import Login from "../pages/login";
import PageNotFound from "../pages/page-not-found";

import Header from "./PageContents/Header";
import Footer from "./PageContents/Footer";
import Cart from "./Cart/Cart";
import Toast from "./Common/Toast";
import Breadcrumbs from "./Common/Breadcrumbs";
import ProtectedRoute from "./Auth/ProtectedRoutes";

import useDebounce from "../hooks/useDebounce";
import useCart from "../hooks/useCart";

import type { AddToCartResult } from "../types/cart";

const CheckoutControlled = lazy(() => import("../pages/checkout-controlled"));
const CheckoutHookForm = lazy(() => import("../pages/checkout-hook-form"));
const Orders = lazy(() => import("../pages/orders"));
const CheckoutPayment = lazy(() => import("../pages/checkout-payment"));
const CheckoutReview = lazy(() => import("../pages/checkout-review"));

function SharedLayout() {
  return (
    <>
      <Breadcrumbs />
      <Outlet />
      <Footer />
    </>
  );
}

function AppContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { cartItems, subtotal, addToCart } = useCart();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const handleAddToCart = useCallback(
    async (productId: number, quantity: number): Promise<AddToCartResult> => {
      const result = await addToCart(productId, quantity);

      setToastMessage(
        result.success
          ? "Item successfully added to the cart!"
          : (result.error ?? "Failed to add item to cart."),
      );

      return result;
    },
    [addToCart],
  );

  const handleCloseToast = useCallback(() => {
    setToastMessage(null);
  }, []);

  return (
    <>
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartItemCount={cartItemCount}
      />

      {toastMessage && (
        <Toast message={toastMessage} onClose={handleCloseToast} />
      )}

      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center">
            <p>Loading page...</p>
          </div>
        }
      >
        <Routes>
          <Route element={<SharedLayout />}>
            <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />

            <Route path="/login" element={<Login />} />

            <Route path="/showcase" element={<Showcase />} />

            <Route
              path="/products"
              element={
                <ProductList
                  searchTerm={debouncedSearchTerm}
                  onAddToCart={handleAddToCart}
                />
              }
            />

            <Route
              path="/product-list"
              element={
                <ProductList
                  searchTerm={debouncedSearchTerm}
                  onAddToCart={handleAddToCart}
                />
              }
            />

            {/* Legacy product listing */}
            <Route path="/products-legacy" element={<Products />} />

            {/* Product detail routes */}
            <Route
              path="/product/:id"
              element={<ProductDetail onAddToCart={handleAddToCart} />}
            />

            <Route
              path="/products/:id"
              element={<ProductDetail onAddToCart={handleAddToCart} />}
            />

            <Route element={<ProtectedRoute />}>
              {/* Cart reads its data directly from CartContext */}
              <Route path="/cart" element={<Cart />} />

              <Route
                path="/checkout"
                element={
                  <CheckoutHookForm cartItems={cartItems} subtotal={subtotal} />
                }
              />

              <Route
                path="/checkout-hook-form"
                element={<Navigate to="/checkout" replace />}
              />
              <Route path="/checkout/payment" element={<CheckoutPayment />} />

              <Route path="/checkout/review" element={<CheckoutReview />} />
              <Route path="/checkout/payment" element={<CheckoutPayment />} />

              <Route
                path="/checkout-controlled"
                element={<CheckoutControlled />}
              />

              <Route path="/orders" element={<Orders />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default AppContent;
