import { Navigate, Outlet, useLocation } from "react-router";

import { Spinner } from "@/src/components/ui/spinner";
import { useAuth } from "@/src/(default)/auth/hooks/use.auth";
import { Path } from "@/src/router/paths";

export function ProtectedRoute() {
    const { status, isAuthenticated } = useAuth();
    const location = useLocation();

    if (status === "idle" || status === "loading") {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Spinner className="size-4" />
                    <span className="text-sm">Loading...</span>
                </div>
            </div>
        );
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