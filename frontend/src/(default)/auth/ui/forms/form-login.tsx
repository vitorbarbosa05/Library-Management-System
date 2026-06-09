import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useForm} from "react-hook-form";
import * as z from "zod";

import {Button} from "@/src/components/ui/button.tsx";
import {Card, CardContent} from "@/src/components/ui/card.tsx";
import {Field, FieldError, FieldGroup, FieldLabel,} from "@/src/components/ui/field.tsx";
import {InputGroup, InputGroupAddon, InputGroupInput,} from "@/src/components/ui/input-group.tsx"
import {useState} from "react";
import {toast} from "sonner";
import {Spinner} from "@/src/components/ui/spinner.tsx";
import {Path} from "@/src/router/paths.ts";
import {Link, useNavigate} from "react-router";
import {EyeIcon, EyeOffIcon, MailIcon} from "lucide-react";
import {useAuth} from "@/src/(default)/auth/context/auth.context.tsx";

const formSchema = z.object({
    email: z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),
    password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters.")
        .regex(/\d/, "Password must contain at least one number.")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter."),
});

const FormLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const navigate = useNavigate();
    const {login} = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        if (isLoading) return;
        setIsLoading(true);

        try {
            await login(data);

            toast.success("Login successful");

            setTimeout(() => {
                form.reset();
            }, 800);

            navigate(Path.dashboard, {
                replace: true,
            });

        } catch (error) {
            const message = error instanceof Error ? error.message : "Error";
            toast.error("Error login an account", {
                description: message,
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
            <CardContent>
                <form id="form-login" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-login-email" className="gap-1">
                                        Email
                                        <span className='text-destructive'>*</span>
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            {...field}
                                            id="form-login-email"
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
                            render={({field, fieldState}) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="form-login-password" className="gap-1">
                                        Password
                                        <span className='text-destructive'>*</span>
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            {...field}
                                            id="form-login-password"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="********"
                                            autoComplete="off"
                                            type={isVisible ? 'text' : 'password'}
                                        />
                                        <InputGroupAddon align='inline-end'>
                                            <Button
                                                variant='ghost'
                                                size='icon'
                                                onClick={() => setIsVisible(prevState => !prevState)}
                                                className='text-muted-foreground focus-visible:ring-ring/50 rounded-l-none hover:bg-transparent'
                                            >
                                                {isVisible ? (
                                                    <EyeOffIcon/>
                                                ) : (
                                                    <EyeIcon/>
                                                )}
                                                <span
                                                    className='sr-only'>{isVisible ? 'Hide password' : 'Show password'}</span>
                                            </Button>
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]}/>
                                    )}
                                </Field>
                            )}
                        />

                        <div className="flex flex-col space-y-3">
                            <Button type="submit" className="mt-4 w-full" form="form-login" disabled={isLoading}>
                                {isLoading ?
                                    <div className='text-muted-foreground flex items-center gap-2 text-sm'>
                                        <Spinner className='size-4'/>
                                        Validating...
                                    </div>
                                    :
                                    <p>Sign In</p>
                                }
                            </Button>

                            <div className="text-xs text-center">
                                <p className="inline-block mr-1.5 text-muted-foreground">
                                    Don't have an account?
                                </p>
                                <Link
                                    to={Path.register}
                                    className="group underline align-baseline"
                                >
                                    <p className="relative inline-block text-foreground transition-all duration-500 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-foreground after:transition-all after:duration-500 group-hover:after:w-full">
                                        Sign Up
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
export default FormLogin
