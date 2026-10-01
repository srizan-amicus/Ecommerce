import InputField from "../../Common/InputField";
import type { CheckoutFormData } from "../../../types/checkout";
import type { CheckoutErrors } from "../../../utils/checkoutValidation";

interface ShippingFieldsProps {
  formData: CheckoutFormData;
  errors: CheckoutErrors;

  countries: string[];
  states: string[];
  cities: string[];

  loadingCountries: boolean;
  loadingStates: boolean;
  loadingCities: boolean;

  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

function ShippingFields({
  formData,
  errors,
  countries,
  states,
  cities,
  loadingCountries,
  loadingStates,
  loadingCities,
  onChange,
}: ShippingFieldsProps) {
  return (
    <>
      {/* Full Name */}
      <InputField
        id="fullName"
        name="fullName"
        label="Full Name"
        type="text"
        value={formData.fullName}
        onChange={onChange}
        error={errors.fullName}
      />

      {/* Email + Phone */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InputField
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={onChange}
          error={errors.email}
        />

        <InputField
          id="phone"
          name="phone"
          label="Phone"
          type="number"
          value={formData.phone}
          onChange={onChange}
          error={errors.phone}
        />
      </div>

      {/* Street Address */}
      <InputField
        id="streetAddress"
        name="streetAddress"
        label="Street Address"
        type="text"
        value={formData.streetAddress}
        onChange={onChange}
        error={errors.streetAddress}
      />

      {/* Apt / Suite */}
      <InputField
        id="apartment"
        name="apartment"
        label="Apt/Suite"
        type="text"
        value={formData.apartment}
        onChange={onChange}
        optional
      />

      {/* City + State */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* City */}
        <div>
          <label
            htmlFor="city"
            className="mb-1 block text-xs font-semibold text-gray-700"
          >
            City
          </label>

          <select
            id="city"
            name="city"
            value={formData.city}
            onChange={onChange}
            disabled={!formData.state || loadingCities}
            className="h-9 w-full border border-gray-300 bg-white px-3 text-xs outline-none focus:border-orange-500 disabled:bg-gray-100"
          >
            <option value="">
              {loadingCities ? "Loading cities..." : "Select City"}
            </option>

            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {errors.city && (
            <p className="mt-1 text-xs text-red-500">{errors.city}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label
            htmlFor="state"
            className="mb-1 block text-xs font-semibold text-gray-700"
          >
            State
          </label>

          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={onChange}
            disabled={!formData.country || loadingStates}
            className="h-9 w-full border border-gray-300 bg-white px-3 text-xs outline-none focus:border-orange-500 disabled:bg-gray-100"
          >
            <option value="">
              {loadingStates ? "Loading states..." : "Select State"}
            </option>

            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          {errors.state && (
            <p className="mt-1 text-xs text-red-500">{errors.state}</p>
          )}
        </div>
      </div>

      {/* ZIP + Country */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* ZIP */}
        <InputField
          id="zip"
          name="zip"
          label="ZIP"
          type="text"
          value={formData.zip}
          onChange={onChange}
          error={errors.zip}
        />

        {/* Country */}
        <div>
          <label
            htmlFor="country"
            className="mb-1 block text-xs font-semibold text-gray-700"
          >
            Country
          </label>

          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={onChange}
            disabled={loadingCountries}
            className="h-9 w-full border border-gray-300 bg-white px-3 text-xs outline-none focus:border-orange-500 disabled:bg-gray-100"
          >
            <option value="">
              {loadingCountries ? "Loading countries..." : "Select Country"}
            </option>

            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>

          {errors.country && (
            <p className="mt-1 text-xs text-red-500">{errors.country}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default ShippingFields;