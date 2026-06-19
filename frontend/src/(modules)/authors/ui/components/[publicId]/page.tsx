import {useParams} from "react-router";

import type {UUID} from "@/src/lib/types/uuid.types";
import ModuleWrapper from "@/src/components/shared/module-wrapper";
import GoBack from "@/src/components/shared/go-back";
import ModuleTitle from "@/src/components/shared/module-title";
import {Spinner} from "@/src/components/ui/spinner";
import {useAuthor} from "@/src/(modules)/authors/hooks/use.author";
import {Path} from "@/src/router/paths";
import AuthorBook from "@/src/(modules)/authors/ui/components/[publicId]/author-book";

const AuthorPublicIdPage = () => {
    const {id} = useParams<{ id: string }>();
    const {author, loading, error} = useAuthor((id ?? null) as UUID | null);

    if (loading) {
        return (
            <ModuleWrapper>
                <GoBack path={Path.authors} module="authors"/>
                <div className="flex h-64 items-center justify-center gap-2">
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
                <div
                    role="alert"
                    className="rounded-md border border-destructive/50 bg-destructive/10 px-4 py-2 text-sm text-destructive"
                >
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
            <section className="space-y-6">
                <ModuleTitle
                    title={author.name}
                    description={author.bio ?? "No bio provided."}
                />

                <div className="space-y-3">
                    <h2 className="text-xl font-regular tracking-tighter">
                        Books ({author.books.length})
                    </h2>

                    {author.books.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                            This author has no books yet.
                        </p>
                    ) : (
                        <div className="flex flex-wrap items-stretch gap-3">
                            {author.books.map((book) => (
                                <AuthorBook
                                    key={book.publicId}
                                    title={book.title}
                                    isbn={book.isbn}
                                    publishDate={book.publishDate}
                                    genre={book.genre}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </ModuleWrapper>
    );
};

export default AuthorPublicIdPage;