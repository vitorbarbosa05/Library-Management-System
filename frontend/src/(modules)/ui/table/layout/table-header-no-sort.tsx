import type {Column} from "@tanstack/react-table";
import {Button} from "@/src/components/ui/button";
import {Tooltip, TooltipContent, TooltipTrigger,} from "@/src/components/ui/tooltip";
import {cn} from "@/src/lib/utils";

interface DataTableColumnHeaderNoSortProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
    tooltip: string;
}

export function DataTableColumnHeaderNoSort<TData, TValue>({
                                                               column: _column,
                                                               title,
                                                               className,
                                                               tooltip,
                                                           }: DataTableColumnHeaderNoSortProps<TData, TValue>) {
    return (
        <div
            className={cn(
                "flex items-center p-0 m-0 text-muted-foreground",
                className,
            )}
        >
            <Button variant="ghost" className="h-auto px-0 has-[>svg]:px-0">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <span className="p-0 m-0">{title}</span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            </Button>
        </div>
    );
}