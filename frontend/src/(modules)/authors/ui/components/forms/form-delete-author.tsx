import {useState} from "react";
import {toast} from "sonner";
import {TriangleAlertIcon} from "lucide-react";

import type {DeleteFormProps} from "@/src/(modules)/ui/table/row/row-action";
import {AuthorService} from "@/src/(modules)/authors/service/author.service";
import {DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,} from "@/src/components/ui/dialog";
import {Button} from "@/src/components/ui/button";
import {Spinner} from "@/src/components/ui/spinner";
import {extractErrorMessage} from "@/src/lib/extract-error-message.ts";

export function FormDeleteAuthor({id, onDeleted, onClose}: DeleteFormProps) {
    const [loading, setLoading] = useState(false);

    async function handleDelete() {
        setLoading(true);
        try {
            await AuthorService.delete(id);
            toast.success("Author successfully deleted");
            onDeleted();
        } catch (error) {
            toast.error("Error deleting author", {
                description: extractErrorMessage(error),
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <DialogContent>
            <DialogHeader>
                <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-destructive/10">
                    <TriangleAlertIcon className="size-6 text-destructive"/>
                </div>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                    This action is irreversible. The author and any reference
                    to it will be permanently removed.
                </DialogDescription>
            </DialogHeader>

            <DialogFooter>
                <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </Button>
                <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Spinner className="mr-2 size-4"/>
                            Deleting...
                        </>
                    ) : (
                        "Delete Author"
                    )}
                </Button>
            </DialogFooter>
        </DialogContent>
    );
}