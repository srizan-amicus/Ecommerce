import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../Common/Button";
import type { CheckoutFormData } from "../../types/checkout";
import type { CartItemApiResponse } from "../../api/cartApi";
import { ButtonVariant } from "../../enums/button";

type OrderSummaryProps = {
  cartItems?: CartItemApiResponse[];
  subtotal?: number;

  isFormValid?: boolean;

  actionLabel?: string;
  actionType?: "submit" | "button";
  actionForm?: string;
  onAction?: () => void;

  showContinueShopping?: boolean;
};

function OrderSummary({
  cartItems = [],
  subtotal = 0,
  isFormValid,
  actionLabel = "PLACE ORDER",
  actionType = "submit",
  actionForm = "checkout-form",
  onAction,
  showContinueShopping = false,
}: OrderSummaryProps) {
  const formContext = useFormContext<CheckoutFormData>();
  const navigate = useNavigate();

  const isValid = isFormValid ?? formContext?.formState.isValid ?? false;

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const shipping = 15;

  const taxRate = 0.08;

  const tax = subtotal * taxRate;

  const total = subtotal + shipping + tax;

  const handleContinueShopping = () => {
    navigate("/product-list");
  };

  return (
    <section className="border border-gray-300 bg-white">
      {/* Header */}
      <div className="bg-[#1f1f1f] px-4 py-3 text-base font-bold text-white">
        ORDER SUMMARY
      </div>

      <div className="p-4">
        {/* Cart Items */}
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

        {/* Summary */}
        <div className="space-y-3 text-xs">
          <div className="flex justify-between">
            <span>Subtotal ({itemCount} items):</span>

            <span>₹{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping:</span>

            <span>₹{shipping.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax (8%):</span>

            <span>₹{tax.toFixed(2)}</span>
          </div>
        </div>

        <div className="my-3 border-t-2 border-orange-500" />

        {/* Total */}
        <div className="flex justify-between text-xl font-bold">
          <span>Total:</span>

          <span className="text-orange-600">₹{total.toFixed(2)}</span>
        </div>

        {/* Primary Action */}
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

        {/* Continue Shopping */}
        {showContinueShopping && (
          <Button
            type="button"
            variant={ButtonVariant.Order}
            onClick={handleContinueShopping}
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
