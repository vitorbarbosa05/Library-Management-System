export type ApiErrorPayload = {
    message?: string;
    error?: string;
    status?: number;
    timestamp?: string;
    path?: string;
    [key: string]: unknown;
};