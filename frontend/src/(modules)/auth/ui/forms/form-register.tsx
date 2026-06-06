import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import * as z from "zod";

import {Button} from "@/src/components/ui/button";
import {Card, CardContent} from "@/src/components/ui/card";
import {Field, FieldError, FieldGroup, FieldLabel,} from "@/src/components/ui/field";
import {Input} from "@/src/components/ui/input";
import {useState} from "react";
import {AuthApi} from "@/src/(modules)/auth/api/auth.api.ts";
import {toast} from "sonner";
import {Spinner} from "@/src/components/ui/spinner.tsx";


const formSchema = z.object({
    name: z
        .string().trim()
        .nonempty("Name is required")
        .min(2, "Name must be at least 2 characters.")
        .max(50, "Name must be at most 50 characters."),
    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters.")
})

const FormRegister = () => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        if (isLoading) return;
        setIsLoading(true);

        try {
            await AuthApi.register(data);

            toast.success("Register successful");

            setTimeout(() => {
                form.reset();
            }, 800);

        } catch (error) {
            const message = error instanceof Error ? error.message : "Error";
            toast.error("Error creating an account", {
                description: message,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <CardContent>
                <form id="form-register" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FieldGroup>
                        <Controller
                            name="name"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-register-name">
                                        Username
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-register-name"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Login button not working on mobile"
                                        autoComplete="off"
                                        type="text"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="email"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-register-email">
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-register-email"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="librarian@example.com"
                                        autoComplete="off"
                                        type="email"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-register-password">
                                        Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="form-register-password"
                                        aria-invalid={fieldState.invalid}
                                        placeholder="********"
                                        autoComplete="off"
                                        type="password"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>

                    <Button type="submit" className="mt-4 w-full" form="form-register" disabled={isLoading}>
                        {isLoading ?
                            <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                                <Spinner className='size-4'/>
                                Validating...
                            </div>
                            :
                            <p>Sign Up</p>
                        }
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
export default FormRegister
