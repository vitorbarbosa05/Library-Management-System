import { useEffect, useState } from "react";
import { Separator } from "@/src/components/ui/separator";
import { SidebarTrigger } from "@/src/components/ui/sidebar";
import { cn } from "@/src/lib/utils";

const ModuleSidebarHeader = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "sticky top-1 z-50 w-full flex h-12 justify-between shrink-0 items-center gap-2 overflow-hidden",
                isScrolled &&
                "bg-background/50 max-w-full rounded-2xl border backdrop-blur-lg",
            )}
        >
            <div className="flex items-center gap-2 px-4 overflow-hidden">
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <div className="min-w-0 flex-1 overflow-hidden">
                    Breadcrumb
                </div>
            </div>
        </header>
    );
};

export default ModuleSidebarHeader;