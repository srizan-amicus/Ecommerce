import type { CheckoutFormData } from "../types/checkout";
import type { CheckoutErrors } from "../utils/checkoutValidation";

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
      <div>
        <label
          htmlFor="fullName"
          className="mb-1 block text-xs font-semibold text-gray-700"
        >
          Full Name
        </label>

        <input
          id="fullName"
          name="fullName"
          type="text"
          value={formData.fullName}
          onChange={onChange}
          className="h-9 w-full border border-gray-300 px-3 text-xs outline-none focus:border-orange-500"
        />

        {errors.fullName && (
          <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
        )}
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-xs font-semibold text-gray-700"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            className="h-9 w-full border border-gray-300 px-3 text-xs outline-none focus:border-orange-500"
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="mb-1 block text-xs font-semibold text-gray-700"
          >
            Phone
          </label>

          <input
            id="phone"
            name="phone"
            type="number"
            value={formData.phone}
            onChange={onChange}
            className="h-9 w-full border border-gray-300 px-3 text-xs outline-none focus:border-orange-500"
          />

          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>

      {/* Street Address */}
      <div>
        <label
          htmlFor="streetAddress"
          className="mb-1 block text-xs font-semibold text-gray-700"
        >
          Street Address
        </label>

        <input
          id="streetAddress"
          name="streetAddress"
          type="text"
          value={formData.streetAddress}
          onChange={onChange}
          className="h-9 w-full border border-gray-300 px-3 text-xs outline-none focus:border-orange-500"
        />

        {errors.streetAddress && (
          <p className="mt-1 text-xs text-red-500">{errors.streetAddress}</p>
        )}
      </div>

      {/* Apt / Suite */}
      <div>
        <label
          htmlFor="apartment"
          className="mb-1 block text-xs font-semibold text-gray-700"
        >
          Apt/Suite{" "}
          <span className="font-normal text-gray-400">(Optional)</span>
        </label>

        <input
          id="apartment"
          name="apartment"
          type="text"
          value={formData.apartment}
          onChange={onChange}
          className="h-9 w-full border border-gray-300 px-3 text-xs outline-none focus:border-orange-500"
        />
      </div>

      {/* City + State */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        <div>
          <label
            htmlFor="zip"
            className="mb-1 block text-xs font-semibold text-gray-700"
          >
            ZIP
          </label>

          <input
            id="zip"
            name="zip"
            type="text"
            value={formData.zip}
            onChange={onChange}
            className="h-9 w-full border border-gray-300 px-3 text-xs outline-none focus:border-orange-500"
          />

          {errors.zip && (
            <p className="mt-1 text-xs text-red-500">{errors.zip}</p>
          )}
        </div>

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
