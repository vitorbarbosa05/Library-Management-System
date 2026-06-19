import type {
    BookDetailResponse,
    BookResponse,
    BooksResponse,
    CreateBookRequest,
    UpdateBookRequest,
} from "@/src/(modules)/books/types/book.types";
import http from "@/src/lib/api-client";
import type {UUID} from "@/src/lib/types/uuid.types";
import type {ApiResponse, PaginationQuery} from "@/src/lib/types/api.types";

export const BookApi = {
    create: async (payload: CreateBookRequest): Promise<BookResponse> => {
        const {data} = await http.post<ApiResponse<BookResponse>>("/books", payload,);
        return data.data;
    },

    update: async (publicId: UUID, payload: UpdateBookRequest,): Promise<BookResponse> => {
        const {data} = await http.patch<ApiResponse<BookResponse>>(`/books/${publicId}`, payload,);
        return data.data;
    },

    delete: async (publicId: UUID): Promise<BookResponse> => {
        const {data} = await http.delete<ApiResponse<BookResponse>>(`/books/${publicId}`,);
        return data.data;
    },

    getBooks: async (params?: PaginationQuery): Promise<BooksResponse> => {
        const {data} = await http.get<BooksResponse>("/books", {params});
        return data;
    },

    getBookByPublicId: async (publicId: UUID): Promise<BookDetailResponse> => {
        const {data} = await http.get<ApiResponse<BookDetailResponse>>(`/books/${publicId}`,);
        return data.data;
    },
};