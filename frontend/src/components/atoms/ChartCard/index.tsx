export function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-2xl shadow p-4 h-72">
            <h3 className="text-md font-medium mb-3">{title}</h3>
            <div className="h-[calc(100%-1.5rem)]">
                {children}
            </div>
        </div>
    );
}
