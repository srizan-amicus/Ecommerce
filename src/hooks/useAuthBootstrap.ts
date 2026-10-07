import { useEffect, useState } from "react";

import { login } from "../api/authApi";

import {
  getAccessToken,
  getRefreshToken,
  saveAuth,
} from "../utils/authStorage";

export default function useAuthBootstrap() {
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    async function initializeAuth() {
      const accessToken = getAccessToken();

      const refreshToken = getRefreshToken();

      // Existing authentication found.
      if (accessToken && refreshToken) {
        setIsAuthLoading(false);
        return;
      }

      try {
        const email = import.meta.env.VITE_AUTH_EMAIL;

        const password = import.meta.env.VITE_AUTH_PASSWORD;

        if (!email || !password) {
          throw new Error("Authentication credentials are not configured.");
        }

        const authResponse = await login({
          email,
          password,
        });

        saveAuth(authResponse);
      } catch (error) {
        console.error("Automatic authentication failed:", error);
      } finally {
        setIsAuthLoading(false);
      }
    }

    initializeAuth();
  }, []);

  return {
    isAuthLoading,
  };
}
