import ModuleWrapper from "@/src/components/shared/module-wrapper.tsx";
import ModuleTitle from "@/src/components/shared/module-title.tsx";
import FormCreateBook from "@/src/(modules)/books/ui/components/forms/form-create-book.tsx";

const BookCreatePage = () => {
    return (
        <ModuleWrapper>
            <ModuleTitle title="Create new Book" description=""/>
            <FormCreateBook/>
        </ModuleWrapper>
    )
}
export default BookCreatePage
