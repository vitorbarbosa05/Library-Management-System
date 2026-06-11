import {ModuleRowAction} from "@/src/(modules)/ui/table/row/row-action.tsx";
import type {RowActionsProps} from "@/src/(modules)/ui/table/data/module-data-table";
import type {AuthorResponse} from "@/src/(modules)/authors/types/author.types";

import {FormUpdateAuthor} from "@/src/(modules)/authors/ui/components/forms/form-update-author.tsx";
import {FormDeleteAuthor} from "@/src/(modules)/authors/ui/components/forms/form-delete-author.tsx";

import {Path} from "@/src/router/paths";

export function AuthorRowActions(props: RowActionsProps<AuthorResponse>) {
    return (
        <ModuleRowAction<AuthorResponse>
            {...props}
            entityLabel="author"
            viewPath={Path.authors}
            EditForm={FormUpdateAuthor}
            DeleteForm={FormDeleteAuthor}
        />
    );
}