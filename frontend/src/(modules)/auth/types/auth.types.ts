import type {UUID} from "@/src/lib/types/uuid.types.ts";

export type Role = "MEMBER" | "LIBRARIAN" | "ADMIN";

export type AuthStatus =
    | "idle"
    | "loading"
    | "authenticated"
    | "unauthenticated";

export type AuthUser = {
    id: UUID;
    name: string;
    email: string;
    role: Role;
};

export type AuthToken = {
    accessToken: string;
    tokenType: string;
    expiresIn: string;
};


export type LoginPayload = {
    email: string;
    password: string;
};

export type RegisterPayload = {
    name: string;
    email: string;
    password: string;
};

export type AuthResponse = {
    message: string;
    user: AuthUser;
    token: AuthToken;
};

export type AuthContextValue = {
    status: AuthStatus;
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
};

export const AUTH_TOKEN_STORAGE_KEY = "library:auth:token";
export const AUTH_TOKEN_COOKIE_KEY = "library:auth:token";