import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    type OnChangeFn,
    type SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {ChevronLeft, ChevronRight, SearchIcon} from "lucide-react";
import type React from "react";

import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger,} from "@/src/components/ui/context-menu";
import {Input} from "@/src/components/ui/input";
import {Pagination, PaginationContent, PaginationEllipsis, PaginationItem,} from "@/src/components/ui/pagination";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/src/components/ui/table";
import {Button} from "@/src/components/ui/button";
import {Spinner} from "@/src/components/ui/spinner";

import type {UUID} from "@/src/lib/types/uuid.types";
import {getPaginationItems} from "./pagination-utils";
import {NavLink} from "react-router";

export interface RowActionsProps<TData> {
    id: UUID;
    row: TData;
    MenuItem: React.ElementType;
    onDeleted?: (id: UUID) => void;
    onUpdated?: (id: UUID) => void;
}

export interface DataTableProps<TData> {
    // Data
    columns: ColumnDef<TData>[];
    data: TData[] | undefined;
    idSelector: (row: TData) => UUID;

    // Server-side controlled state
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalCount: number;
    sorting: SortingState;
    search: string;

    // Setters
    setPageIndex: (index: number) => void;
    setSorting: OnChangeFn<SortingState>;
    setSearch: (value: string) => void;

    // Status
    isLoading?: boolean;
    isFetching?: boolean;
    errorMessage?: string;

    searchPlaceholder?: string;
    emptyMessage?: string;
    buttonPath?: string;
    buttonText?: string;
    filtersContent?: React.ReactNode;
    RowActionsComponent?: React.ComponentType<RowActionsProps<TData>>;
    onRowDeleted?: (id: UUID) => void;
    onRowUpdated?: (id: UUID) => void;
}

export function ModuleDataTable<TData>({
                                           columns,
                                           data,
                                           idSelector,
                                           pageIndex,
                                           pageSize,
                                           pageCount,
                                           totalCount,
                                           sorting,
                                           search,
                                           setPageIndex,
                                           setSorting,
                                           setSearch,
                                           isLoading = false,
                                           isFetching = false,
                                           errorMessage,
                                           searchPlaceholder = "Search...",
                                           emptyMessage = "No results found.",
                                           buttonPath,
                                           buttonText = "Add new ...",
                                           filtersContent,
                                           RowActionsComponent,
                                           onRowDeleted,
                                           onRowUpdated,
                                       }: DataTableProps<TData>) {
    const rows = data ?? [];

    const table = useReactTable({
        data: rows,
        columns,
        pageCount,
        state: {
            sorting,
            pagination: {pageIndex, pageSize},
        },
        manualPagination: true,
        manualSorting: true,
        manualFiltering: true,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getRowId: (row) => idSelector(row),
        meta: {onRowDeleted, onRowUpdated},
    });

    const safePageCount = Math.max(pageCount, 1);
    const paginationItems = getPaginationItems(pageIndex, safePageCount);
    const showInitialLoading = isLoading && !data;
    const isDimmed = isFetching && !!data;

    return (
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-hidden">
            <div className="flex shrink-0 flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center">
                    <div className="relative w-full lg:w-[350px]">
                        <div
                            className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground">
                            <SearchIcon className="size-4"/>
                            <span className="sr-only">Search</span>
                        </div>
                        <Input
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            className="w-full ps-9"
                        />
                    </div>
                    {filtersContent}
                </div>

                {buttonPath ? (
                    <Button asChild>
                        <NavLink to={buttonPath}>{buttonText}</NavLink>
                    </Button>
                ) : null}
            </div>

            {errorMessage ? (
                <div
                    role="alert"
                    className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm text-destructive"
                >
                    {errorMessage}
                </div>
            ) : null}

            <div className="relative min-h-0 w-full flex-1 overflow-y-auto">
                {isDimmed ? (
                    <div
                        className="pointer-events-none absolute right-3 top-3 z-30 rounded-full bg-background/90 p-1.5 shadow">
                        <Spinner className="size-4"/>
                    </div>
                ) : null}

                <div
                    className={
                        isDimmed
                            ? "opacity-60 transition-opacity"
                            : "transition-opacity"
                    }
                >
                    <Table>
                        <TableHeader className="sticky top-0 z-20 bg-background">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    className="h-12 border-b"
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>

                        <TableBody>
                            {showInitialLoading ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-40"
                                    >
                                        <div
                                            className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                            <Spinner/>
                                            Loading...
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <ContextMenu key={row.id}>
                                        <ContextMenuTrigger asChild>
                                            <TableRow
                                                data-state={
                                                    row.getIsSelected() &&
                                                    "selected"
                                                }
                                                className="h-20"
                                            >
                                                {row
                                                    .getVisibleCells()
                                                    .map((cell) => (
                                                        <TableCell key={cell.id}>
                                                            {flexRender(
                                                                cell.column
                                                                    .columnDef
                                                                    .cell,
                                                                cell.getContext(),
                                                            )}
                                                        </TableCell>
                                                    ))}
                                            </TableRow>
                                        </ContextMenuTrigger>

                                        {RowActionsComponent ? (
                                            <ContextMenuContent>
                                                <RowActionsComponent
                                                    id={row.id as UUID}
                                                    row={row.original}
                                                    MenuItem={ContextMenuItem}
                                                    onDeleted={onRowDeleted}
                                                    onUpdated={onRowUpdated}
                                                />
                                            </ContextMenuContent>
                                        ) : null}
                                    </ContextMenu>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        {emptyMessage}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-between gap-5 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    <p className="text-foreground">
                        Page {pageIndex + 1}{" "}
                        <span className="text-muted-foreground">
                            of {safePageCount} ({totalCount} total)
                        </span>
                    </p>
                </div>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPageIndex(pageIndex - 1)}
                                disabled={pageIndex === 0}
                                aria-label="Previous page"
                            >
                                <ChevronLeft className="size-4"/>
                                <span className="hidden sm:inline">Previous</span>
                            </Button>
                        </PaginationItem>

                        {paginationItems.map((item, index) => {
                            if (item === "ellipsis") {
                                return (
                                    <PaginationItem key={`ellipsis-${index}`}>
                                        <PaginationEllipsis/>
                                    </PaginationItem>
                                );
                            }

                            const isActive = item === pageIndex;

                            return (
                                <PaginationItem key={item}>
                                    <Button
                                        variant={isActive ? "outline" : "ghost"}
                                        size="sm"
                                        onClick={() => setPageIndex(item)}
                                        aria-current={
                                            isActive ? "page" : undefined
                                        }
                                        aria-label={`Go to page ${item + 1}`}
                                    >
                                        {item + 1}
                                    </Button>
                                </PaginationItem>
                            );
                        })}

                        <PaginationItem>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setPageIndex(pageIndex + 1)}
                                disabled={pageIndex >= safePageCount - 1}
                                aria-label="Next page"
                            >
                                <span className="hidden sm:inline">Next</span>
                                <ChevronRight className="size-4"/>
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}