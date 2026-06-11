import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    authorFormSchema,
    type AuthorFormValues,
    MAX_BIO_LENGTH,
} from "@/src/(modules)/authors/ui/components/forms/author-schema.ts";
import {EditIcon, SignatureIcon} from "lucide-react";
import {toast} from "sonner";
import axios from "axios";

import type {EditFormProps} from "@/src/(modules)/ui/table/row/row-action";
import type {AuthorResponse} from "@/src/(modules)/authors/types/author.types";
import {AuthorService} from "@/src/(modules)/authors/service/author.service";
import {extractErrorMessage} from "@/src/lib/extract-error-message";

import {
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/src/components/ui/dialog";
import {Separator} from "@/src/components/ui/separator";
import {Field, FieldError, FieldGroup, FieldLabel,} from "@/src/components/ui/field";
import {InputGroup, InputGroupAddon, InputGroupInput,} from "@/src/components/ui/input-group";
import {Textarea} from "@/src/components/ui/textarea";
import {Button} from "@/src/components/ui/button";
import {Spinner} from "@/src/components/ui/spinner";

const FORM_ID = "update-author-form";

export function FormUpdateAuthor({
                                     id,
                                     initialValues,
                                     onUpdated,
                                     onClose,
                                 }: EditFormProps<AuthorResponse>) {
    const [loading, setLoading] = useState(false);

    const form = useForm<AuthorFormValues>({
        resolver: zodResolver(authorFormSchema),
        defaultValues: {
            name: initialValues?.name ?? "",
            bio: initialValues?.bio ?? "",
        },
    });

    useEffect(() => {
        form.reset({
            name: initialValues?.name ?? "",
            bio: initialValues?.bio ?? "",
        });
    }, [initialValues, form]);

    const bioValue = form.watch("bio") ?? "";
    const remainingChars = Math.max(0, MAX_BIO_LENGTH - bioValue.length);

    async function handleAuthorUpdate(data: AuthorFormValues) {
        setLoading(true);
        try {
            await AuthorService.update(id, {name: data.name, bio: data.bio});
            toast.success("Author successfully updated");
            onUpdated();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                form.setError("name", {
                    message: "An author with this name already exists",
                });
                return;
            }
            toast.error("Error updating author", {
                description: extractErrorMessage(error),
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>
                    Edit {initialValues?.name ?? "author"}
                </DialogTitle>
                <DialogDescription>
                    Make the desired changes below and save to update the author.
                </DialogDescription>
            </DialogHeader>

            <Separator/>

            <form
                id={FORM_ID}
                onSubmit={form.handleSubmit(handleAuthorUpdate)}
                noValidate
            >
                <FieldGroup>
                    <Controller
                        name="name"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel
                                    htmlFor="form-update-author-name"
                                    className="gap-1"
                                >
                                    Name
                                    <span className="text-destructive">*</span>
                                </FieldLabel>
                                <InputGroup>
                                    <InputGroupInput
                                        {...field}
                                        id="form-update-author-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="e.g., Haruki Murakami"
                                        autoComplete="off"
                                        type="text"
                                        disabled={loading}
                                    />
                                    <InputGroupAddon align="inline-end">
                                        <SignatureIcon/>
                                    </InputGroupAddon>
                                </InputGroup>
                                {fieldState.invalid && fieldState.error ? (
                                    <FieldError errors={[fieldState.error]}/>
                                ) : null}
                            </Field>
                        )}
                    />

                    <Controller
                        name="bio"
                        control={form.control}
                        render={({field, fieldState}) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="form-update-author-bio">
                                    Bio
                                </FieldLabel>
                                <Textarea
                                    {...field}
                                    id="form-update-author-bio"
                                    maxLength={MAX_BIO_LENGTH}
                                    placeholder="e.g., Japanese writer known for surrealist novels."
                                    className="max-h-20 min-h-10 resize-none text-sm"
                                    disabled={loading}
                                />
                                <div className="inline-flex gap-1 text-xs text-muted-foreground">
                                    <p className="tabular-nums">{remainingChars}</p>
                                    characters remaining
                                </div>
                                {fieldState.invalid && fieldState.error ? (
                                    <FieldError errors={[fieldState.error]}/>
                                ) : null}
                            </Field>
                        )}
                    />
                </FieldGroup>
            </form>

            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
                </DialogClose>
                <Button
                    type="submit"
                    form={FORM_ID}
                    disabled={loading}
                    className="min-w-[140px]"
                >
                    {loading ? (
                        <Spinner/>
                    ) : (
                        <>
                            <EditIcon className="mr-2 h-4 w-4"/>
                            Save changes
                        </>
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}