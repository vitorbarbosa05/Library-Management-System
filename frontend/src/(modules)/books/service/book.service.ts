import type {
    BookDetailResponse,
    BookResponse,
    BooksResponse,
    CreateBookRequest,
    UpdateBookRequest,
} from "@/src/(modules)/books/types/book.types";
import {BookApi} from "@/src/(modules)/books/api/book.api";
import type {UUID} from "@/src/lib/types/uuid.types";
import type {PaginationQuery} from "@/src/lib/types/api.types";

export const BookService = {
    create: async (data: CreateBookRequest): Promise<BookResponse> => {
        return BookApi.create(data);
    },

    update: async (
        publicId: UUID,
        data: UpdateBookRequest,
    ): Promise<BookResponse> => {
        return BookApi.update(publicId, data);
    },

    delete: async (publicId: UUID): Promise<BookResponse> => {
        return BookApi.delete(publicId);
    },

    getBooks: async (params?: PaginationQuery): Promise<BooksResponse> => {
        return BookApi.getBooks(params);
    },

    getBookByPublicId: async (publicId: UUID): Promise<BookDetailResponse> => {
        return BookApi.getBookByPublicId(publicId);
    },
};