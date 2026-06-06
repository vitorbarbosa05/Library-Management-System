import {createContext, type ReactNode, useCallback, useContext, useEffect, useMemo, useState,} from "react";

import {AuthApi} from "@/src/(modules)/auth/api/auth.api";
import type {
    AuthContextValue,
    AuthStatus,
    AuthUser,
    LoginPayload,
    RegisterPayload,
} from "@/src/(modules)/auth/types/auth.types";
import {clearStoredAuthToken, getStoredAuthToken, setStoredAuthToken,} from "@/src/(modules)/auth/storage/auth.storage";

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({children}: AuthProviderProps) {
    const [status, setStatus] = useState<AuthStatus>("idle");
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(() => getStoredAuthToken());

    const isAuthenticated = status === "authenticated" && !!user && !!token;

    useEffect(() => {
        async function loadSession() {
            const storedToken = getStoredAuthToken();

            if (!storedToken) {
                setStatus("unauthenticated");
                setUser(null);
                setToken(null);
                return;
            }

            try {
                setStatus("loading");

                const currentUser = await AuthApi.me();

                setUser(currentUser);
                setToken(storedToken);
                setStatus("authenticated");
            } catch {
                clearStoredAuthToken();
                setUser(null);
                setToken(null);
                setStatus("unauthenticated");
            }
        }

        loadSession();
    }, []);

    const login = useCallback(async (payload: LoginPayload) => {
        setStatus("loading");

        const response = await AuthApi.login(payload);

        setStoredAuthToken(response.token.accessToken);
        setToken(response.token.accessToken);
        setUser(response.user);
        setStatus("authenticated");
    }, []);

    const register = useCallback(async (payload: RegisterPayload) => {
        setStatus("loading");

        const response = await AuthApi.register(payload);

        setStoredAuthToken(response.token.accessToken);
        setToken(response.token.accessToken);
        setUser(response.user);
        setStatus("authenticated");
    }, []);

    const logout = useCallback(async () => {
        clearStoredAuthToken();
        setUser(null);
        setToken(null);
        setStatus("unauthenticated");
    }, []);

    const value = useMemo<AuthContextValue>(() => {
        return {
            status,
            user,
            token,
            isAuthenticated,
            login,
            register,
            logout,
        };
    }, [status, user, token, isAuthenticated, login, register, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    return context;
}