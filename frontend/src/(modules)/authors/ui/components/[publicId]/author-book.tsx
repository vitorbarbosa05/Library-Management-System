import {Card, CardFooter, CardHeader, CardTitle,} from "@/src/components/ui/card";
import {Badge} from "@/src/components/ui/badge";

interface AuthorBookProps {
    title: string;
    isbn: string;
    publishDate: string;
    genre: string;
}

function formatPublishDate(iso: string): string {
    return iso.slice(0, 10);
}

export default function AuthorBook({title, isbn, publishDate, genre}: AuthorBookProps) {
    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="flex items-start justify-between gap-2">
                    <div className="flex flex-col">
                        <span className="truncate">{title}</span>
                        <span className="text-xs font-normal text-muted-foreground">
                            #{isbn}
                        </span>
                    </div>
                    <span className="shrink-0 text-sm text-muted-foreground">
                        {formatPublishDate(publishDate)}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardFooter>
                <Badge variant="secondary">{genre}</Badge>
            </CardFooter>
        </Card>
    );
}