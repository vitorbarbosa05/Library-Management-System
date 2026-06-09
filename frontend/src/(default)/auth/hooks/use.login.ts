import {useCallback, useState} from "react";
import type {AuthResponse, LoginPayload} from "@/src/(default)/auth/types/auth.types.ts";
import {setStoredAuthToken} from "@/src/(default)/auth/storage/auth.storage.ts";
import {AuthApi} from "@/src/(default)/auth/api/auth.api.ts";

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