import {ModuleDataTable} from "@/src/(modules)/ui/table/data/module-data-table";
import type {BookResponse} from "@/src/(modules)/books/types/book.types";
import {useServerDataTable} from "@/src/(modules)/ui/table/data/use-server-data-table";
import {useColumnsBooks} from "@/src/(modules)/ui/table/columns/column-book";
import {useBooks} from "@/src/(modules)/books/hooks/use.book";

const BooksContent = () => {
    const tableState = useServerDataTable({initialPageSize: 10});
    const columnBook = useColumnsBooks();
    const {books, loading, error, fetchBooks} = useBooks(tableState.query);

    return (
        <div className="flex flex-1 flex-col">
            <ModuleDataTable<BookResponse>
                columns={columnBook}
                data={books?.data}
                idSelector={(b) => b.publicId}
                pageCount={books?.meta.totalPages ?? 0}
                totalCount={books?.meta.total ?? 0}
                isLoading={loading && !books}
                isFetching={loading}
                errorMessage={error?.message}
                searchPlaceholder="Search by book title or ISBN..."
                emptyMessage="No books found."
                // buttonPath={Path.newBook}
                buttonText="Create new Book"
                onRowDeleted={() => fetchBooks(tableState.query)}
                onRowUpdated={() => fetchBooks(tableState.query)}
                pageIndex={tableState.pageIndex}
                pageSize={tableState.pageSize}
                sorting={tableState.sorting}
                search={tableState.search}
                setPageIndex={tableState.setPageIndex}
                setSorting={tableState.setSorting}
                setSearch={tableState.setSearch}
            />
        </div>
    );
};

export default BooksContent;