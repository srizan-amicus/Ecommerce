import type { CheckoutFormData } from "../types/checkout";

export type CheckoutErrors = Partial<Record<keyof CheckoutFormData, string>>;

export function validateField(
  name: keyof CheckoutFormData,
  value: string,
): string {
  switch (name) {
    case "fullName": {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        return "Full Name is required.";
      }

      if (trimmedValue.length < 3) {
        return "Full Name must be at least 3 characters.";
      }

      if (trimmedValue.length > 50) {
        return "Full Name must not exceed 50 characters.";
      }

      return "";
    }

    case "email": {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        return "Email is required.";
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(trimmedValue)) {
        return "Please enter a valid email address.";
      }

      return "";
    }

    case "phone":
      if (!value) {
        return "Phone is required.";
      }

      if (!/^\d{10}$/.test(value)) {
        return "Phone must contain exactly 10 digits.";
      }

      return "";

    case "streetAddress": {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        return "Street Address is required.";
      }

      if (trimmedValue.length < 10) {
        return "Street Address must be at least 10 characters.";
      }

      return "";
    }

    case "apartment":
      return "";

    case "country":
      return value ? "" : "Country is required.";

    case "state":
      return value ? "" : "State is required.";

    case "city":
      return value ? "" : "City is required.";

    case "zip":
      if (!value) {
        return "ZIP is required.";
      }

      if (!/^\d{5,6}$/.test(value)) {
        return "ZIP must contain 5–6 digits.";
      }

      return "";

    case "shippingMethod":
      return value ? "" : "Shipping Method is required.";

    default:
      return "";
  }
}

export function validateForm(formData: CheckoutFormData): CheckoutErrors {
  const errors: CheckoutErrors = {};

  (Object.keys(formData) as Array<keyof CheckoutFormData>).forEach((field) => {
    const error = validateField(field, formData[field]);

    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}
