import {EditIcon, EyeIcon, Trash2Icon} from "lucide-react";
import type React from "react";
import {useState} from "react";

import {Dialog, DialogTrigger} from "@/src/components/ui/dialog";
import type {UUID} from "@/src/lib/types/uuid.types";
import {NavLink} from "react-router";

export interface EditFormProps<TData> {
    id: UUID;
    initialValues: TData | null;
    onUpdated: () => void;
    onClose: () => void;
}

export interface DeleteFormProps {
    id: UUID;
    onDeleted: () => void;
    onClose: () => void;
}

export interface ModuleRowActionProps<TData> {
    id: UUID;
    row?: TData;
    MenuItem: React.ElementType;
    onDeleted?: (id: UUID) => void;
    onUpdated?: (id: UUID) => void;

    entityLabel: string;
    viewPath?: string;
    EditForm?: React.ComponentType<EditFormProps<TData>>;
    DeleteForm?: React.ComponentType<DeleteFormProps>;
}

export function ModuleRowAction<TData>({
                                           id,
                                           row,
                                           MenuItem,
                                           onDeleted,
                                           onUpdated,
                                           entityLabel,
                                           viewPath,
                                           EditForm,
                                           DeleteForm,
                                       }: ModuleRowActionProps<TData>) {
    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    return (
        <>
            {viewPath ? (
                <MenuItem className="gap-2 text-foreground" asChild>
                    <NavLink to={`${viewPath}/${id}`}>
                        <EyeIcon className="h-4 w-4"/>
                        View {entityLabel}
                    </NavLink>
                </MenuItem>
            ) : null}

            {EditForm ? (
                <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                    <DialogTrigger asChild>
                        <MenuItem
                            className="gap-2 text-foreground"
                            onSelect={(e: Event) => {
                                e.preventDefault();
                                setOpenEdit(true);
                            }}
                        >
                            <EditIcon className="h-4 w-4"/>
                            Edit
                        </MenuItem>
                    </DialogTrigger>
                    <EditForm
                        id={id}
                        initialValues={row ?? null}
                        onUpdated={() => {
                            onUpdated?.(id);
                            setOpenEdit(false);
                        }}
                        onClose={() => setOpenEdit(false)}
                    />
                </Dialog>
            ) : null}

            {DeleteForm ? (
                <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                    <DialogTrigger asChild>
                        <MenuItem
                            className="gap-2"
                            onSelect={(e: Event) => {
                                e.preventDefault();
                                setOpenDelete(true);
                            }}
                            data-variant="destructive"
                        >
                            <Trash2Icon className="h-4 w-4 text-destructive"/>
                            <span className="text-destructive">Delete</span>
                        </MenuItem>
                    </DialogTrigger>
                    <DeleteForm
                        id={id}
                        onDeleted={() => {
                            onDeleted?.(id);
                            setOpenDelete(false);
                        }}
                        onClose={() => setOpenDelete(false)}
                    />
                </Dialog>
            ) : null}
        </>
    );
}