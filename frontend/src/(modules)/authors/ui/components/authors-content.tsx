import {useColumnsAuthors} from "@/src/(modules)/ui/table/columns/column-author.tsx";
import {useServerDataTable} from "@/src/(modules)/ui/table/data/use-server-data-table.ts";
import {ModuleDataTable} from "@/src/(modules)/ui/table/data/module-data-table.tsx";
import {AuthorRowActions} from "@/src/(modules)/ui/table/row/author-row-actions.tsx";

import {useAuthors} from "@/src/(modules)/authors/hooks/use.author.ts";
import type {AuthorResponse} from "@/src/(modules)/authors/types/author.types.ts";
import {Path} from "@/src/router/paths.ts";

const AuthorsContent = () => {
    const tableState = useServerDataTable({ initialPageSize: 10 });
    const columnAuthor = useColumnsAuthors();
    const { authors, loading, error, fetchAuthors } = useAuthors(tableState.query);

    return (
        <div className="flex flex-1 flex-col">
            <ModuleDataTable<AuthorResponse>
                columns={columnAuthor}
                data={authors?.data}
                idSelector={(a) => a.publicId}
                pageCount={authors?.meta.totalPages ?? 0}
                totalCount={authors?.meta.total ?? 0}
                isLoading={loading && !authors}
                isFetching={loading}
                errorMessage={error?.message}
                searchPlaceholder="Search by author name or bio..."
                emptyMessage="No authors found."
                buttonPath={Path.newAuthor}
                buttonText="Create new author"
                RowActionsComponent={AuthorRowActions}
                onRowDeleted={() => fetchAuthors(tableState.query)}
                onRowUpdated={() => fetchAuthors(tableState.query)}
                pageIndex={tableState.pageIndex}
                pageSize={tableState.pageSize}
                sorting={tableState.sorting}
                search={tableState.search}
                setPageIndex={tableState.setPageIndex}
                setSorting={tableState.setSorting}
                setSearch={tableState.setSearch}
            />
        </div>
    )
}
export default AuthorsContent
