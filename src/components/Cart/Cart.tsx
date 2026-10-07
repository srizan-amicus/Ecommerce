import CartItem from "./CartItem";
import type { CartItemApiResponse } from "../../api/cartApi";

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

  if (error) {
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
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>

          <button
            type="button"
            onClick={onClearCart}
            className="text-sm text-red-500 hover:text-red-700"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <section className="rounded-lg bg-white p-6 shadow-sm lg:col-span-2">
            {/* Column Headers */}
            <div className="hidden grid-cols-4 border-b border-gray-200 pb-4 text-sm font-medium text-gray-500 md:grid">
              <span>Product</span>
              <span>Unit Price</span>
              <span>Qty</span>
              <span>Total</span>
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
          <aside className="h-fit rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>

                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between text-lg font-semibold text-gray-900">
                  <span>Total</span>

                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                type="button"
                className="w-full rounded-lg bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
              >
                Proceed to Checkout
              </button>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;
