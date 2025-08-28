import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export function AreaChartComponent({ data }: { data: any[] }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="volume" stroke="#6366f1" fillOpacity={1} fill="url(#colorVolume)" />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export function BarChartReviews({ data }: { data: any[] }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <XAxis dataKey="servico" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Bar dataKey="nota" fill="#facc15" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export function BarChartComponent({ data }: { data: any[] }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tipo" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#4f46e5" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export function LineChartComponent({ data }: { data: any[] }) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="dia" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="agendamentos" stroke="#22c55e" />
            </LineChart>
        </ResponsiveContainer>
    );
}

export function PieChartComponent({ data, nameKey, dataKey, isDonut = false }: {
    data: any[],
    nameKey: string,
    dataKey: string,
    isDonut?: boolean
}) {
    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={isDonut ? 60 : 0}
                    outerRadius={100}
                    dataKey={dataKey}
                    nameKey={nameKey}
                    label
                >
                    {data.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}