import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SectionTitle from "@/components/atoms/calendar/sectionTitle";

export default function PickerCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <Card>
            <CardHeader>
                <SectionTitle>{title}</SectionTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4">{children}</CardContent>
        </Card>
    )
};