import {useEffect, useMemo, useState} from "react";
import type {RowData, SortingState} from "@tanstack/react-table";
import {useDebounce} from "@/src/(modules)/ui/table/data/use-debounce.ts";
import type {PaginationQuery} from "@/src/lib/types/api.types.ts";
import type {UUID} from "@/src/lib/types/uuid.types.ts";

declare module "@tanstack/react-table" {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface TableMeta<TData extends RowData> {
        onRowDeleted?: (id: UUID) => void;
        onRowUpdated?: (id: UUID) => void;
    }
}

export interface ServerDataTableQuery {
    page: number;
    pageSize: number;
    search?: string;
    sortBy?: string;
    order?: "asc" | "desc";
}

export interface UseServerDataTableOptions {
    initialPageSize?: number;
    initialSorting?: SortingState;
    searchDebounceMs?: number;
}

export function useServerDataTable(options: UseServerDataTableOptions = {}) {
    const {
        initialPageSize = 10,
        initialSorting = [],
        searchDebounceMs = 300,
    } = options;

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [sorting, setSorting] = useState<SortingState>(initialSorting);
    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, searchDebounceMs);

    useEffect(() => {
        setPageIndex(0);
    }, [debouncedSearch, sorting, pageSize]);

    const query = useMemo<PaginationQuery>(
        () => ({
            page: pageIndex + 1,
            size: pageSize,
            search: debouncedSearch.trim() || undefined,
            sort: sorting[0]?.id,
            order: sorting[0]
                ? sorting[0].desc ? "desc" : "asc"
                : undefined,
        }),
        [pageIndex, pageSize, debouncedSearch, sorting],
    );

    return {
        pageIndex,
        pageSize,
        sorting,
        search,
        setPageIndex,
        setPageSize,
        setSorting,
        setSearch,
        query,
    };
}