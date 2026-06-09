import {BadgeCheck, Bell, ChevronsUpDown, LogOut, User} from "lucide-react";
import {Avatar, AvatarFallback, AvatarImage} from "@/src/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/src/components/ui/sidebar";
import {Path} from "@/src/router/paths.ts";
import {NavLink} from "react-router";
import {toast} from "sonner";
import {useAuth} from "@/src/(default)/auth/hooks/use.auth.ts";

const ModuleSidebarUser = () => {
    const {isMobile} = useSidebar();
    const {user} = useAuth();

    const handleLogout = () => {
        toast.success("Logout clicked");
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={""} alt={user?.name}/>
                                <AvatarFallback className="rounded-lg">
                                    <User className="size-4"/>
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">{user?.name ?? ""}</span>
                                <span className="truncate text-xs">{user?.email ?? ""}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4"/>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={""} alt={user?.name}/>
                                    <AvatarFallback className="rounded-lg">
                                        <User className="size-4"/>
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user?.name}</span>
                                    <span className="truncate text-xs">{user?.email ?? ""}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <NavLink to={Path.settings}>
                                <DropdownMenuItem>
                                    <BadgeCheck/>
                                    Profile
                                </DropdownMenuItem>
                            </NavLink>
                            <DropdownMenuItem>
                                <Bell/>
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem variant={"destructive"} onClick={handleLogout}>
                            <LogOut/>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default ModuleSidebarUser;