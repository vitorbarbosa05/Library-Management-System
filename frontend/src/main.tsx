import {createRoot} from "react-dom/client"
import {BrowserRouter} from "react-router";
import AppRouter from "@/src/router/app-router.tsx";
import {Toaster} from "@/src/components/ui/sonner"
import {AuthProvider} from "@/src/(default)/auth/context/auth.context";
import "./globals.css"

createRoot(document.getElementById("root")!).render(
    <AuthProvider>
        <BrowserRouter>
            <AppRouter/>
            <Toaster/>
        </BrowserRouter>,
    </AuthProvider>
)
