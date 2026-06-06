import {createRoot} from "react-dom/client"
import {BrowserRouter} from "react-router";
import AppRouter from "@/src/router/app-router.tsx";
import { Toaster } from "@/src/components/ui/sonner"
import "./globals.css"

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <AppRouter/>
        <Toaster />
    </BrowserRouter>,
)
