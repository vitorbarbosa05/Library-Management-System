import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import * as z from "zod";

import {Button} from "@/src/components/ui/button";
import {Card, CardContent} from "@/src/components/ui/card";
import {Field, FieldError, FieldGroup, FieldLabel,} from "@/src/components/ui/field";
import {InputGroup, InputGroupAddon, InputGroupInput,} from "@/src/components/ui/input-group.tsx"
import {useState} from "react";
import {AuthApi} from "@/src/(modules)/auth/api/auth.api.ts";
import {toast} from "sonner";
import {Spinner} from "@/src/components/ui/spinner.tsx";
import {Path} from "@/src/router/paths.ts";
import {Link} from "react-router";
import InputRealTimeValidationDemo from "@/src/components/ui/input-password.tsx";
import {ALargeSmallIcon, MailIcon} from "lucide-react";


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
                                    <FieldLabel htmlFor="form-register-name" className="gap-1">
                                        Username
                                        <span className='text-destructive'>*</span>
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            {...field}
                                            id="form-register-name"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="e.g., Library"
                                            autoComplete="off"
                                            type="text"
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <ALargeSmallIcon/>
                                        </InputGroupAddon>
                                    </InputGroup>
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
                                    <FieldLabel htmlFor="form-register-email" className="gap-1">
                                        Email
                                        <span className='text-destructive'>*</span>
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            {...field}
                                            id="form-register-email"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="e.g., librarian@example.com"
                                            autoComplete="off"
                                            type="email"
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <MailIcon/>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <InputRealTimeValidationDemo/>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />
                        <div className="flex flex-col space-y-3">
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

                            <div className="text-xs text-center">
                                <p className="inline-block mr-2 text-muted-foreground">
                                    Already have an account?
                                </p>
                                <Link
                                    to={Path.login}
                                    className="group underline align-baseline"
                                >
                                    <p className="relative inline-block text-foreground transition-all duration-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-foreground after:transition-all after:duration-500 group-hover:after:w-full">
                                        Sign In
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    )
}
export default FormRegister
