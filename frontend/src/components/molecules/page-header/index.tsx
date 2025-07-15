import { Button } from "@/components/ui/button";

interface PageHeaderProps {
    title: string;
    description: string;
    buttonLabel?: string;
    onButtonClick?: () => void;
}

export function PageHeader({
    title,
    description,
    buttonLabel,
    onButtonClick
}: PageHeaderProps) {
    return (
        <div className=" flex items-center justify-between px-4 sm:px-6 lg:px-8 mt-4 mb-6">
            <div>
                <h1 className="text-2xl font-bold tracking-tight mb-1">{title}</h1>
                {description && (
                    <p className="text-muted-foreground text-sm">{description}</p>
                )}
            </div>

            {buttonLabel && onButtonClick && (
                <Button className="cursor-pointer" onClick={onButtonClick}>{buttonLabel}</Button>
            )}
        </div>
    );
}