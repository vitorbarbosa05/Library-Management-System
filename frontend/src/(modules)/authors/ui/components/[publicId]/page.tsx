import {useParams} from "react-router";
import type {UUID} from "@/src/lib/types/uuid.types";
import ModuleWrapper from "@/src/components/shared/module-wrapper.tsx";
import GoBack from "@/src/components/shared/go-back.tsx";
import ModuleTitle from "@/src/components/shared/module-title.tsx";
import {useAuthor} from "@/src/(modules)/authors/hooks/use.author.ts";
import {Path} from "@/src/router/paths.ts";
import {Spinner} from "@/src/components/ui/spinner.tsx";

const AuthorPublicIdPage = () => {
    const {id} = useParams<{ id: string }>();
    const {author, loading, error} = useAuthor((id ?? null) as UUID | null);

    if (loading) {
        return (
            <ModuleWrapper>
                <GoBack path={Path.authors} module="authors"/>
                <div className="mx-auto flex h-screen items-center justify-center gap-2">
                    <Spinner/>
                    <p>Loading...</p>
                </div>
            </ModuleWrapper>
        );
    }

    if (error) {
        return (
            <ModuleWrapper>
                <GoBack path={Path.authors} module="authors"/>
                <div role="alert"
                     className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm text-destructive">
                    {error.message}
                </div>
            </ModuleWrapper>
        );
    }

    if (!author) {
        return (
            <ModuleWrapper>
                <GoBack path={Path.authors} module="authors"/>
                <p className="text-muted-foreground">Author not found.</p>
            </ModuleWrapper>
        );
    }

    return (
        <ModuleWrapper>
            <GoBack path={Path.authors} module="authors"/>
            <section>
                <ModuleTitle
                    title={author.name ?? "No name provided."}
                    description={author.bio ?? "No bio provided."}
                />
            </section>
        </ModuleWrapper>
    );
};

export default AuthorPublicIdPage;