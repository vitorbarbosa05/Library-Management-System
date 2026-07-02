import ModuleWrapper from "@/src/components/shared/module-wrapper.tsx";
import ModuleTitle from "@/src/components/shared/module-title.tsx";
import BooksContent from "@/src/(modules)/books/ui/components/books-content.tsx";

const BooksPage = () => {
    return (
        <ModuleWrapper>
            <ModuleTitle
                title="Books"
                description="Manage your collection, track availability and update metadata"
            />
            <BooksContent/>
        </ModuleWrapper>
    )
}
export default BooksPage
