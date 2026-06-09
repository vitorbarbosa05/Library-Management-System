import {useCallback, useState} from "react";
import type {AuthResponse, RegisterPayload} from "@/src/(default)/auth/types/auth.types.ts";
import {AuthApi} from "@/src/(default)/auth/api/auth.api.ts";
import {setStoredAuthToken} from "@/src/(default)/auth/storage/auth.storage.ts";

export function useRegister() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [data, setData] = useState<AuthResponse | null>(null);

    const register = useCallback(async (payload: RegisterPayload) => {
        setLoading(true);
        setError(null);
        try {
            const result = await AuthApi.register(payload);
            setStoredAuthToken(result.token.accessToken);
            setData(result);
        } catch (error) {
            setError(
                error instanceof Error ?
                    error :
                    new Error("Register failed"));
        } finally {
            setLoading(false);
        }
    }, []);

    return {register, loading, error, data};
}