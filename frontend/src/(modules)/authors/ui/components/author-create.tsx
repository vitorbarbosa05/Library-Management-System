import ModuleWrapper from "@/src/components/shared/module-wrapper.tsx";
import ModuleTitle from "@/src/components/shared/module-title.tsx";
import FormCreateAuthor from "@/src/(modules)/authors/ui/components/forms/form-create-author.tsx";

const AuthorCreatePage = () => {
    return (
        <ModuleWrapper>
            <ModuleTitle title="Create new Author" description=""/>
            <FormCreateAuthor/>
        </ModuleWrapper>
    )
}
export default AuthorCreatePage
