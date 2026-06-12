import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";

import { DataTableColumnHeader } from "@/src/(modules)/ui/table/layout/table-header";
import { DataTableColumnHeaderNoSort } from "@/src/(modules)/ui/table/layout/table-header-no-sort";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";

import type { AuthorResponse } from "@/src/(modules)/authors/types/author.types";
import {AuthorRowActions} from "@/src/(modules)/ui/table/row/author-row-actions.tsx";

export function useColumnsAuthors() {
    return useMemo<ColumnDef<AuthorResponse>[]>(
        () => [
            {
                accessorKey: "name",
                id: "name",
                header: ({ column }) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Name"
                        tooltip="Name and bio of author"
                    />
                ),
                cell: ({ row }) => {
                    const author = row.original;
                    return (
                        <div className="flex flex-col space-y-1 text-pretty">
                            <p>{author.name}</p>
                            <span className="text-sm text-muted-foreground">
                                {author.bio ?? "No bio available"}
                            </span>
                        </div>
                    );
                },
                enableSorting: true,
            },

            // books column here...

            {
                id: "actions",
                header: ({ column }) => (
                    <DataTableColumnHeaderNoSort
                        column={column}
                        className="flex h-full w-full items-center justify-center"
                        title="Actions"
                        tooltip="Actions for author"
                    />
                ),
                cell: ({ row, table }) => {
                    const author = row.original;
                    const meta = table.options.meta;

                    return (
                        <div className="flex h-full w-full items-center justify-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 cursor-pointer"
                                        aria-label={`Actions for ${author.name}`}
                                    >
                                        <MoreHorizontalIcon className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <AuthorRowActions
                                        id={author.publicId}
                                        row={author}
                                        MenuItem={DropdownMenuItem}
                                        onDeleted={meta?.onRowDeleted}
                                        onUpdated={meta?.onRowUpdated}
                                    />
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    );
                },
                enableSorting: false,
                enableHiding: false,
            },
        ],
        [],
    );
}