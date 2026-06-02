export type Paginated<T> = {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
};

export type PaginatedResponse<T> = {
    data: T[];
    meta: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
};