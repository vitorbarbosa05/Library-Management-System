export type ApiResponse<T> = {
    data: T;
    message?: string;
};

export type PaginatedResponse<T> = {
    data: T[];
    meta: {
        total: number;
        page: number;
        size: number;
        totalPages: number;
    };
};

export type PaginationQuery = {
    page?: number;
    size?: number;
    sort?: string;
    order?: "asc" | "desc";
    search?: string;
};