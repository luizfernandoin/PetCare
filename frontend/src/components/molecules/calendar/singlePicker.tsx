import * as React from "react";
import CalendarWrapper from "@/components/atoms/calendar/calendarWrapper";
import DateButton from "@/components/atoms/calendar/dateButton";
import PickerCard from "@/components/molecules/calendar/pickerCard";

export default function SinglePicker() {
    const [date, setDate] = React.useState<Date>();

    return (
        <PickerCard title="Mês">
            <CalendarWrapper mode="single" selected={date} onSelect={setDate} />
            <DateButton label={date ? date.toLocaleDateString() : "Selecione uma data"} disabled={!date} />
        </PickerCard>
    );
};