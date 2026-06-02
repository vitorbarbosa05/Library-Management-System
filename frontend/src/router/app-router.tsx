import {Navigate, Route, Routes} from "react-router";
import Page from "../page.tsx";
import AuthLayout from "../(modules)/auth/layout.tsx";
import LoginPage from "../(modules)/auth/login/page.tsx";
import RegisterPage from "../(modules)/auth/register/page.tsx";
import NotFound from "../not-found.tsx";

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
