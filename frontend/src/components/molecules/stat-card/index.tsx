type StatCardProps = {
    title: string,
    value: string | number,
    description?: string
}

export function StatCard({ title, value, description }: StatCardProps) {
    return (
        <div className="rounded-lg border bg-gray-100 p-4 shadow-sm flex flex-col gap-1">
            <h4 className="text-sm text-gray-500">{ title }</h4>
            <div className="text-3xl font-bold text-gray-900">{ value }</div>
            { description && (
                <p className="text-sm text-gray-600 font-medium">{ description }</p>
            )}
        </div>
    );
}