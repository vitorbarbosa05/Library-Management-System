import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router";
import AppRouter from "./router/app-router.tsx";
import './globals.css'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>,
)
