import {Navigate, Route, Routes} from "react-router";

import Page from "@/src/page.tsx";
import NotFound from "@/src/not-found.tsx";

import AuthLayout from "@/src/(modules)/auth/layout.tsx";
import LoginPage from "@/src/(modules)/auth/login/page.tsx";
import RegisterPage from "@/src/(modules)/auth/register/page.tsx";

const AppRouter = () => {
    return (
        <Routes>
            <Route path="*" element={<NotFound/>}/>

            <Route path="/" element={<Page/>}/>

            <Route path="/auth" element={<AuthLayout/>}>
                <Route index element={<Navigate to="/auth/login" replace/>}/>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
            </Route>
        </Routes>
    )
}
export default AppRouter
