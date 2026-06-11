import {BookIcon, ChartLineIcon, CogIcon, LibraryBigIcon, SignatureIcon, TagsIcon,} from "lucide-react";
import type * as React from "react";
import ModuleSidebarMenu from "@/src/(modules)/ui/layout/module-sidebar-menu.tsx";
import ModuleSidebarUser from "@/src/(modules)/ui/layout/module-sidebar-user.tsx";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/src/components/ui/sidebar";
import {Path} from "@/src/router/paths.ts";
import {NavLink} from "react-router";
import {useActuatorInfo} from "@/src/lib/hooks/use-actuator-info.ts";


const sidebarData = {
    overview: [
        {
            label: "Dashboard",
            url: Path.dashboard,
            icon: ChartLineIcon,
        },
    ],

    features: [
        {
            label: "Books",
            url: Path.dashboard,
            icon: BookIcon,
        },
        {
            label: "Authors",
            url: Path.authors,
            icon: SignatureIcon,
        },
        {
            label: "Loans",
            url: Path.dashboard,
            icon: TagsIcon,
        },
    ],

    system: [
        {
            label: "Settings",
            url: Path.settings,
            icon: CogIcon,
        },
    ],
};

const ModuleSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    const { info, loading, error } = useActuatorInfo();

    return (
        <Sidebar variant="inset" collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="hover:rounded-2xl" asChild>
                            <NavLink to={Path.dashboard}>
                                <div className="flex items-center gap-2">
                                    <div className="flex aspect-square size-7 items-center justify-center rounded-lg">
                                        <LibraryBigIcon size={16} />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">
                                            {loading ? "Loading..." : error ? "Library" : info?.app.name}
                                        </span>
                                        <span className="truncate text-xs">
                                            {loading ? "..." : error ? "v.unknown" : `v.${info?.app.version}`}
                                        </span>
                                    </div>
                                </div>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <ModuleSidebarMenu title="Overview" items={sidebarData.overview} />
                <ModuleSidebarMenu title="Features" items={sidebarData.features} />
                <ModuleSidebarMenu title="System" items={sidebarData.system} />
            </SidebarContent>
            <SidebarFooter>
                <ModuleSidebarUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};

export default ModuleSidebar;