import * as React from "react";
import { addDays } from "date-fns";
import CalendarWrapper from "@/components/atoms/calendar/calendarWrapper";
import DateButton from "@/components/atoms/calendar/dateButton";
import PickerCard from "@/components/molecules/calendar/pickerCard";
import type { DateRange } from "react-day-picker";

export default function RangePicker() {
    const [range, setRange] = React.useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 3),
    });

    const label = range!.from && range!.to
        ? `${range!.from.toLocaleDateString()} → ${range!.to.toLocaleDateString()}`
        : "Selecione o intervalo";

    return (
        <PickerCard title="Calendario">
            <div className="flex flex-wrap gap-4">
                <CalendarWrapper
                    mode="range"
                    selected={range}
                    month={new Date(new Date().getFullYear(), 0)}
                    onSelect={(value) => {
                        setRange(value ?? { 
                            from: undefined,
                            to: undefined 
                        });
                    }}
                    numberOfMonths={12}
                />
            </div>
            <DateButton 
                label={label} 
                disabled={!range!.from || !range!.to} 
            />
        </PickerCard>
    );
};