import http from "@/src/lib/api-client";
import type {UUID} from "@/src/lib/types/uuid.types.ts";
import type {PaginationQuery} from "@/src/lib/types/api.types.ts";
import type {
    AuthorResponse,
    AuthorsResponse,
    CreateAuthorRequest,
    UpdateAuthorRequest,
} from "@/src/(modules)/authors/types/author.types.ts";

export const AuthorApi = {
    create: async (payload: CreateAuthorRequest): Promise<AuthorResponse> => {
        const {data} = await http.post<AuthorResponse>("/authors", payload);
        return data;
    },

    update: async (publicId: UUID, payload: UpdateAuthorRequest): Promise<AuthorResponse> => {
        const {data} = await http.patch<AuthorResponse>(`/authors/${publicId}`, payload);
        return data;
    },

    delete: async (publicId: UUID): Promise<AuthorResponse> => {
        const {data} = await http.delete<AuthorResponse>(`/authors/${publicId}`);
        return data;
    },

    getAuthors: async (params?: PaginationQuery): Promise<AuthorsResponse> => {
        const {data} = await http.get<AuthorsResponse>("/authors", {params,});
        return data;
    },

    getAuthorByPublicId: async (publicId: UUID): Promise<AuthorResponse> => {
        const {data} = await http.get<AuthorResponse>(`/authors/${publicId}`);
        return data;
    },
};