import type {UUID} from "@/src/lib/types/uuid.types";
import type {PaginatedResponse} from "@/src/lib/types/api.types.ts";

export type CreateAuthorRequest = {
    name: string;
    bio?: string;
};
export type UpdateAuthorRequest = Partial<CreateAuthorRequest>;

export type AuthorResponse = {
    publicId: UUID;
    name: string;
    bio: string | null;
    createdAt: string;
    updatedAt: string;
};

export type AuthorBookSummary = {
    publicId: UUID;
    title: string;
};

export type AuthorDetailResponse = AuthorResponse & {
    books: AuthorBookSummary[];
};

export type AuthorsResponse = PaginatedResponse<AuthorResponse>;