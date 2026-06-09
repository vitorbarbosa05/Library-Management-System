import { createContext } from "react";
import type { AuthContextValue } from "@/src/(default)/auth/types/auth.types";

export const AuthContext = createContext<AuthContextValue | null>(null);