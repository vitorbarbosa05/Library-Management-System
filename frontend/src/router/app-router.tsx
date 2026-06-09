import { Navigate, Route, Routes } from "react-router";

import Page from "@/src/page.tsx";
import NotFound from "@/src/not-found.tsx";

import { ProtectedRoute } from "@/src/router/protected-route.tsx";
import { GuestOnlyRoute } from "@/src/router/guest-only-route.tsx";

import AuthLayout from "@/src/(default)/auth/ui/layout.tsx";
import LoginPage from "@/src/(default)/auth/ui/login/page.tsx";
import RegisterPage from "@/src/(default)/auth/ui/register/page.tsx";

import PrivacyPolicyPage from "@/src/(default)/privacy/ui/page.tsx";
import TermsOfServicePage from "@/src/(default)/terms/ui/page.tsx";

import DashboardPage from "@/src/(modules)/dashboard/ui/page.tsx";

import { Path } from "@/src/router/paths.ts";

const AppRouter = () => {
    return (
        <Routes>
            {/* Public only / guest only routes */}
            <Route element={<GuestOnlyRoute />}>
                <Route path="/" element={<Page />} />

                <Route path={Path.privacyPolicy} element={<PrivacyPolicyPage />} />
                <Route path={Path.termsOfService} element={<TermsOfServicePage />} />

                <Route path="/auth" element={<AuthLayout />}>
                    <Route index element={<Navigate to={Path.login} replace />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>
            </Route>

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
                <Route path={Path.dashboard} element={<DashboardPage />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default AppRouter;