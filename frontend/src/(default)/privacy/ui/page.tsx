import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/src/components/ui/breadcrumb.tsx";
import {Path} from "@/src/router/paths.ts";

const PrivacyPolicyPage = () => {
    return (
        <section className="scroll-py-16 py-16 md:scroll-py-32 md:py-32">
            <div className="mx-auto max-w-5xl px-6 space-y-6">

                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href={Path.register} className="flex items-center gap-1">
                                Register
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator> / </BreadcrumbSeparator>
                        <BreadcrumbItem>
                            <BreadcrumbLink>Privacy Policy</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="grid gap-y-12 lg:[grid-template-columns:1fr_auto]">
                    <div className="text-center lg:text-left">
                        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                            Privacy <br className="hidden lg:block"/> Policy <br className="hidden lg:block"/>
                        </h2>
                        <p>Please read this policy to understand how your data is collected and used.</p>
                    </div>

                    <div className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0">
                        <div className="pb-6">
                            <h3 className="font-medium">What data is collected?</h3>
                            <p className="text-muted-foreground mt-4">
                                When you create an account, the platform collects the information needed to identify and
                                authenticate you, such as your username, email address, password, role, and membership
                                status.
                                Your password is used only for authentication and should be stored securely in encrypted
                                or hashed form.
                            </p>
                        </div>

                        <div className="py-6">
                            <h3 className="font-medium">How is your data used?</h3>
                            <p className="text-muted-foreground mt-4">
                                Your data is used to create and manage your account, allow you to sign in, control
                                access to
                                protected features, and provide library-related functionality such as managing books,
                                authors,
                                loans, and reservations.
                            </p>
                        </div>

                        <div className="py-6">
                            <h3 className="font-medium">Authentication and session data</h3>
                            <p className="text-muted-foreground mt-4">
                                After login, the platform may store an authentication token in your browser to keep your
                                session
                                active and allow access to protected pages. This token is used only for authentication
                                and is not
                                used for advertising or tracking purposes.
                            </p>
                        </div>

                        <div className="py-6">
                            <h3 className="font-medium">Is your data shared?</h3>
                            <p className="text-muted-foreground mt-4">
                                Your personal data is not sold, traded, or shared with third parties for marketing
                                purposes.
                                Data may only be used internally by the platform to provide its core functionality and
                                maintain
                                system security.
                            </p>
                        </div>

                        <div className="py-6">
                            <h3 className="font-medium">How is your data protected?</h3>
                            <p className="text-muted-foreground mt-4">
                                Reasonable security measures are used to protect your information from unauthorized
                                access,
                                modification, or disclosure. However, no system is completely secure, so you should
                                always use a
                                strong password and keep your login details private.
                            </p>
                        </div>

                        <div className="py-6">
                            <h3 className="font-medium">Data removal</h3>
                            <p className="text-muted-foreground mt-4">
                                You may request the removal of your account or personal data when it is no longer
                                needed.
                                Some information may need to be kept temporarily if it is required for security, audit,
                                or
                                library operation purposes.
                            </p>
                        </div>

                        <div className="py-6">
                            <h3 className="font-medium">Changes to this policy</h3>
                            <p className="text-muted-foreground mt-4">
                                This privacy policy may be updated whenever the platform changes how it collects,
                                stores, or
                                uses personal data. Continued use of the platform after changes means you acknowledge
                                the
                                updated policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PrivacyPolicyPage