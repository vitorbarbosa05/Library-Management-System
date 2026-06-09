import type { LucideIcon } from "lucide-react";
import type * as React from "react";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/src/components/ui/sidebar";
import {NavLink} from "react-router";

const ModuleSidebarMenu = ({
                               items,
                               title,
                               ...props
                           }: {
    title?: string;
    items: {
        label: string;
        url: string;
        icon: LucideIcon;
        isActive?: boolean;
    }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
    return (
        <SidebarGroup {...props}>
            <SidebarGroupLabel>{title}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton
                            size="sm"
                            asChild
                            tooltip={item.label}
                            className="hover:!rounded-2xl"
                        >
                            <NavLink to={item.url}>
                                <item.icon />
                                <span>{item.label}</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
};

export default ModuleSidebarMenu;