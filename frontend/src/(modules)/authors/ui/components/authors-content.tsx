import {useColumnsAuthors} from "@/src/(modules)/ui/table/columns/column-author.tsx";
import {useAuthors} from "@/src/(modules)/authors/hooks/use.author.ts";
import {useServerDataTable} from "@/src/(modules)/ui/table/data/use-server-data-table.ts";
import {ModuleDataTable} from "@/src/(modules)/ui/table/data/module-data-table.tsx";
import type {AuthorResponse} from "@/src/(modules)/authors/types/author.types.ts";

const AuthorsContent = () => {
    const tableState = useServerDataTable({initialPageSize: 10});
    const columnAuthor = useColumnsAuthors();
    const {authors, loading, error} = useAuthors(tableState.query);

    console.log("Data:", authors);

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
                // RowActionsComponent={AuthorRowActions}
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
