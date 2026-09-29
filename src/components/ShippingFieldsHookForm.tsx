import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { CheckoutFormData } from "../types/checkout";

interface ShippingFieldsHookFormProps {
  register: UseFormRegister<CheckoutFormData>;
  errors: FieldErrors<CheckoutFormData>;

  countries: string[];
  states: string[];
  cities: string[];

  loadingCountries: boolean;
  loadingStates: boolean;
  loadingCities: boolean;

  country: string;
  state: string;

  onCountryChange: (value: string) => void;
  onStateChange: (value: string) => void;
}

function ShippingFieldsHookForm({
  register,
  errors,
  countries,
  states,
  cities,
  loadingCountries,
  loadingStates,
  loadingCities,
  country,
  state,
  onCountryChange,
  onStateChange,
}: ShippingFieldsHookFormProps) {
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
          type="text"
          {...register("fullName", {
            required: "Full Name is required.",
            validate: (value) => {
              const trimmedValue = value.trim();

              if (trimmedValue.length < 3) {
                return "Full Name must be at least 3 characters.";
              }

              if (trimmedValue.length > 50) {
                return "Full Name must not exceed 50 characters.";
              }

              return true;
            },
          })}
          className="h-9 w-full border border-gray-300 px-3 text-xs outline-none focus:border-orange-500"
        />

        {errors.fullName && (
          <p className="mt-1 text-xs text-red-500">{errors.fullName.message}</p>
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
            type="email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
            className="h-9 w-full border border-gray-300 px-3 text-xs outline-none focus:border-orange-500"
          />

          {errors.email && (
            <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
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
            type="number"
            {...register("phone", {
              required: "Phone is required.",
              pattern: {
                value: /^\d{10}$/,
                message: "Phone must contain exactly 10 digits.",
              },
            })}
            className="h-9 w-full border border-gray-300 px-3 text-xs outline-none focus:border-orange-500"
          />

          {errors.phone && (
            <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
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
          type="text"
          {...register("streetAddress", {
            required: "Street Address is required.",
            validate: (value) =>
              value.trim().length >= 10 ||
              "Street Address must be at least 10 characters.",
          })}
          className="h-9 w-full border border-gray-300 px-3 text-xs outline-none focus:border-orange-500"
        />

        {errors.streetAddress && (
          <p className="mt-1 text-xs text-red-500">
            {errors.streetAddress.message}
          </p>
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
          type="text"
          {...register("apartment")}
          className="h-9 w-full border border-gray-300 px-3 text-xs outline-none focus:border-orange-500"
        />
      </div>

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
            {...register("city", {
              required: "City is required.",
            })}
            disabled={!state || loadingCities}
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
            <p className="mt-1 text-xs text-red-500">{errors.city.message}</p>
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
            {...register("state", {
              required: "State is required.",
              onChange: (e) => {
                onStateChange(e.target.value);
              },
            })}
            disabled={!country || loadingStates}
            className="h-9 w-full border border-gray-300 bg-white px-3 text-xs outline-none focus:border-orange-500 disabled:bg-gray-100"
          >
            <option value="">
              {loadingStates ? "Loading states..." : "Select State"}
            </option>

            {states.map((stateOption) => (
              <option key={stateOption} value={stateOption}>
                {stateOption}
              </option>
            ))}
          </select>

          {errors.state && (
            <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>
          )}
        </div>
      </div>

      {/* ZIP + Country */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* ZIP */}
        <div>
          <label
            htmlFor="zip"
            className="mb-1 block text-xs font-semibold text-gray-700"
          >
            ZIP
          </label>

          <input
            id="zip"
            type="text"
            {...register("zip", {
              required: "ZIP is required.",
              pattern: {
                value: /^\d{5,6}$/,
                message: "ZIP must contain 5–6 digits.",
              },
            })}
            className="h-9 w-full border border-gray-300 px-3 text-xs outline-none focus:border-orange-500"
          />

          {errors.zip && (
            <p className="mt-1 text-xs text-red-500">{errors.zip.message}</p>
          )}
        </div>

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
            {...register("country", {
              required: "Country is required.",
              onChange: (e) => {
                onCountryChange(e.target.value);
              },
            })}
            disabled={loadingCountries}
            className="h-9 w-full border border-gray-300 bg-white px-3 text-xs outline-none focus:border-orange-500 disabled:bg-gray-100"
          >
            <option value="">
              {loadingCountries ? "Loading countries..." : "Select Country"}
            </option>

            {countries.map((countryOption) => (
              <option key={countryOption} value={countryOption}>
                {countryOption}
              </option>
            ))}
          </select>

          {errors.country && (
            <p className="mt-1 text-xs text-red-500">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default ShippingFieldsHookForm;
