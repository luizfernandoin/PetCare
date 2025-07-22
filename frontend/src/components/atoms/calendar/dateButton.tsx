import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export interface DateButtonProps extends ComponentProps<typeof Button> {
    label: string;
}

export default function DateButton({ label, className, ...rest }: DateButtonProps) {
    return (
        <Button variant="outline" className={cn("w-full", className)} {...rest}>
            {label}
        </Button>
    )
};