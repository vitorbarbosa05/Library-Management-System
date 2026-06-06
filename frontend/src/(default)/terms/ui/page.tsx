import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from '@/src/components/ui/breadcrumb'
import {Path} from "@/src/router/paths.ts";

const TermsOfServicePage = () => {
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
                            <BreadcrumbLink>Terms of Service</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="grid gap-y-12 lg:[grid-template-columns:1fr_auto]">
                    <div className="text-center lg:text-left">
                        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">
                            Terms <br className="hidden lg:block"/> and <br className="hidden lg:block"/>
                            Conditions
                        </h2>
                        <p>Please read these terms before using the Library platform.</p>
                    </div>

                    <div className="divide-y divide-dashed sm:mx-auto sm:max-w-lg lg:mx-0">
                        <div className="pb-6">
                            <h3 className="font-medium">Acceptance of terms</h3>
                            <p className="text-muted-foreground mt-4">
                                By creating an account or using this platform, you agree to follow these terms and
                                conditions.
                                If you do not agree with them, you should not use the service.
                            </p>
                        </div>

                        <div className="py-6">
                            <h3 className="font-medium">Account registration</h3>
                            <p className="text-muted-foreground mt-4">
                                To access some features, you may need to create an account with a valid username, email
                                address,
                                and password. You are responsible for keeping your account information accurate and your
                                password secure.
                            </p>
                        </div>

                        <div className="py-6">
                            <h3 className="font-medium">Use of the platform</h3>
                            <p className="text-muted-foreground mt-4">
                                The platform is intended to help manage library-related operations, such as users,
                                books,
                                authors, loans, and reservations. You agree to use it only for lawful and appropriate
                                purposes.
                            </p>
                        </div>

                        <div className="py-6">
                            <h3 className="font-medium">User responsibilities</h3>
                            <p className="text-muted-foreground mt-4">
                                You must not misuse the platform, attempt to access restricted areas, interfere with the
                                system,
                                or provide false information. Any abusive or unauthorized use may result in account
                                restriction or removal.
                            </p>
                        </div>

                        <div className="py-6">
                            <h3 className="font-medium">Service availability</h3>
                            <p className="text-muted-foreground mt-4">
                                I aim to keep the platform available and working correctly, but I cannot guarantee that
                                it will always
                                be free from errors, interruptions, or technical issues.
                            </p>
                        </div>

                        <div className="py-6">
                            <h3 className="font-medium">Changes to these terms</h3>
                            <p className="text-muted-foreground mt-4">
                                These terms may be updated from time to time to reflect changes in the platform or its
                                features.
                                Continued use of the service after changes means you accept the updated terms.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TermsOfServicePage;