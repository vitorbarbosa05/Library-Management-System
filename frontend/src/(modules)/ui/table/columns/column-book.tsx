import {useMemo} from "react";
import type {ColumnDef} from "@tanstack/react-table";

import {DataTableColumnHeader} from "@/src/(modules)/ui/table/layout/table-header";
import DataTableColumnRow from "@/src/(modules)/ui/table/layout/table-row";

import type {BookResponse} from "@/src/(modules)/books/types/book.types";

function formatDate(iso: string): string {
    return iso.slice(0, 10);
}

export function useColumnsBooks() {
    return useMemo<ColumnDef<BookResponse>[]>(
        () => [
            {
                accessorKey: "title",
                id: "title",
                header: ({column}) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Title"
                        tooltip="Title and ISBN of the book"
                    />
                ),
                cell: ({row}) => {
                    const book = row.original;
                    return (
                        <div className="flex flex-col space-y-1 text-pretty">
                            <p>{book.title}</p>
                            <span className="text-sm text-muted-foreground">
                                {book.isbn ?? "No ISBN available"}
                            </span>
                        </div>
                    );
                },
                enableSorting: true,
            },
            {
                accessorKey: "genre",
                id: "genre",
                header: ({column}) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Genre"
                        tooltip="Genre of the book"
                    />
                ),
                cell: ({row}) => (
                    <DataTableColumnRow
                        getValue={row.original.genre}
                        className="font-medium"
                    />
                ),
                enableSorting: true,
            },
            {
                accessorKey: "publishDate",
                id: "publishDate",
                header: ({column}) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Publish Date"
                        tooltip="Publication date of the book"
                    />
                ),
                cell: ({row}) => (
                    <DataTableColumnRow
                        getValue={formatDate(row.original.publishDate)}
                        className="font-medium"
                    />
                ),
                enableSorting: true,
            },
            {
                accessorKey: "stock",
                id: "stock",
                header: ({column}) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Stock"
                        tooltip="Stock number of the book"
                    />
                ),
                cell: ({row}) => (
                    <DataTableColumnRow
                        getValue={row.original.stock}
                        className="font-medium"
                    />
                ),
                enableSorting: true,
            },
        ],
        [],
    );
}