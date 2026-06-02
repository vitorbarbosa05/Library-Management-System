import http from "@/src/lib/api-client";
import type {AuthResponse, LoginPayload, RegisterPayload} from "@/src/(modules)/auth/types/auth.types.ts";

export const AuthApi = {
    register: async (payload: RegisterPayload): Promise<AuthResponse> => {
        const {data} = await http.post<AuthResponse>("/auth/regsiter", payload);
        return data;
    },

    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        const {data} = await http.post<AuthResponse>("/auth/login", payload);
        return data;
    },
}