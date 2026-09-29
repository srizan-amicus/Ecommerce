import { useFormContext } from "react-hook-form";
import type { CheckoutFormData } from "../types/checkout";

type OrderSummaryProps = {
  isFormValid?: boolean;
};

function OrderSummary({ isFormValid }: OrderSummaryProps) {
  const formContext = useFormContext<CheckoutFormData>();
  const isValid = isFormValid ?? formContext?.formState.isValid ?? false;

  return (
    <section className="border border-gray-300 bg-white">
      <div className="bg-[#1f1f1f] px-4 py-2 text-sm font-bold text-white">
        ORDER SUMMARY
      </div>

      <div className="p-4">
        <div className="space-y-3 text-xs">
          <div className="flex justify-between">
            <span>Wireless Headphones x2</span>
            <span>$99.98</span>
          </div>

          <div className="flex justify-between">
            <span>Smart Watch Pro x1</span>
            <span>$199.99</span>
          </div>

          <div className="flex justify-between">
            <span>USB-C Hub Adapter x3</span>
            <span>$104.97</span>
          </div>
        </div>

        <div className="my-4 border-t border-gray-300" />

        <div className="space-y-3 text-xs">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>$404.94</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>$5.00</span>
          </div>

          <div className="flex justify-between">
            <span>Tax:</span>
            <span>$32.40</span>
          </div>
        </div>

        <div className="my-3 border-t-2 border-orange-500" />

        <div className="flex justify-between text-base font-bold">
          <span>Total:</span>
          <span className="text-orange-600">$442.34</span>
        </div>

        <button
          type="submit"
          form="checkout-form"
          disabled={!isValid}
          className="mt-4 h-10 w-full bg-orange-600 text-xs font-bold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          PLACE ORDER
        </button>
      </div>
    </section>
  );
}

export default OrderSummary;
