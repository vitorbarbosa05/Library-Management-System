import axios, {type AxiosInstance, type InternalAxiosRequestConfig} from "axios";
import {clearStoredAuthToken, getStoredAuthToken} from "@/src/(modules)/auth/storage/auth.storage.ts";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
    throw new Error("Missing VITE_API_BASE_URL in frontend .env");
}

const http: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getStoredAuthToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

http.interceptors.response.use((response) =>
    response, (error) => {
        if (error.response?.status === 401) {
            clearStoredAuthToken();
            window.location.href = "/auth/login";
        }
        return Promise.reject(error);
    }
);

export default http;