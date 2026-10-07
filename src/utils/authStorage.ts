import type { AuthResponse } from "../types/auth";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const CUSTOMER_ID_KEY = "customerId";
const CUSTOMER_NAME_KEY = "customerName";
const CUSTOMER_ROLE_KEY = "customerRole";

export function saveAuth(auth: AuthResponse) {
  localStorage.setItem(ACCESS_TOKEN_KEY, auth.token);
  localStorage.setItem(REFRESH_TOKEN_KEY, auth.refreshToken);
  localStorage.setItem(CUSTOMER_ID_KEY, String(auth.customerId));
  localStorage.setItem(CUSTOMER_NAME_KEY, auth.name);
  localStorage.setItem(CUSTOMER_ROLE_KEY, auth.role);
}

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

export function clearAuth() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(CUSTOMER_ID_KEY);
  localStorage.removeItem(CUSTOMER_NAME_KEY);
  localStorage.removeItem(CUSTOMER_ROLE_KEY);
}
