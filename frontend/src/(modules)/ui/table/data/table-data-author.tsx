"use client";

import {
    type ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {SearchIcon} from "lucide-react";
import type React from "react";
import {useDeferredValue, useState} from "react";

import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger,} from "@/src/components/ui/context-menu";
import {Input} from "@/src/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/src/components/ui/pagination";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/src/components/ui/table";

import type {AuthorResponse} from "@/src/(modules)/authors/types/author.types";
import type {UUID} from "@/src/lib/types/uuid.types";
import {Spinner} from "@/src/components/ui/spinner.tsx";

interface Props {
    columns: ColumnDef<AuthorResponse>[];
    data: AuthorResponse[] | undefined;
    idSelector: (row: AuthorResponse) => UUID;
    filtersContent?: React.ReactNode;
    RowActionsComponent?: React.ComponentType<{
        id: UUID;
        row?: AuthorResponse;
        MenuItem: React.ElementType;
        onDeleted?: (id: UUID) => void;
        onUpdated?: (id: UUID) => void;
    }>;
    onRowDeleted?: (id: UUID) => void;
    onRowUpdated?: (id: UUID) => void;
    isLoading?: boolean;
    errorMessage?: string;
}

function getPaginationItems(currentPageIndex: number, totalPages: number) {
    const items: Array<number | "ellipsis"> = [];

    if (totalPages <= 5) {
        return Array.from({length: totalPages}, (_, index) => index);
    }

    items.push(0);

    if (currentPageIndex > 2) {
        items.push("ellipsis");
    }

    const start = Math.max(1, currentPageIndex - 1);
    const end = Math.min(totalPages - 2, currentPageIndex + 1);

    for (let index = start; index <= end; index += 1) {
        items.push(index);
    }

    if (currentPageIndex < totalPages - 3) {
        items.push("ellipsis");
    }

    items.push(totalPages - 1);

    return items;
}

const TableAuthor = ({
                         data,
                         columns,
                         idSelector,
                         filtersContent,
                         RowActionsComponent,
                         onRowDeleted,
                         onRowUpdated,
                         isLoading = false,
                         errorMessage,
                     }: Props) => {
    const rows = data ?? [];

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [sorting, setSorting] = useState<SortingState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const deferredGlobalFilter = useDeferredValue(globalFilter);

    const table = useReactTable({
        data: rows,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: (row, _columnId, filterValue) => {
            const search = String(filterValue).toLowerCase();
            const author = row.original;

            return (
                author.name.toLowerCase().includes(search) ||
                (author.bio?.toLowerCase().includes(search) ?? false)
            );
        },
        meta: {
            onRowDeleted,
            onRowUpdated,
        },
        state: {
            sorting,
            columnFilters,
            rowSelection,
            globalFilter: deferredGlobalFilter,
        },
        initialState: {
            pagination: {
                pageIndex: 0,
                pageSize: 10,
            },
        },
    });

    const totalPages = Math.max(table.getPageCount(), 1);
    const currentPageIndex = table.getState().pagination.pageIndex;
    const paginationItems = getPaginationItems(currentPageIndex, totalPages);

    const visibleCount = table.getRowModel().rows.length;
    const totalCount = table.getFilteredRowModel().rows.length;

    if (isLoading) {
        return (
            <div className="flex flex-row gap-1 h-40 items-center justify-center text-sm text-muted-foreground">
                <Spinner />
                Loading authors...
            </div>
        );
    }

    if (errorMessage) {
        return (
            <div className="flex h-40 items-center justify-center text-sm text-destructive">
                {errorMessage}
            </div>
        );
    }

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-hidden">
            <div className="flex shrink-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center">
                    <div className="relative w-full lg:w-[350px]">
                        <div
                            className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground">
                            <SearchIcon className="size-4"/>
                            <span className="sr-only">Search authors</span>
                        </div>

                        <Input
                            placeholder="Search by author name or bio..."
                            value={globalFilter}
                            onChange={(event) => setGlobalFilter(event.target.value)}
                            className="w-full ps-9"
                        />
                    </div>

                    {filtersContent}
                </div>
            </div>

            <div className="min-h-0 w-full flex-1 overflow-y-auto">
                <Table>
                    <TableHeader className="sticky top-0 z-20 bg-background">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="h-12 border-b bg-muted/30 transition-colors"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="sticky top-0 z-20 bg-background"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => {
                                const rowId = idSelector(row.original);

                                return (
                                    <ContextMenu key={row.id}>
                                        <ContextMenuTrigger asChild>
                                            <TableRow
                                                data-state={row.getIsSelected() && "selected"}
                                                className="h-20"
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </ContextMenuTrigger>

                                        {RowActionsComponent ? (
                                            <ContextMenuContent>
                                                <RowActionsComponent
                                                    id={rowId}
                                                    row={row.original}
                                                    MenuItem={ContextMenuItem}
                                                    onDeleted={onRowDeleted}
                                                    onUpdated={onRowUpdated}
                                                />
                                            </ContextMenuContent>
                                        ) : null}
                                    </ContextMenu>
                                );
                            })
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No authors found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-between gap-5 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    <p className="text-foreground">
                        Viewing {visibleCount}{" "}
                        <span className="text-muted-foreground">
                            of {totalCount} author(s)
                        </span>
                    </p>
                </div>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    if (!table.getCanPreviousPage()) return;
                                    table.previousPage();
                                }}
                                aria-disabled={!table.getCanPreviousPage()}
                                className={
                                    !table.getCanPreviousPage()
                                        ? "pointer-events-none opacity-50"
                                        : undefined
                                }
                            />
                        </PaginationItem>

                        {paginationItems.map((item, index) => {
                            if (item === "ellipsis") {
                                return (
                                    <PaginationItem key={`ellipsis-${index}`}>
                                        <PaginationEllipsis/>
                                    </PaginationItem>
                                );
                            }

                            const page = item + 1;
                            const isActive = item === currentPageIndex;

                            return (
                                <PaginationItem key={item}>
                                    <PaginationLink
                                        href="#"
                                        isActive={isActive}
                                        onClick={(event) => {
                                            event.preventDefault();
                                            table.setPageIndex(item);
                                        }}
                                    >
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    if (!table.getCanNextPage()) return;
                                    table.nextPage();
                                }}
                                aria-disabled={!table.getCanNextPage()}
                                className={
                                    !table.getCanNextPage()
                                        ? "pointer-events-none opacity-50"
                                        : undefined
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default TableAuthor;