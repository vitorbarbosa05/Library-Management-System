// src/(modules)/authors/components/form-create-author.tsx
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { NavLink, useNavigate } from "react-router";
import { PlusIcon, SignatureIcon } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { Path } from "@/src/router/paths";
import GoBack from "@/src/components/shared/go-back";
import { Card, CardContent } from "@/src/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/src/components/ui/field";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/src/components/ui/input-group";
import { Textarea } from "@/src/components/ui/textarea";
import { Separator } from "@/src/components/ui/separator";
import { Button } from "@/src/components/ui/button";
import { Spinner } from "@/src/components/ui/spinner";
import { AuthorService } from "@/src/(modules)/authors/service/author.service";
import { extractErrorMessage } from "@/src/lib/extract-error-message";

const MAX_BIO_LENGTH = 200;

const formSchema = z.object({
    name: z.string().trim().min(1, "Author name is required"),
    bio: z
        .string()
        .trim()
        .max(MAX_BIO_LENGTH, `Bio max ${MAX_BIO_LENGTH} characters`)
        .optional()
        .or(z.literal("").transform(() => undefined)),
});

type FormValues = z.infer<typeof formSchema>;

const FormCreateAuthor = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { name: "", bio: "" },
    });

    const bioValue = form.watch("bio") ?? "";
    const remainingChars = Math.max(0, MAX_BIO_LENGTH - bioValue.length);

    async function handleCreateAuthor(data: FormValues) {
        setLoading(true);
        try {
            await AuthorService.create({ name: data.name, bio: data.bio });
            toast.success("Author successfully created");
            navigate(Path.authors);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 409) {
                form.setError("name", {
                    message: "An author with this name already exists",
                });
                return;
            }
            toast.error("Error creating author", {
                description: extractErrorMessage(error),
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="space-y-6">
            <header className="flex flex-col items-start gap-4">
                <GoBack path={Path.authors} module="authors" />
            </header>

            <Card>
                <CardContent>
                    <form
                        onSubmit={form.handleSubmit(handleCreateAuthor)}
                        className="space-y-12"
                        noValidate
                    >
                        <FieldGroup>
                            {/* NAME & BIO */}
                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                                <div className="lg:col-span-1">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        Basic information
                                    </h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        Enter the name and bio to create an author.
                                    </p>
                                </div>

                                <div className="space-y-6 lg:col-span-3">
                                    <Controller
                                        name="name"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel
                                                    htmlFor="form-create-author-name"
                                                    className="gap-1"
                                                >
                                                    Name
                                                    <span className="text-destructive">*</span>
                                                </FieldLabel>
                                                <InputGroup>
                                                    <InputGroupInput
                                                        {...field}
                                                        id="form-create-author-name"
                                                        aria-invalid={fieldState.invalid}
                                                        placeholder="e.g., Haruki Murakami"
                                                        autoComplete="off"
                                                        type="text"
                                                        disabled={loading}
                                                    />
                                                    <InputGroupAddon align="inline-end">
                                                        <SignatureIcon />
                                                    </InputGroupAddon>
                                                </InputGroup>
                                                {fieldState.invalid && fieldState.error ? (
                                                    <FieldError errors={[fieldState.error]} />
                                                ) : null}
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="bio"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="form-create-author-bio">
                                                    Bio
                                                </FieldLabel>
                                                <Textarea
                                                    {...field}
                                                    id="form-create-author-bio"
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
                                                    <FieldError errors={[fieldState.error]} />
                                                ) : null}
                                            </Field>
                                        )}
                                    />
                                </div>
                            </div>

                            <Separator />

                            {/* ACTIONS */}
                            <div className="flex flex-wrap items-center justify-between gap-5">
                                <div className="flex gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={loading}
                                        onClick={() => form.reset()}
                                    >
                                        Reset form
                                    </Button>
                                    <Button asChild variant="outline" disabled={loading}>
                                        <NavLink to={Path.authors}>Cancel</NavLink>
                                    </Button>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="min-w-[140px]"
                                >
                                    {loading ? (
                                        <Spinner />
                                    ) : (
                                        <>
                                            <PlusIcon className="mr-2 h-4 w-4" />
                                            Create author
                                        </>
                                    )}
                                </Button>
                            </div>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
};

export default FormCreateAuthor;