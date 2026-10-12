import { createContext } from "react";
import type { AuthResponse, LoginRequest } from "../types/auth";

export interface AuthContextValue {
  user: Pick<AuthResponse, "customerId" | "name" | "role"> | null;
  isLoggedIn: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);
