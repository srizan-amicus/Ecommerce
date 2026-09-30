import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import type { CheckoutFormData } from "../../../types/checkout";
import useLocationOptions from "../../../hooks/useLocationOptions";
import ShippingFieldsHookForm from "./ShippingFieldsHookForm";
import ShippingMethodHookForm from "./ShippingMethodHookForm";

type ShippingFormHookFormProps = {
  children?: React.ReactNode;
};

function ShippingFormHookForm({ children }: ShippingFormHookFormProps) {
  const methods = useForm<CheckoutFormData>({
    mode: "onChange",

    defaultValues: {
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
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = methods;

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

  const country = watch("country");
  const state = watch("state");

  useEffect(() => {
    if (!country) {
      setStates([]);
      setCities([]);
      return;
    }

    loadStates(country);
    setCities([]);
  }, [country]);

  useEffect(() => {
    if (!country || !state) {
      setCities([]);
      return;
    }

    loadCities(country, state);
  }, [country, state]);

  const handleCountryChange = (value: string) => {
    reset(
      {
        ...watch(),
        country: value,
        state: "",
        city: "",
      },
      {
        keepErrors: false,
        keepDirty: true,
      },
    );
  };

  const handleStateChange = (value: string) => {
    reset(
      {
        ...watch(),
        state: value,
        city: "",
      },
      {
        keepErrors: false,
        keepDirty: true,
      },
    );
  };

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Order submitted:", data);

    setSuccessMessage("Order placed successfully!");

    reset({
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
  };

  return (
    <FormProvider {...methods}>
      <form
        id="checkout-form"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]"
        noValidate
      >
        <section className="border border-gray-300 bg-white">
          <div className="bg-[#1f1f1f] px-4 py-2 text-sm font-bold text-white">
            SHIPPING INFORMATION
          </div>

          <div className="space-y-4 p-4">
            <ShippingFieldsHookForm
              register={register}
              errors={errors}
              countries={countries}
              states={states}
              cities={cities}
              loadingCountries={loadingCountries}
              loadingStates={loadingStates}
              loadingCities={loadingCities}
              country={country}
              state={state}
              onCountryChange={handleCountryChange}
              onStateChange={handleStateChange}
            />

            <ShippingMethodHookForm register={register} errors={errors} />

            {successMessage && (
              <p className="rounded-md bg-green-100 p-3 text-sm text-green-700">
                {successMessage}
              </p>
            )}
          </div>
        </section>

        {children}
      </form>
    </FormProvider>
  );
}

export default ShippingFormHookForm;
