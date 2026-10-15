import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import useCart from "../hooks/useCart";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import OrderSummary from "../components/Checkout/OrderSummary";
import Button from "../components/Common/Button";
import PageMetadata from "../components/Common/PageMetadata";

import { ButtonVariant } from "../enums/button";
import { SHIPPING_METHODS } from "../constants/shipping";
import { createOrder } from "../api/orderApi";

interface CheckoutNavigationState {
  addressId: number;
  shippingMethod?: string;
  paymentMethod?: string;
}

const PAYMENT_METHODS = [
  {
    value: "Card",
    title: "Debit / Credit Card",
    description: "Pay securely with your card",
    icon: "▣",
  },
  {
    value: "UPI",
    title: "UPI",
    description: "Google Pay, PhonePe and more",
    icon: "⌁",
  },
  {
    value: "CashOnDelivery",
    title: "Cash on Delivery",
    description: "Pay when your order arrives",
    icon: "₹",
  },
] as const;

const SHIPPING_DETAILS: Record<string, { description: string; icon: string }> =
  {
    Standard: {
      description: "Reliable delivery at an affordable price",
      icon: "▤",
    },
    Express: {
      description: "A faster way to receive your order",
      icon: "➜",
    },
    Overnight: {
      description: "Priority delivery for your purchase",
      icon: "⚡",
    },
  };

