import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/src/(default)/auth/context/auth.context";
import { Path } from "@/src/router/paths";

export function GuestOnlyRoute() {
    const { status, isAuthenticated } = useAuth();

    if (status === "idle" || status === "loading") {
        return null;
    }

    if (isAuthenticated) {
        return <Navigate to={Path.dashboard} replace />;
    }

    return <Outlet />;
}