import { ChartCard } from "@/components/atoms/ChartCard";
import { PageHeader } from "@/components/molecules/page-header";
import { StatCard } from "@/components/molecules/stat-card";
import { 
    AreaChartComponent, 
    BarChartComponent, 
    BarChartReviews, 
    LineChartComponent, 
    PieChartComponent 
} from "@/components/organisms/Chart";


const stats = [
    { title: "Novos Agendamentos", value: 23, description: "Hoje" },
    { title: "Serviços Pendentes", value: 7, description: "Aguardando atendimento" },
    { title: "Atendimentos Finalizados", value: "1.234", description: "Este mês" },
];

const servicosPrestados = [
    { tipo: 'Banho', quantidade: 24 },
    { tipo: 'Tosa', quantidade: 18 },
    { tipo: 'Vacinação', quantidade: 30 },
    { tipo: 'Consulta', quantidade: 12 },
];

const agendamentosSemana = [
    { dia: 'Seg', agendamentos: 5 },
    { dia: 'Ter', agendamentos: 8 },
    { dia: 'Qua', agendamentos: 6 },
    { dia: 'Qui', agendamentos: 10 },
    { dia: 'Sex', agendamentos: 4 },
    { dia: 'Sáb', agendamentos: 12 },
];

const avaliacoesServicos = [
    { servico: 'Banho', nota: 4.8 },
    { servico: 'Tosa', nota: 4.5 },
    { servico: 'Vacinação', nota: 4.9 },
    { servico: 'Consulta', nota: 4.3 },
];

const petsPorEspecie = [
    { especie: 'Cão', total: 40 },
    { especie: 'Gato', total: 22 },
    { especie: 'Coelho', total: 5 },
    { especie: 'Outro', total: 3 },
];

const comparecimento = [
    { status: 'Compareceu', valor: 45 },
    { status: 'Faltou/Cancelou', valor: 15 },
];

const volumeMensal = [
    { dia: '01', volume: 3 },
    { dia: '05', volume: 8 },
    { dia: '10', volume: 15 },
    { dia: '15', volume: 7 },
    { dia: '20', volume: 12 },
    { dia: '25', volume: 10 },
    { dia: '30', volume: 9 },
];

export default function Dashboard() {
    return (
        <>
            <PageHeader
                title="Painel Profissional"
                description="Resumo das atividades e estatísticas"
                buttonLabel="Atualizar"
                onButtonClick={() => console.log("Atualizando dashboard...")}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                {stats.map(stat => (
                    <StatCard
                        key={stat.title}
                        title={stat.title}
                        value={stat.value}
                        description={stat.description}
                    />
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                <ChartCard title="Serviços Prestados">
                    <BarChartComponent data={servicosPrestados} />
                </ChartCard>

                <ChartCard title="Agendamentos da Semana">
                    <LineChartComponent data={agendamentosSemana} />
                </ChartCard>

                <ChartCard title="Avaliações por Serviço">
                    <BarChartReviews data={avaliacoesServicos} />
                </ChartCard>

                <ChartCard title="Pets por Espécie">
                    <PieChartComponent data={petsPorEspecie} nameKey="especie" dataKey="total" />
                </ChartCard>

                <ChartCard title="Comparecimento">
                    <PieChartComponent data={comparecimento} nameKey="status" dataKey="valor" isDonut />
                </ChartCard>

                <ChartCard title="Volume no Mês">
                    <AreaChartComponent data={volumeMensal} />
                </ChartCard>
            </div>
        </>
    );
}