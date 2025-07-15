import { PageHeader } from "@/components/molecules/page-header";
import { StatCard } from "@/components/molecules/stat-card";


const stats = [
    {
        title: "Novos Agendamentos",
        value: 23,
        description: "Total de Agendamentos Hoje",
    },
    {
        title: "Serviços Pendentes",
        value: 7,
        description: "Atendimentos ainda não concluídos",
    },
    {
        title: "Atendimentos Finalizados",
        value: "1,234",
        description: "Total de Serviços Concluídos",
    },
];

export default function Dashboard() {
    return (
        <>
            <PageHeader
                title="teste"
                description="teste"
                buttonLabel="a"
                onButtonClick={() => console.log("Atualizando dashboard...")}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                { stats.map(stat => (
                    <StatCard 
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        description={stat.description}
                    />
                ))}
            </div>
        </>
    );
}