import {Outlet} from "react-router";

import ModuleSidebar from "@/src/(modules)/ui/layout/module-sidebar.tsx";
import {SidebarInset, SidebarProvider,} from "@/src/components/ui/sidebar.tsx";
import ModuleSidebarHeader from "@/src/(modules)/ui/layout/module-sidebar-header.tsx";
import {TooltipProvider} from "@/src/components/ui/tooltip.tsx";

const ModuleLayout = () => {
    return (
        <TooltipProvider>
            <SidebarProvider>
                <ModuleSidebar />

                <SidebarInset>
                    <ModuleSidebarHeader />

                    <main>
                        <Outlet />
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </TooltipProvider>
    );
};

export default ModuleLayout;