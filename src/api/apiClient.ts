import { refreshToken } from "./authApi";

import {
  getAccessToken,
  getRefreshToken,
  saveAuth,
  clearAuth,
} from "../utils/authStorage";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let isRefreshing = false;

let refreshPromise: Promise<boolean> | null = null;

async function refreshAccessToken(): Promise<boolean> {
  const currentRefreshToken = getRefreshToken();

  if (!currentRefreshToken) {
    clearAuth();
    return false;
  }

  try {
    const authResponse = await refreshToken(currentRefreshToken);

    saveAuth(authResponse);

    return true;
  } catch {
    clearAuth();

    return false;
  }
}

export async function apiRequest(
  endpoint: string,
  options: RequestInit = {},
): Promise<Response> {
  const accessToken = getAccessToken();

  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  let response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status !== 401) {
    return response;
  }

  if (!isRefreshing) {
    isRefreshing = true;

    refreshPromise = refreshAccessToken().finally(() => {
      isRefreshing = false;
      refreshPromise = null;
    });
  }

  const refreshed = await refreshPromise;

  if (!refreshed) {
    return response;
  }

  const newAccessToken = getAccessToken();

  const retryHeaders = new Headers(options.headers);

  retryHeaders.set("Content-Type", "application/json");

  if (newAccessToken) {
    retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);
  }

  response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: retryHeaders,
  });

  return response;
}
