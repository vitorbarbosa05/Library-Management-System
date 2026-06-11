import ModuleWrapper from "@/src/components/shared/module-wrapper.tsx";
import ModuleTitle from "@/src/components/shared/module-title.tsx";
import AuthorsContent from "@/src/(modules)/authors/ui/components/authors-content.tsx";

const AuthorsPage = () => {
    return (
        <ModuleWrapper>
            <ModuleTitle title="Authors"
                         description="Manage writer profiles, their bibliography within the collection, and associated metadata"/>
            <AuthorsContent/>
        </ModuleWrapper>
    )
}
export default AuthorsPage
