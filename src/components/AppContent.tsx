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
import Toast from "./Common/Toast";
import Breadcrumbs from "./Common/Breadcrumbs";
import ProtectedRoute from "./Auth/ProtectedRoutes";
import ErrorBoundary from "./Common/ErrorBoundary";

import useDebounce from "../hooks/useDebounce";
import useCart from "../hooks/useCart";

import type { AddToCartResult } from "../types/cart";

// Lazy-loaded pages
const Cart = lazy(() => import("./Cart/Cart"));
const CheckoutControlled = lazy(() => import("../pages/checkout-controlled"));
const CheckoutHookForm = lazy(() => import("../pages/checkout-hook-form"));
const CheckoutPayment = lazy(() => import("../pages/checkout-payment"));
const CheckoutReview = lazy(() => import("../pages/checkout-review"));
const Orders = lazy(() => import("../pages/orders"));

interface PageErrorBoundaryProps {
  children: React.ReactNode;
}

function PageErrorBoundary({ children }: PageErrorBoundaryProps) {
  return <ErrorBoundary>{children}</ErrorBoundary>;
}

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

  // Wait 300 ms after the user stops typing.
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

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
            <Route
              path="/"
              element={
                <PageErrorBoundary>
                  <Home onAddToCart={handleAddToCart} />
                </PageErrorBoundary>
              }
            />

            <Route
              path="/login"
              element={
                <PageErrorBoundary>
                  <Login />
                </PageErrorBoundary>
              }
            />

            <Route
              path="/showcase"
              element={
                <PageErrorBoundary>
                  <Showcase />
                </PageErrorBoundary>
              }
            />

            <Route
              path="/products"
              element={
                <PageErrorBoundary>
                  <ProductList
                    searchTerm={debouncedSearchTerm}
                    onAddToCart={handleAddToCart}
                  />
                </PageErrorBoundary>
              }
            />

            <Route
              path="/product-list"
              element={
                <PageErrorBoundary>
                  <ProductList
                    searchTerm={debouncedSearchTerm}
                    onAddToCart={handleAddToCart}
                  />
                </PageErrorBoundary>
              }
            />

            {/* Legacy product listing */}
            <Route
              path="/products-legacy"
              element={
                <PageErrorBoundary>
                  <Products />
                </PageErrorBoundary>
              }
            />

            {/* Product detail routes */}
            <Route
              path="/product/:id"
              element={
                <PageErrorBoundary>
                  <ProductDetail onAddToCart={handleAddToCart} />
                </PageErrorBoundary>
              }
            />

            <Route
              path="/products/:id"
              element={
                <PageErrorBoundary>
                  <ProductDetail onAddToCart={handleAddToCart} />
                </PageErrorBoundary>
              }
            />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/cart"
                element={
                  <PageErrorBoundary>
                    <Cart />
                  </PageErrorBoundary>
                }
              />

              <Route
                path="/checkout"
                element={
                  <PageErrorBoundary>
                    <CheckoutHookForm
                      cartItems={cartItems}
                      subtotal={subtotal}
                    />
                  </PageErrorBoundary>
                }
              />

              <Route
                path="/checkout-hook-form"
                element={<Navigate to="/checkout" replace />}
              />

              <Route
                path="/checkout/payment"
                element={
                  <PageErrorBoundary>
                    <CheckoutPayment />
                  </PageErrorBoundary>
                }
              />

              <Route
                path="/checkout/review"
                element={
                  <PageErrorBoundary>
                    <CheckoutReview />
                  </PageErrorBoundary>
                }
              />

              <Route
                path="/checkout-controlled"
                element={
                  <PageErrorBoundary>
                    <CheckoutControlled />
                  </PageErrorBoundary>
                }
              />

              <Route
                path="/orders"
                element={
                  <PageErrorBoundary>
                    <Orders />
                  </PageErrorBoundary>
                }
              />
            </Route>

            <Route
              path="*"
              element={
                <PageErrorBoundary>
                  <PageNotFound />
                </PageErrorBoundary>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default AppContent;
