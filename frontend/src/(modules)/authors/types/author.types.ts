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
};

export type AuthorsResponse = PaginatedResponse<AuthorResponse>;