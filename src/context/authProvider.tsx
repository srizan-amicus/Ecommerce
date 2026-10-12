import { useCallback, useMemo, useState } from "react";

import { login as loginApi, logout as logoutApi } from "../api/authApi";
import type { AuthResponse, LoginRequest } from "../types/auth";
import {
  clearAuth,
  getAccessToken,
  getRefreshToken,
  saveAuth,
} from "../utils/authStorage";

import { AuthContext } from "./authContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<Pick<
    AuthResponse,
    "customerId" | "name" | "role"
  > | null>(() => {
    const accessToken = getAccessToken();
    const customerId = localStorage.getItem("customerId");
    const name = localStorage.getItem("customerName");
    const role = localStorage.getItem("customerRole");

    if (!accessToken || !customerId || !name || !role) {
      return null;
    }

    return {
      customerId: Number(customerId),
      name,
      role,
    };
  });

  const login = useCallback(
    async (credentials: LoginRequest): Promise<void> => {
      const response = await loginApi(credentials);

      saveAuth(response);

      setUser({
        customerId: response.customerId,
        name: response.name,
        role: response.role,
      });
    },
    [],
  );

  const logout = useCallback(async (): Promise<void> => {
    const refreshToken = getRefreshToken();

    try {
      if (refreshToken) {
        await logoutApi(refreshToken);
      }
    } catch (error) {
      console.error("Server logout failed:", error);
    } finally {
      clearAuth();
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: user !== null,
      login,
      logout,
    }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
