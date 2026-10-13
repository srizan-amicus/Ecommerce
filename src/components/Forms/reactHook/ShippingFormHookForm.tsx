import { useEffect, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import type { CheckoutFormData } from "../../../types/checkout";
import useLocationOptions from "../../../hooks/useLocationOptions";
import useCart from "../../../hooks/useCart";

import ShippingFieldsHookForm from "./ShippingFieldsHookForm";

import { createAddress, getAddresses } from "../../../api/addressApi";
import type { Address } from "../../../api/addressApi";

import Button from "../../Common/Button";
import { ButtonVariant } from "../../../enums/button";

type ShippingFormHookFormProps = {
  children?: React.ReactNode;
};

function ShippingFormHookForm({ children }: ShippingFormHookFormProps) {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const methods = useForm<CheckoutFormData>({
    mode: "onChange",
    shouldUnregister: true,
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
      paymentMethod: "Mock",
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    trigger,
    setValue,
    formState: { errors, isSubmitting },
  } = methods;

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState("new");
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [message, setMessage] = useState("");
  const [isAddressPickerOpen, setIsAddressPickerOpen] = useState(false);

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

  const country = useWatch({ control, name: "country" });
  const state = useWatch({ control, name: "state" });

  const selectedAddress = addresses.find(
    (address) => String(address.addressId) === selectedAddressId,
  );

  useEffect(() => {
    let active = true;

    async function loadSavedAddresses() {
      try {
        const result = await getAddresses();

        if (active) {
          setAddresses(result);

          const defaultAddress = result.find((address) => address.isDefault);

          if (defaultAddress) {
            setSelectedAddressId(String(defaultAddress.addressId));
          }
        }
      } catch (error) {
        console.error("Failed to load addresses:", error);

        if (active) {
          setMessage(
            "Could not load saved addresses. You can still enter a new address.",
          );
        }
      } finally {
        if (active) {
          setLoadingAddresses(false);
        }
      }
    }

    void loadSavedAddresses();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (selectedAddressId !== "new" || !country) {
      setStates([]);
      setCities([]);
      return;
    }

    loadStates(country);
    setCities([]);
  }, [country, loadStates, selectedAddressId, setCities, setStates]);

  useEffect(() => {
    if (selectedAddressId !== "new" || !country || !state) {
      setCities([]);
      return;
    }

    loadCities(country, state);
  }, [country, loadCities, selectedAddressId, setCities, state]);

  const handleAddressSelection = (addressId: string) => {
    setSelectedAddressId(addressId);
    setIsAddressPickerOpen(false);
    setMessage("");

    if (addressId !== "new") {
      // Hidden new-address fields should not block saved-address checkout.
      reset(
        {
          ...getValues(),
          streetAddress: "",
          apartment: "",
          city: "",
          state: "",
          zip: "",
          country: "",
        },
        {
          keepErrors: false,
          keepDirty: false,
        },
      );
    } else {
      // Validate the new-address fields as the user fills them in.
      void trigger();
    }
  };

  const handleCountryChange = (value: string) => {
    // Update the selected country directly in React Hook Form.
    // Clear dependent fields without resetting the entire form.
    setValue("country", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setValue("state", "", {
      shouldDirty: true,
      shouldValidate: true,
    });

    setValue("city", "", {
      shouldDirty: true,
      shouldValidate: true,
    });

    setStates([]);
    setCities([]);
  };

  const handleStateChange = (value: string) => {
    setValue("state", value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setValue("city", "", {
      shouldDirty: true,
      shouldValidate: true,
    });

    setCities([]);
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setMessage("");

    if (cartItems.length === 0) {
      setMessage("Your cart is empty. Please add a product before checkout.");
      return;
    }

    try {
      let addressId: number;

      if (selectedAddressId === "new") {
        const savedAddress = await createAddress({
          addressLine1: data.streetAddress,
          addressLine2: data.apartment || "",
          city: data.city,
          state: data.state,
          postalCode: data.zip,
          country: data.country,
          isDefault: addresses.length === 0,
        });

        addressId = savedAddress.addressId;
      } else {
        addressId = Number(selectedAddressId);
      }

      if (!Number.isInteger(addressId) || addressId <= 0) {
        throw new Error("Please select a valid shipping address.");
      }

      navigate("/checkout/payment", {
        state: { addressId },
      });
    } catch (error) {
      console.error("Unable to continue checkout:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to continue checkout. Please try again.",
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        id="checkout-form"
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6 lg:grid-cols-[1.7fr_1fr]"
        noValidate
      >
        <section className="border border-gray-200 bg-white">
          <div className="bg-[#1f1f1f] px-4 py-3 text-sm font-bold text-white">
            SHIPPING INFORMATION
          </div>

          <div className="space-y-5 p-4 sm:p-5">
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="text-sm font-semibold text-gray-800">
                  Delivery address
                </label>

                <Button
                  type="button"
                  variant={ButtonVariant.Compact}
                  onClick={() => handleAddressSelection("new")}
                  className="!h-auto !min-h-0 !w-auto !rounded-none !px-0 !py-0 !text-sm !font-semibold !text-orange-600 hover:!bg-transparent hover:!text-orange-700"
                >
                  + Add new address
                </Button>
              </div>

              <button
                type="button"
                aria-expanded={isAddressPickerOpen}
                onClick={() => setIsAddressPickerOpen((open) => !open)}
                disabled={loadingAddresses}
                className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-300 bg-white p-4 text-left transition hover:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200 disabled:cursor-wait disabled:opacity-60"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {loadingAddresses
                      ? "Loading saved addresses..."
                      : selectedAddressId === "new"
                        ? "Use a new address"
                        : (selectedAddress?.addressLine1 ??
                          "Select a delivery address")}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {selectedAddressId === "new"
                      ? "Enter your delivery details"
                      : selectedAddress
                        ? `${selectedAddress.city}, ${selectedAddress.state}`
                        : "Choose a saved delivery address"}
                  </p>
                </div>

                <span
                  className="shrink-0 text-xs text-gray-500"
                  aria-hidden="true"
                >
                  {isAddressPickerOpen ? "▲" : "▼"}
                </span>
              </button>

              {isAddressPickerOpen && (
                <div className="mt-3 space-y-3">
                  {addresses.length === 0 && (
                    <p className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-500">
                      No saved addresses yet. Add a new address to continue.
                    </p>
                  )}

                  {addresses.map((address) => {
                    const isSelected =
                      String(address.addressId) === selectedAddressId;

                    return (
                      <button
                        key={address.addressId}
                        type="button"
                        onClick={() =>
                          handleAddressSelection(String(address.addressId))
                        }
                        className={`w-full rounded-lg border p-4 text-left transition ${
                          isSelected
                            ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500"
                            : "border-gray-200 bg-white hover:border-orange-300"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-sm font-semibold text-gray-900">
                                {address.addressLine1}
                              </span>

                              {address.isDefault && (
                                <span className="rounded-full bg-orange-100 px-2 py-1 text-[10px] font-bold text-orange-700">
                                  DEFAULT
                                </span>
                              )}
                            </div>

                            {address.addressLine2 && (
                              <p className="mt-1 text-sm text-gray-600">
                                {address.addressLine2}
                              </p>
                            )}

                            <p className="mt-1 text-sm text-gray-600">
                              {address.city}, {address.state}{" "}
                              {address.postalCode}
                            </p>

                            <p className="mt-1 text-sm text-gray-500">
                              {address.country}
                            </p>
                          </div>

                          <span
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs ${
                              isSelected
                                ? "border-orange-500 bg-orange-500 text-white"
                                : "border-gray-300 text-transparent"
                            }`}
                            aria-hidden="true"
                          >
                            ✓
                          </span>
                        </div>
                      </button>
                    );
                  })}

                  <Button
                    type="button"
                    variant={ButtonVariant.Outline}
                    onClick={() => handleAddressSelection("new")}
                    className="!w-full !rounded-lg !border-dashed !border-gray-300 !px-3 !py-3 !text-sm !font-semibold !text-orange-600 hover:!border-orange-400 hover:!bg-orange-50"
                  >
                    + Use a new address
                  </Button>
                </div>
              )}
            </div>

            {selectedAddressId === "new" && (
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
            )}

            {message && (
              <p
                role="alert"
                className="rounded-md bg-red-50 p-3 text-sm text-red-700"
              >
                {message}
              </p>
            )}

            <p className="text-xs leading-5 text-gray-500">
              {loadingAddresses
                ? "Loading your saved delivery addresses..."
                : "Confirm your delivery address before proceeding to payment."}
            </p>
          </div>
        </section>

        {children}
      </form>

      {isSubmitting && (
        <p className="mt-3 text-center text-sm text-gray-600">
          Saving your address...
        </p>
      )}
    </FormProvider>
  );
}

export default ShippingFormHookForm;
