import ModuleWrapper from "../../../../components/shared/module-wrapper.tsx";
import {LibraryBigIcon} from "lucide-react";
import LinkAnimated from "@/src/components/shared/link-animated.tsx";
import {Path} from "@/src/router/paths.ts";
import {Separator} from "@/src/components/ui/separator.tsx";
import FormRegister from "@/src/(modules)/auth/ui/forms/form-register.tsx";

const RegisterPage = () => {
    return (
        <ModuleWrapper classname="flex flex-col justify-center items-center mx-auto h-screen space-y-2">
            <header className="space-y-1.5">
                <LibraryBigIcon/>
                <h3 className="scroll-m-20 text-2xl font-medium tracking-tight">
                    Library
                </h3>
                <p className="text-sm text-muted-foreground">
                    Sign up to manage your library network
                </p>
            </header>

            <main className="max-w-xs w-full">
                <FormRegister/>
            </main>

            <footer className="flex gap-2 text-xs font-medium text-muted-foreground">
                <LinkAnimated
                    to={Path.privacyPolicy}
                    text="Privacy Policy"
                />

                <Separator orientation="vertical"/>

                <LinkAnimated
                    to={Path.termsOfService}
                    text="Terms of Service"
                />
            </footer>
        </ModuleWrapper>
    )
}
export default RegisterPage
