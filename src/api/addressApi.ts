import { apiRequest } from "./apiClient";

export interface Address {
  addressId: number;
  addressLine1: string;
  addressLine2?: string | null;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface CreateAddressRequest {
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface CreateAddressResponse {
  addressId: number;
  message: string;
}

export async function getAddresses(): Promise<Address[]> {
  const response = await apiRequest("/api/v1/addresses");

  if (!response.ok) {
    throw new Error("Failed to fetch addresses.");
  }

  return response.json();
}

export async function createAddress(
  address: CreateAddressRequest,
): Promise<CreateAddressResponse> {
  const response = await apiRequest("/api/v1/addresses", {
    method: "POST",
    body: JSON.stringify(address),
  });

  if (!response.ok) {
    throw new Error("Failed to create address.");
  }

  return response.json();
}
