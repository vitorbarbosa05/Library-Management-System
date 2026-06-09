import {
    type ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";

import { AuthContext } from "@/src/(default)/auth/context/auth.context.tsx";
import { AuthApi } from "@/src/(default)/auth/api/auth.api.ts";
import type {
    AuthStatus,
    AuthUser,
    LoginPayload,
    RegisterPayload,
} from "@/src/(default)/auth/types/auth.types.ts";
import {
    clearStoredAuthToken,
    getStoredAuthToken,
    setStoredAuthToken,
} from "@/src/(default)/auth/storage/auth.storage.ts";

type AuthProviderProps = {
    children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
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

        try {
            const response = await AuthApi.login(payload);

            setStoredAuthToken(response.token.accessToken);
            setToken(response.token.accessToken);
            setUser(response.user);
            setStatus("authenticated");
        } catch (error) {
            clearStoredAuthToken();
            setToken(null);
            setUser(null);
            setStatus("unauthenticated");
            throw error;
        }
    }, []);

    const register = useCallback(async (payload: RegisterPayload) => {
        setStatus("loading");

        try {
            const response = await AuthApi.register(payload);

            setStoredAuthToken(response.token.accessToken);
            setToken(response.token.accessToken);
            setUser(response.user);
            setStatus("authenticated");
        } catch (error) {
            clearStoredAuthToken();
            setToken(null);
            setUser(null);
            setStatus("unauthenticated");
            throw error;
        }
    }, []);

    const logout = useCallback(async () => {
        clearStoredAuthToken();
        setUser(null);
        setToken(null);
        setStatus("unauthenticated");
    }, []);

    const value = useMemo(() => {
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