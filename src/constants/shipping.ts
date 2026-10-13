export const SHIPPING_METHODS = [
  { label: "Standard", value: "Standard", price: 100 },
  { label: "Express", value: "Express", price: 250 },
  { label: "Overnight", value: "Same Day", price: 400 },
] as const;

export type ShippingMethodValue = (typeof SHIPPING_METHODS)[number]["value"];
