import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Button from "../Common/Button";
import type { CheckoutFormData } from "../../types/checkout";
import type { CartItemApiResponse } from "../../api/cartApi";
import { ButtonVariant } from "../../enums/button";

export interface OrderSummaryTotals {
  shippingCharge: number;
  tax: number;
  totalAmount: number;
  isEstimate?: boolean;
}

type OrderSummaryProps = {
  cartItems?: CartItemApiResponse[];
  subtotal?: number;
  totals?: OrderSummaryTotals;
  isFormValid?: boolean;
  actionLabel?: string;
  actionType?: "submit" | "button";
  actionForm?: string;
  onAction?: () => void;
  showContinueShopping?: boolean;
  hideTotals?: boolean;
};

function OrderSummary({
  cartItems = [],
  subtotal = 0,
  totals,
  isFormValid,
  actionLabel = "PLACE ORDER",
  actionType = "submit",
  actionForm = "checkout-form",
  onAction,
  showContinueShopping = false,
  hideTotals = false,
}: OrderSummaryProps) {
  const formContext = useFormContext<CheckoutFormData>();
  const navigate = useNavigate();

  const isValid = isFormValid ?? formContext?.formState.isValid ?? false;

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Fallback values preserve the component's existing behavior
  // wherever callers haven't supplied backend totals.
  const shipping = totals?.shippingCharge ?? 15;
  const tax = totals?.tax ?? subtotal * 0.08;
  const total = totals?.totalAmount ?? subtotal + shipping + tax;

  return (
    <section className="border border-gray-300 bg-white">
      <div className="bg-[#1f1f1f] px-4 py-3 text-base font-bold text-white">
        ORDER SUMMARY
      </div>

      <div className="p-4">
        <div className="space-y-3 text-xs">
          {cartItems.map((item) => (
            <div key={item.cartItemId} className="flex justify-between gap-4">
              <span>
                {item.productName} x{item.quantity}
              </span>

              <span>₹{item.itemSubtotal.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="my-4 border-t border-gray-300" />

        <div className="space-y-3 text-xs">
          <div className="flex justify-between gap-3">
            <span>Subtotal ({itemCount} items):</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          {!hideTotals && (
            <>
              <div className="flex justify-between gap-3">
                <span>Shipping:</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between gap-3">
                <span>Tax:</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
            </>
          )}
        </div>

        {hideTotals ? (
          <p className="mt-4 border-t border-gray-300 pt-3 text-xs text-gray-500">
            Shipping charges and tax will be calculated on the next step.
          </p>
        ) : (
          <>
            <div className="my-3 border-t-2 border-orange-500" />

            <div className="flex justify-between gap-3 text-xl font-bold">
              <span>Total:</span>
              <span className="text-orange-600">₹{total.toFixed(2)}</span>
            </div>

            {totals?.isEstimate && (
              <p className="mt-2 text-xs text-gray-500">
                Estimated total. Final charges are confirmed by checkout.
              </p>
            )}
          </>
        )}

        <Button
          type={actionType}
          form={actionForm}
          variant={ButtonVariant.Order}
          disabled={actionType === "submit" && !isValid}
          onClick={onAction}
          className="mt-5 w-full"
        >
          {actionLabel}
        </Button>

        {showContinueShopping && (
          <Button
            type="button"
            variant={ButtonVariant.Order}
            onClick={() => navigate("/product-list")}
            className="mt-3 w-full !bg-[#1f1f1f] hover:!bg-black"
          >
            CONTINUE SHOPPING
          </Button>
        )}
      </div>
    </section>
  );
}

export default OrderSummary;
