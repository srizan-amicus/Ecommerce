import type { CheckoutErrors } from "../../../utils/checkoutValidation";

interface ShippingMethodProps {
  value: string;
  error?: CheckoutErrors["shippingMethod"];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ShippingMethod({ value, error, onChange }: ShippingMethodProps) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold text-gray-700">
        Shipping Method
      </p>

      <div className="space-y-2">
        {["Standard", "Express", "Overnight"].map((method) => (
          <label
            key={method}
            className="flex items-center gap-2 text-xs text-gray-700"
          >
            <input
              type="radio"
              name="shippingMethod"
              value={method}
              checked={value === method}
              onChange={onChange}
            />

            {method}
          </label>
        ))}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default ShippingMethod;
