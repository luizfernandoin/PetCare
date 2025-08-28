import { CardTitle } from "@/components/ui/card";

export default function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center">
            <CardTitle>{children}</CardTitle>
        </div>
    )
};