import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { IconDotsVertical } from "@tabler/icons-react";
import { ReactNode } from "react";

type ActionsTableProps<T> = {
    item: T;
    getId: (item: T) => string;
    onEdit?: (item: T) => void;
    onDelete?: (id: string) => void;
    extraActions?: ReactNode;
};

export function ActionsTable<T>({
    item,
    getId,
    onEdit,
    onDelete,
    extraActions,
}: ActionsTableProps<T>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                    <IconDotsVertical />
                    <span className="sr-only">Abrir menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32 p-4 rounded-md shadow-md">
                {onEdit && <DropdownMenuItem onClick={() => onEdit(item)}>Editar</DropdownMenuItem>}
                {onEdit && onDelete && <DropdownMenuSeparator />}
                {onDelete && (
                    <DropdownMenuItem
                        onClick={() => onDelete(getId(item))}
                        className="text-red-600"
                    >
                        Excluir
                    </DropdownMenuItem>
                )}
                {extraActions}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
