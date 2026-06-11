import {useColumnsAuthors} from "@/src/(modules)/ui/table/columns/column-author.tsx";
import {useAuthor} from "@/src/(modules)/authors/hooks/use.author.ts";
import TableDataAuthor from "@/src/(modules)/ui/table/data/table-data-author.tsx";

const AuthorsContent = () => {

    const columnAuthor = useColumnsAuthors();

    const {authors, refreshAuthors, loading, error} = useAuthor();

    return (
        <div className="flex flex-1 flex-col">
            <TableDataAuthor
                data={authors?.data}
                columns={columnAuthor}
                idSelector={(row) => row.publicId}
                onRowDeleted={() => refreshAuthors()}
                onRowUpdated={() => refreshAuthors()}
                isLoading={loading}
                errorMessage={error?.message}
            />
        </div>
    )
}
export default AuthorsContent
