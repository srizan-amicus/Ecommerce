import { useNavigate } from "react-router-dom";

import CartItem from "./CartItem";
import OrderSummary from "../Checkout/OrderSummary";
import useCart from "../../hooks/useCart";
import Button from "../Common/Button";
import PageMetadata from "../Common/PageMetadata";
import { ButtonVariant } from "../../enums/button";

function Cart() {
  const {
    cartItems,
    subtotal,
    isLoading,
    error,
    updateQuantity,
    removeFromCart,
    emptyCart,
  } = useCart();

  const navigate = useNavigate();

  // Total number of individual items in the cart
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Initial cart loading state
  if (isLoading) {
    return (
      <>
        <PageMetadata
          title="Shopping Cart — SwiftCart"
          description="Review the products in your SwiftCart shopping cart, update quantities, and continue to checkout."
        />

        <main className="min-h-screen bg-gray-50 px-4 py-10">
          <div className="mx-auto max-w-6xl">
            <div className="animate-pulse">
              <div className="mb-8 h-8 w-48 rounded bg-gray-200" />

              <div className="rounded-lg bg-white p-6">
                <div className="space-y-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="h-20 rounded bg-gray-200" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  // Show a full-page error if the cart could not load
  if (error && cartItems.length === 0) {
    return (
      <>
        <PageMetadata
          title="Cart Unavailable — SwiftCart"
          description="Your shopping cart could not be loaded. Please try again later or return to SwiftCart to continue shopping."
        />

        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
          <div className="text-center">
            <h1 className="text-xl font-semibold text-gray-900">
              Unable to load cart
            </h1>

            <p className="mt-2 text-gray-500">{error}</p>
          </div>
        </main>
      </>
    );
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <>
        <PageMetadata
          title="Your Cart Is Empty — SwiftCart"
          description="Your SwiftCart cart is currently empty. Explore our products and add your favorites to get started."
        />

        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900">
              Your cart is empty
            </h1>

            <p className="mt-2 text-gray-500">
              Add some products to your cart to get started.
            </p>

            <Button
              type="button"
              variant={ButtonVariant.Primary}
              onClick={() => navigate("/products")}
              className="mt-5 !w-auto"
            >
              Continue Shopping
            </Button>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <PageMetadata
        title="Shopping Cart — SwiftCart"
        description={`Review your ${itemCount} cart items, update quantities, check your subtotal, and proceed to checkout with SwiftCart.`}
      />

      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Shopping Cart ({itemCount} Items)
              </h1>

              {/* Operation error */}
              {error && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="button"
              variant={ButtonVariant.Danger}
              onClick={() => void emptyCart()}
              className="!min-h-9 !w-auto !px-3 !py-2 !text-xs sm:!text-sm"
            >
              Clear Cart
            </Button>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {/* Cart Items */}
            <section className="lg:col-span-2">
              {/* Column Headers */}
              <div className="hidden grid-cols-[2.2fr_1fr_1fr_1fr] bg-[#1f1f1f] px-4 py-3 text-sm font-bold text-white md:grid">
                <span className="flex items-center">Product</span>
                <span className="flex items-center">Unit Price</span>
                <span className="flex items-center justify-center">Qty</span>
                <span className="flex items-center">Total</span>
              </div>

              {cartItems.map((item) => (
                <CartItem
                  key={item.cartItemId}
                  item={item}
                  onQuantityChange={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </section>

            {/* Order Summary */}
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              actionLabel="PROCEED TO CHECKOUT"
              actionType="button"
              onAction={() => navigate("/checkout")}
              showContinueShopping
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default Cart;
