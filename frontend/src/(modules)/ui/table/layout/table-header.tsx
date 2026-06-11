import type {Column} from "@tanstack/react-table";
import {ArrowUpDownIcon} from "lucide-react";
import {Button} from "@/src/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger,} from "@/src/components/ui/tooltip";
import {cn} from "@/src/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
    tooltip: string;
}

export function DataTableColumnHeader<TData, TValue>({
                                                         column,
                                                         title,
                                                         className,
                                                         tooltip,
                                                     }: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <div
            className={cn(
                "flex items-center p-0 m-0 text-muted-foreground",
                className,
            )}
        >
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        className="has-[>svg]:px-0"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        <span>{title}</span>
                        <ArrowUpDownIcon className="h-4 w-4"/>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tooltip}</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}