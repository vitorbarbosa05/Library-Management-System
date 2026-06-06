import http from "@/src/lib/api-client";
import type {AuthResponse, AuthUser, LoginPayload, RegisterPayload,} from "@/src/(modules)/auth/types/auth.types";

export const AuthApi = {
    register: async (payload: RegisterPayload): Promise<AuthResponse> => {
        const {data} = await http.post<AuthResponse>("/auth/register", payload);
        return data;
    },

    login: async (payload: LoginPayload): Promise<AuthResponse> => {
        const {data} = await http.post<AuthResponse>("/auth/login", payload);
        return data;
    },

    me: async (): Promise<AuthUser> => {
        const {data} = await http.get<AuthUser>("/auth/me");
        return data;
    },
};