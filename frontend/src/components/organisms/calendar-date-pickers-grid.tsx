import SinglePicker from "@/components/molecules/calendar/singlePicker";
import RangePicker from "@/components/molecules/calendar/rangePicker";

export default function DatePickersGrid() {
    return (
        <div className="flex flex-col gap-6">
            <SinglePicker />
            <RangePicker />
        </div>
    )
};