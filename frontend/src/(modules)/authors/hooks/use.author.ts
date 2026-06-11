import { useCallback, useState } from "react";
import { AuthorService } from "@/src/(modules)/authors/service/author.service.ts";
import type {
    AuthorResponse,
    AuthorsResponse,
} from "@/src/(modules)/authors/types/author.types.ts";
import type { PaginationQuery } from "@/src/lib/types/api.types.ts";
import type { UUID } from "@/src/lib/types/uuid.types.ts";

export function useAuthor() {
    const [authors, setAuthors] = useState<AuthorsResponse | null>(null);
    const [author, setAuthor] = useState<AuthorResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const refreshAuthors = useCallback(async (params?: PaginationQuery) => {
        setLoading(true);
        setError(null);

        try {
            const data = await AuthorService.getAuthors(params);
            setAuthors(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error
                    : new Error("Error getting data from Author API"),
            );
        } finally {
            setLoading(false);
        }
    }, []);

    const refreshAuthorByPublicId = useCallback(async (publicId: UUID) => {
        setLoading(true);
        setError(null);

        try {
            const data = await AuthorService.getAuthorByPublicId(publicId);
            setAuthor(data);
        } catch (error) {
            setError(
                error instanceof Error
                    ? error
                    : new Error("Error getting data from Author API"),
            );
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        authors,
        author,
        loading,
        error,
        refreshAuthors,
        refreshAuthorByPublicId,
    };
}