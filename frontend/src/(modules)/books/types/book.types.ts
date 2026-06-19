import type {UUID} from "@/src/lib/types/uuid.types";
import type {PaginatedResponse} from "@/src/lib/types/api.types";

export type BookGenre =
    | "FANTASY"
    | "SCIENCE_FICTION"
    | "ACTION_ADVENTURE"
    | "MYSTERY"
    | "HORROR"
    | "THRILLER_SUSPENSE"
    | "HISTORICAL_FICTION"
    | "ROMANCE"
    | "SHORT_STORY"
    | "CHILDRENS"
    | "AUTOBIOGRAPHY"
    | "FOOD_DRINK"
    | "ART"
    | "SELF_HELP"
    | "HISTORY"
    | "TRAVEL"
    | "CRIME";

export type CreateBookRequest = {
    title: string;
    genre: BookGenre;
    publishDate: string;
    isbn: string;
    stock: number;
    authorIds: UUID[];
};

export type UpdateBookRequest = Partial<CreateBookRequest>;

export type BookResponse = {
    publicId: UUID;
    title: string;
    genre: BookGenre;
    publishDate: string;
    isbn: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
};

export type BookAuthorSummary = {
    publicId: UUID;
    name: string;
};

export type BookDetailResponse = BookResponse & {
    authors: BookAuthorSummary[];
};

export type BooksResponse = PaginatedResponse<BookResponse>;