import {AuthorApi} from "@/src/(modules)/authors/api/author.api.ts";
import type {
    AuthorResponse,
    AuthorsResponse,
    CreateAuthorRequest,
    UpdateAuthorRequest,
} from "@/src/(modules)/authors/types/author.types.ts";
import type {PaginationQuery} from "@/src/lib/types/api.types.ts";
import type {UUID} from "@/src/lib/types/uuid.types.ts";

export const AuthorService = {
    create: async (data: CreateAuthorRequest): Promise<AuthorResponse> => {
        return AuthorApi.create(data);
    },

    update: async (publicId: UUID, data: UpdateAuthorRequest): Promise<AuthorResponse> => {
        return AuthorApi.update(publicId, data);
    },

    delete: async (publicId: UUID): Promise<AuthorResponse> => {
        return AuthorApi.delete(publicId);
    },

    getAuthors: async (params?: PaginationQuery): Promise<AuthorsResponse> => {
        return AuthorApi.getAuthors(params);
    },

    getAuthorByPublicId: async (publicId: UUID): Promise<AuthorResponse> => {
        return AuthorApi.getAuthorByPublicId(publicId);
    },
};