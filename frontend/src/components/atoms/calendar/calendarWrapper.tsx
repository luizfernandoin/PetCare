import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

export default function CalendarWrapper(props: ComponentProps<typeof Calendar>) {
    return (
        <Calendar {...props} className={cn("rounded-lg border", props.className)} />
    )
};