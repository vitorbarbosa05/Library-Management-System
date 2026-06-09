import {AmphoraIcon, ChartLineIcon, CogIcon, GiftIcon, HandCoinsIcon, OrigamiIcon,} from "lucide-react";
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
            icon: AmphoraIcon,
        },
        {
            label: "Authors",
            url: Path.dashboard,
            icon: GiftIcon,
        },
        {
            label: "Loans",
            url: Path.dashboard,
            icon: HandCoinsIcon,
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
    return (
        <Sidebar variant="inset" collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="hover:rounded-2xl" asChild>
                            <NavLink to={Path.dashboard}>
                                <div className="flex items-center gap-2">
                                    <div className="flex aspect-square size-7 items-center justify-center rounded-lg">
                                        <OrigamiIcon size={16} />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">Library</span>
                                        <span className="truncate text-xs">Library Management</span>
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