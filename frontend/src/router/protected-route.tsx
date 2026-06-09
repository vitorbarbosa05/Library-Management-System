import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/src/(default)/auth/context/auth.context";
import { Path } from "@/src/router/paths";

export function ProtectedRoute() {
    const { status, isAuthenticated } = useAuth();
    const location = useLocation();

    if (status === "idle" || status === "loading") {
        return null;
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to={Path.login}
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
}