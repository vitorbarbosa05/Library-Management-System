import ModuleWrapper from "../../../../components/shared/module-wrapper.tsx";
import {Separator} from "@/src/components/ui/separator.tsx";
import LinkAnimated from "@/src/components/shared/link-animated.tsx";
import {Path} from "@/src/router/paths.ts";
import {LibraryBigIcon} from "lucide-react";
import FormLogin from "@/src/(modules)/auth/ui/forms/form-login.tsx";

const LoginPage = () => {
    return (
        <ModuleWrapper classname="flex flex-col justify-center items-center mx-auto h-screen space-y-2">
            <header className="max-w-xs w-full space-y-1.5">
                <LibraryBigIcon/>
                <h3 className="scroll-m-20 text-2xl font-medium tracking-tight">
                    Library
                </h3>
                <p className="text-sm text-muted-foreground">
                    Sign in to manage your library network
                </p>
            </header>

            <main className="max-w-xs w-full">
                <FormLogin/>
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
export default LoginPage