function CheckoutPayment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, subtotal } = useCart();

  const state = location.state as CheckoutNavigationState | null;

  const [shippingMethod, setShippingMethod] = useState(
    state?.shippingMethod ?? "Express",
  );
  const [paymentMethod, setPaymentMethod] = useState(
    state?.paymentMethod ?? "UPI",
  );
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!state?.addressId) {
    return (
      <>
        <PageMetadata
          title="Checkout Payment — SwiftCart"
          description="Choose your shipping and payment options to continue your SwiftCart checkout."
        />

        <main className="mx-auto max-w-3xl px-6 py-10">
          <p className="text-red-600">
            Your checkout session is missing its shipping address.
          </p>

          <Button
            type="button"
            variant={ButtonVariant.Primary}
            onClick={() => navigate("/checkout", { replace: true })}
            className="!mt-4 !w-auto !rounded-xl !px-4 !py-2"
          >
            Return to Shipping
          </Button>
        </main>
      </>
    );
  }

  if (cartItems.length === 0) {
    return (
      <>
        <PageMetadata
          title="Checkout Payment — SwiftCart"
          description="Your cart is empty. Return to your SwiftCart cart to add products before continuing checkout."
        />

        <main className="mx-auto max-w-3xl px-6 py-10">
          <p>Your cart is empty.</p>

          <Button
            type="button"
            variant={ButtonVariant.Primary}
            onClick={() => navigate("/cart")}
            className="!mt-4 !w-auto !rounded-xl !px-4 !py-2"
          >
            Return to Cart
          </Button>
        </main>
      </>
    );
  }

  const selectedShipping = SHIPPING_METHODS.find(
    (method) => method.value === shippingMethod,
  );

  const estimatedShipping = selectedShipping?.price ?? 0;
  const estimatedTax = subtotal * 0.18;
  const estimatedTotal = subtotal + estimatedShipping + estimatedTax;

  const handleReviewOrder = async () => {
    if (isSubmitting) return;

    setMessage("");
    setIsSubmitting(true);

    try {
      const checkout = await createOrder({
        addressId: state.addressId,
        shippingMethod,
        paymentMethod,
      });

      if (!Number.isInteger(checkout.orderId) || checkout.orderId <= 0) {
        throw new Error("Checkout did not return a valid order ID.");
      }

      if (checkout.stockIssues.length > 0 || checkout.priceChanges.length > 0) {
        setMessage(
          "Your cart has stock issues or price changes. Please review them before continuing.",
        );
        return;
      }

      if (
        !Number.isFinite(checkout.subtotal) ||
        !Number.isFinite(checkout.shippingCharge) ||
        !Number.isFinite(checkout.tax) ||
        !Number.isFinite(checkout.totalAmount) ||
        checkout.totalAmount <= 0
      ) {
        setMessage(
          `Checkout #${checkout.orderId} returned invalid totals. Check My Orders before retrying.`,
        );
        return;
      }

      navigate("/checkout/review", {
        state: {
          addressId: state.addressId,
          shippingMethod,
          paymentMethod,
          checkout,
        },
      });
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error("Checkout calculation failed:", error);
      }

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to calculate checkout. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedCard =
    "border-orange-500 bg-orange-50/70 ring-1 ring-orange-500";

  const unselectedCard =
    "border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-50/30";

  return (
    <>
      <PageMetadata
        title="Payment — SwiftCart"
        description="Choose your preferred delivery speed and payment method, review estimated charges, and continue your SwiftCart order."
      />

      <main className="mx-auto min-h-screen max-w-[1280px] px-4 py-6 text-gray-800 sm:px-6">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
            Almost there
          </p>

          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-gray-950 sm:text-3xl">
            Payment<span className="text-orange-500">.</span>
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Choose your delivery speed and preferred payment method.
          </p>
        </div>

        <CheckoutSteps activeStep={2} />

        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.7fr_1fr]">
          <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="bg-gray-950 px-5 py-4 text-white">
              <h2 className="text-sm font-bold tracking-wide">
                SHIPPING & PAYMENT
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                Select the options that work for you.
              </p>
            </div>

            <div className="space-y-8 p-5 sm:p-6">
              <fieldset>
                <legend className="text-base font-bold text-gray-950">
                  Shipping method
                </legend>

                <p className="mt-1 text-sm text-gray-500">
                  How quickly would you like your order?
                </p>

                <div className="mt-4 grid gap-3">
                  {SHIPPING_METHODS.map((method) => {
                    const selected = shippingMethod === method.value;

                    const details = SHIPPING_DETAILS[method.value] ?? {
                      description: "Choose this delivery option",
                      icon: "↗",
                    };

                    return (
                      <label
                        key={method.value}
                        className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition duration-200 ${
                          selected ? selectedCard : unselectedCard
                        }`}
                      >
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={method.value}
                          checked={selected}
                          onChange={() => setShippingMethod(method.value)}
                          className="sr-only"
                        />

                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-xl ${
                            selected
                              ? "bg-orange-500 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                          aria-hidden="true"
                        >
                          {details.icon}
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block font-bold text-gray-900">
                            {method.label}
                          </span>

                          <span className="mt-1 block text-xs leading-5 text-gray-500 sm:text-sm">
                            {details.description}
                          </span>
                        </span>

                        <span className="shrink-0 text-right">
                          <span className="block font-extrabold text-gray-950">
                            ₹{method.price.toFixed(2)}
                          </span>

                          <span className="mt-1 block text-xs text-gray-500">
                            {selected ? "Selected" : "Delivery"}
                          </span>
                        </span>

                        <span
                          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                            selected
                              ? "border-orange-500 bg-orange-500 text-white"
                              : "border-gray-300"
                          }`}
                          aria-hidden="true"
                        >
                          {selected && (
                            <svg
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              className="h-3 w-3"
                            >
                              <path
                                d="m4 10 4 4 8-8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="text-base font-bold text-gray-950">
                  Payment method
                </legend>

                <p className="mt-1 text-sm text-gray-500">
                  Choose how you prefer to pay.
                </p>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {PAYMENT_METHODS.map((method) => {
                    const selected = paymentMethod === method.value;

                    return (
                      <label
                        key={method.value}
                        className={`relative flex cursor-pointer flex-col rounded-xl border p-4 transition duration-200 ${
                          selected ? selectedCard : unselectedCard
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.value}
                          checked={selected}
                          onChange={() => setPaymentMethod(method.value)}
                          className="sr-only"
                        />

                        <span
                          className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl font-bold ${
                            selected
                              ? "bg-orange-500 text-white"
                              : "bg-gray-100 text-gray-600"
                          }`}
                          aria-hidden="true"
                        >
                          {method.icon}
                        </span>

                        <span className="mt-4 font-bold text-gray-900">
                          {method.title}
                        </span>

                        <span className="mt-1 text-xs leading-5 text-gray-500">
                          {method.description}
                        </span>

                        <span
                          className={`absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full border ${
                            selected
                              ? "border-orange-500 bg-orange-500 text-white"
                              : "border-gray-300"
                          }`}
                          aria-hidden="true"
                        >
                          {selected && "✓"}
                        </span>
                      </label>
                    );
                  })}
                </div>

                <p className="mt-3 text-xs leading-5 text-gray-500">
                  Your selected method is recorded with your order. Payment
                  processing uses the existing payment service.
                </p>
              </fieldset>

              {message && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  {message}
                </div>
              )}

              <div className="flex flex-col justify-between gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center">
                <p className="max-w-sm text-xs leading-5 text-gray-500">
                  Review your selections before proceeding to the final order
                  review.
                </p>

                <Button
                  type="button"
                  variant={ButtonVariant.Outline}
                  disabled={isSubmitting}
                  onClick={() =>
                    navigate("/checkout", {
                      state: { addressId: state.addressId },
                    })
                  }
                  className="!w-auto !rounded-xl !border-gray-200 !px-5 !py-3 !text-sm !font-bold !text-gray-700 hover:!border-gray-300 hover:!bg-gray-50 disabled:!opacity-50"
                >
                  ← Back to Shipping
                </Button>
              </div>
            </div>
          </section>

          <div className="lg:sticky lg:top-6">
            <OrderSummary
              cartItems={cartItems}
              subtotal={subtotal}
              totals={{
                shippingCharge: estimatedShipping,
                tax: estimatedTax,
                totalAmount: estimatedTotal,
                isEstimate: true,
              }}
              isFormValid={!isSubmitting}
              actionType="button"
              actionLabel={isSubmitting ? "CALCULATING..." : "REVIEW ORDER"}
              onAction={handleReviewOrder}
            />

            <p className="mt-3 text-center text-xs leading-5 text-gray-500">
              Final shipping charges and totals are confirmed at checkout.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default CheckoutPayment;
