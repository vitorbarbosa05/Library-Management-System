import {useCallback, useEffect, useState} from "react";

import type {PaginationQuery} from "@/src/lib/types/api.types";
import type {BookDetailResponse, BooksResponse} from "@/src/(modules)/books/types/book.types";
import {BookService} from "@/src/(modules)/books/service/book.service";
import type {UUID} from "@/src/lib/types/uuid.types.ts";

export function useBooks(initialParams?: PaginationQuery) {
    const [books, setBooks] = useState<BooksResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchBooks = useCallback(
        async (params?: PaginationQuery): Promise<void> => {
            setLoading(true);
            setError(null);
            try {
                const data = await BookService.getBooks(params);
                setBooks(data);
            } catch (e) {
                setError(
                    e instanceof Error
                        ? e
                        : new Error("Failed to fetch books"),
                );
            } finally {
                setLoading(false);
            }
        },
        [],
    );

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await BookService.getBooks(initialParams);
                if (!cancelled) setBooks(data);
            } catch (e) {
                if (!cancelled) {
                    setError(
                        e instanceof Error
                            ? e
                            : new Error("Failed to fetch books"),
                    );
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [initialParams]);

    return {books, loading, error, fetchBooks};
}

export function useBook(publicId: UUID | null) {
    const [book, setBook] = useState<BookDetailResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!publicId) return;
        let cancelled = false;

        (async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await BookService.getBookByPublicId(publicId);
                if (!cancelled) setBook(data);
            } catch (error) {
                if (!cancelled) {
                    setError(error instanceof Error ? error : new Error("Failed to fetch book"));
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [publicId]);

    return {book, loading, error};
}