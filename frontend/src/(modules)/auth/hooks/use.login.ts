import {useCallback, useState} from "react";
import type {AuthResponse, LoginPayload} from "@/src/(modules)/auth/types/auth.types";
import {setStoredAuthToken} from "@/src/(modules)/auth/storage/auth.storage";
import {AuthApi} from "@/src/(modules)/auth/api/auth.api";

export function useLogin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<AuthResponse | null>(null);

    const login = useCallback(async (payload: LoginPayload) => {
        setLoading(true);
        setError(null);
        try {
            const result = await AuthApi.login(payload);
            setStoredAuthToken(result.token.accessToken);
            setData(result);
        } catch (error) {
            setError(
                error instanceof Error ?
                error :
                new Error("Login failed"));
        } finally {
            setLoading(false);
        }
    }, []);

    return {login, loading, error, data};
}