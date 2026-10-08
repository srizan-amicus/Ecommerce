import CartItem from "./CartItem";
import type { CartItemApiResponse } from "../../api/cartApi";
import OrderSummary from "../Checkout/OrderSummary";
import { useNavigate } from "react-router-dom";

interface CartProps {
  cartItems: CartItemApiResponse[];
  subtotal: number;
  isLoading: boolean;
  error: string | null;
  onQuantityChange: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
  onClearCart: () => void;
}

function Cart({
  cartItems,
  subtotal,
  isLoading,
  error,
  onQuantityChange,
  onRemove,
  onClearCart,
}: CartProps) {
  //total dynamic number
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navigate = useNavigate();
  // Initial cart loading state
  if (isLoading) {
    return (
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
    );
  }

  // Only show the full-page error when the cart itself
  // could not be loaded.
  if (error && cartItems.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            Unable to load cart
          </h1>

          <p className="mt-2 text-gray-500">{error}</p>
        </div>
      </main>
    );
  }

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-900">
            Your cart is empty
          </h1>

          <p className="mt-2 text-gray-500">
            Add some products to your cart to get started.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Shopping Cart ({itemCount} Items)
            </h1>

            {/* Operation error */}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="button"
            onClick={onClearCart}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Clear Cart
          </button>
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
                onQuantityChange={onQuantityChange}
                onRemove={onRemove}
              />
            ))}
          </section>

          {/* Order Summary */}
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            actionLabel="PROCEED TO CHECKOUT"
            actionType="button"
            onAction={() => navigate("/checkout-hook-form")}
            showContinueShopping
          />
        </div>
      </div>
    </main>
  );
}

export default Cart;
