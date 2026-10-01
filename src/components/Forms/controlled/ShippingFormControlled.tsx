import { useState } from "react";
import type { CheckoutFormData } from "../../../types/checkout";
import useLocationOptions from "../../../hooks/useLocationOptions";
import {
  validateField,
  validateForm,
  type CheckoutErrors,
} from "../../../utils/checkoutValidation";
import OrderSummary from "../../Checkout/OrderSummary";
import ShippingFields from "./ShippingFields";
import ShippingMethod from "./ShippingMethod";

function ShippingFormControlled() {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    email: "",
    phone: "",
    streetAddress: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    shippingMethod: "",
  });

  const [errors, setErrors] = useState<CheckoutErrors>({});
  const [successMessage, setSuccessMessage] = useState("");

  const {
    countries,
    states,
    cities,
    loadingCountries,
    loadingStates,
    loadingCities,
    loadStates,
    loadCities,
    setStates,
    setCities,
  } = useLocationOptions();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof CheckoutFormData;

    setSuccessMessage("");

    const error = validateField(fieldName, value);

    if (fieldName === "country") {
      setFormData((prev) => ({
        ...prev,
        country: value,
        state: "",
        city: "",
      }));

      setErrors((prev) => ({
        ...prev,
        country: error,
        state: "",
        city: "",
      }));

      setStates([]);
      setCities([]);
      loadStates(value);

      return;
    }

    if (fieldName === "state") {
      setFormData((prev) => ({
        ...prev,
        state: value,
        city: "",
      }));

      setErrors((prev) => ({
        ...prev,
        state: error,
        city: "",
      }));

      setCities([]);
      loadCities(formData.country, value);

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const requiredFields: Array<keyof CheckoutFormData> = [
    "fullName",
    "email",
    "phone",
    "streetAddress",
    "city",
    "state",
    "zip",
    "country",
    "shippingMethod",
  ];

  const isFormValid = requiredFields.every(
    (field) =>
      formData[field].trim() !== "" &&
      validateField(field, formData[field]) === "",
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateForm(formData);

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    console.log("Order submitted:", formData);

    setSuccessMessage("Order placed successfully!");

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      streetAddress: "",
      apartment: "",
      city: "",
      state: "",
      zip: "",
      country: "",
      shippingMethod: "",
    });

    setStates([]);
    setCities([]);
    setErrors({});
  };

  return (
    <form
    id="checkout-form"
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]"
      noValidate
    >
      <section className="border border-gray-300 bg-white">
        <div className="bg-[#1f1f1f] px-4 py-2 text-sm font-bold text-white">
          SHIPPING INFORMATION
        </div>

        <div className="space-y-4 p-4">
          <ShippingFields
            formData={formData}
            errors={errors}
            countries={countries}
            states={states}
            cities={cities}
            loadingCountries={loadingCountries}
            loadingStates={loadingStates}
            loadingCities={loadingCities}
            onChange={handleChange}
          />

          <ShippingMethod
            value={formData.shippingMethod}
            error={errors.shippingMethod}
            onChange={handleChange}
          />

          {successMessage && (
            <p className="rounded-md bg-green-100 p-3 text-sm text-green-700">
              {successMessage}
            </p>
          )}
        </div>
      </section>

      <OrderSummary isFormValid={isFormValid} />

    </form>
  );
}

export default ShippingFormControlled;