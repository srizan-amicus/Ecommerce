import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CheckoutFormData } from "../../../types/checkout";

interface ShippingMethodHookFormProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;
}

function ShippingMethodHookForm({
  register,
  errors,
}: ShippingMethodHookFormProps) {
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
              value={method}
              {...register("shippingMethod", {
                required: "Shipping Method is required.",
              })}
            />

            {method}
          </label>
        ))}
      </div>

      {errors.shippingMethod && (
        <p className="mt-1 text-xs text-red-500">
          {errors.shippingMethod.message}
        </p>
      )}
    </div>
  );
}

export default ShippingMethodHookForm;
