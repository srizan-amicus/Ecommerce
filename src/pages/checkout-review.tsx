import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import OrderSuccessToast from "../components/Common/OrderSuccessToast";
import useCart from "../hooks/useCart";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import OrderSummary from "../components/Checkout/OrderSummary";

import { processMockPayment } from "../api/paymentApi";
import type { CreateOrderResponse } from "../api/orderApi";

interface ReviewNavigationState {
  addressId: number;
  shippingMethod: string;
  paymentMethod: string;
  checkout: CreateOrderResponse;
}

function CheckoutReview() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, subtotal, emptyCart } = useCart();

  const state = location.state as ReviewNavigationState | null;

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<number | null>(null);

  if (!state?.addressId || !state.checkout?.orderId) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <p className="text-red-600">
          Your review session has expired. Please return to checkout.
        </p>

        <button
          type="button"
          onClick={() => navigate("/checkout", { replace: true })}
          className="mt-4 rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
        >
          Return to Shipping
        </button>
      </main>
    );
  }

  if (cartItems.length === 0 && confirmedOrderId === null) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-10">
        <p>Your cart is empty.</p>
        <button
          type="button"
          onClick={() => navigate("/product-list")}
          className="mt-4 rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white hover:bg-orange-600"
        >
          Continue Shopping
        </button>
      </main>
    );
  }

  const checkout = state.checkout;
  const isBusy = isSubmitting || confirmedOrderId !== null;

  const handlePlaceOrder = async () => {
    if (isBusy) return;

    setMessage("");
    setIsSubmitting(true);

    try {
      const payment = await processMockPayment({
        orderId: checkout.orderId,
        paymentMethod: state.paymentMethod,
      });

      if (
        payment.paymentStatus?.toLowerCase() !== "success" ||
        !Number.isFinite(payment.amount) ||
        payment.amount <= 0 ||
        Math.abs(payment.amount - checkout.totalAmount) > 0.01
      ) {
        setMessage(
          `Order #${checkout.orderId} may exist, but payment could not be confirmed. Check My Orders before retrying.`,
        );
        return;
      }

      // Show confirmation only after payment has been validated.
      setConfirmedOrderId(checkout.orderId);

      // Empty the cart without hiding the success toast.
      try {
        await emptyCart();
      } catch (cartError) {
        // Payment has succeeded, so don't show a payment failure.
        console.error("Payment succeeded, but cart cleanup failed:", cartError);
      }

      // Allow the user to see the confirmation before redirecting.
      window.setTimeout(() => {
        navigate("/orders", {
          replace: true,
          state: {
            orderConfirmed: true,
            orderId: checkout.orderId,
            paymentStatus: payment.paymentStatus,
          },
        });
      }, 3000);
    } catch (error) {
      console.error("Payment failed:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Payment could not be confirmed. Check My Orders before retrying.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditPayment = () => {
    if (isBusy) return;

    navigate("/checkout/payment", {
      state: {
        addressId: state.addressId,
      },
    });
  };

  return (
    <main className="mx-auto min-h-screen max-w-[1280px] px-4 py-6 text-gray-800 sm:px-6">
      {confirmedOrderId !== null && (
        <OrderSuccessToast orderId={confirmedOrderId} />
      )}

      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
          Almost there
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-gray-950 sm:text-3xl">
          Review Your Order<span className="text-orange-500">.</span>
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Check your details and order total before placing your order.
        </p>
      </div>

      <CheckoutSteps activeStep={3} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="space-y-5">
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between bg-gray-950 px-5 py-4 text-white">
              <h2 className="text-sm font-bold tracking-wide">
                SHIPPING DETAILS
              </h2>

              <button
                type="button"
                disabled={isBusy}
                onClick={() => navigate("/checkout")}
                className="text-sm font-bold text-orange-400 hover:text-orange-300 disabled:opacity-50"
              >
                EDIT
              </button>
            </div>

            <div className="p-5 text-sm">
              <p className="text-gray-500">Address ID</p>
              <p className="mt-1 font-semibold text-gray-900">
                {state.addressId}
              </p>

              <div className="mt-4">
                <p className="text-gray-500">Shipping method</p>
                <p className="mt-1 font-semibold text-gray-900">
                  {state.shippingMethod}
                </p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between bg-gray-950 px-5 py-4 text-white">
              <h2 className="text-sm font-bold tracking-wide">
                PAYMENT METHOD
              </h2>

              <button
                type="button"
                disabled={isBusy}
                onClick={handleEditPayment}
                className="text-sm font-bold text-orange-400 hover:text-orange-300 disabled:opacity-50"
              >
                EDIT
              </button>
            </div>

            <div className="flex items-center gap-3 p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-5 w-5"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M3 10h18" />
                </svg>
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  {state.paymentMethod === "Mock"
                    ? "Mock Payment"
                    : state.paymentMethod}
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Selected payment method
                </p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="bg-gray-950 px-5 py-4 text-white">
              <h2 className="text-sm font-bold tracking-wide">
                ORDER ITEMS ({cartItems.length})
              </h2>
            </div>

            <div className="divide-y divide-gray-100 px-5">
              {cartItems.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="break-words font-semibold text-gray-900">
                      {item.productName}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                    </p>
                  </div>

                  <p className="shrink-0 font-bold text-gray-900">
                    ₹{item.itemSubtotal.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {message && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {message}
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            totals={{
              shippingCharge: checkout.shippingCharge,
              tax: checkout.tax,
              totalAmount: checkout.totalAmount,
            }}
            isFormValid={!isBusy}
            actionType="button"
            actionLabel={
              confirmedOrderId !== null
                ? "ORDER CONFIRMED"
                : isSubmitting
                  ? "PROCESSING PAYMENT..."
                  : "ORDER NOW"
            }
            onAction={handlePlaceOrder}
          />

          <p className="mt-3 text-center text-xs text-gray-500">
            Your final total is based on the checkout calculation.
          </p>
        </div>
      </div>
    </main>
  );
}

export default CheckoutReview;
