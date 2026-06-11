import {useMemo} from "react";
import type {ColumnDef} from "@tanstack/react-table";

import {DataTableColumnHeader} from "@/src/(modules)/ui/table/layout/table-header.tsx";

import type {AuthorResponse} from "@/src/(modules)/authors/types/author.types.ts";

export function useColumnsAuthors() {

    return useMemo<ColumnDef<AuthorResponse>[]>(
        () => [
            {
                accessorKey: "name",
                id: "name",
                header: ({column}) => (
                    <DataTableColumnHeader
                        column={column}
                        title="Name"
                        tooltip="Name and bio of author"
                    />
                ),
                cell: (getValue) => {
                    const author = getValue.row.original;

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

            // books here...

            // actions here...
        ],
        [],
    );
}