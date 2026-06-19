import {useCallback, useEffect, useState} from "react";
import {AuthorService} from "@/src/(modules)/authors/service/author.service.ts";
import type {AuthorDetailResponse, AuthorsResponse} from "@/src/(modules)/authors/types/author.types.ts";
import type {PaginationQuery} from "@/src/lib/types/api.types.ts";
import type {UUID} from "@/src/lib/types/uuid.types.ts";

export function useAuthors(initialParams?: PaginationQuery) {
    const [authors, setAuthors] = useState<AuthorsResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchAuthors = useCallback(async (params?: PaginationQuery): Promise<void> => {
        setLoading(true);
        setError(null);
        try {
            const data = await AuthorService.getAuthors(params);
            setAuthors(data);
        } catch (e) {
            setError(e instanceof Error ? e : new Error("Failed to fetch authors"));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await AuthorService.getAuthors(initialParams);
                if (!cancelled) setAuthors(data);
            } catch (e) {
                if (!cancelled) {
                    setError(e instanceof Error ? e : new Error("Failed to fetch authors"));
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [initialParams]);

    return {authors, loading, error, fetchAuthors};
}

export function useAuthor(publicId: UUID | null) {
    const [author, setAuthor] = useState<AuthorDetailResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!publicId) return;
        let cancelled = false;

        (async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await AuthorService.getAuthorByPublicId(publicId);
                if (!cancelled) setAuthor(data);
            } catch (e) {
                if (!cancelled) {
                    setError(e instanceof Error ? e : new Error("Failed to fetch author"));
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [publicId]);

    return {author, loading, error};
}