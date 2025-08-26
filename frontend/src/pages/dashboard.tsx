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
import { useAppointment } from "@/hooks/useAppointment";
import { usePets } from "@/hooks/usePets";
import { useEffect } from "react";


/* const stats = [
  { title: "Novos Agendamentos", value: 23, description: "Hoje" },
  { title: "Serviços Pendentes", value: 7, description: "Aguardando atendimento" },
  { title: "Atendimentos Finalizados", value: "1.234", description: "Este mês" },
]; */

/* const servicosPrestados = [
  { tipo: 'Banho', quantidade: 24 },
  { tipo: 'Tosa', quantidade: 18 },
  { tipo: 'Vacinação', quantidade: 30 },
  { tipo: 'Consulta', quantidade: 12 },
]; */

const agendamentosSemana = [
  { dia: 'Seg', agendamentos: 5 },
  { dia: 'Ter', agendamentos: 8 },
  { dia: 'Qua', agendamentos: 6 },
  { dia: 'Qui', agendamentos: 10 },
  { dia: 'Sex', agendamentos: 4 },
  { dia: 'Sáb', agendamentos: 12 },
];

/* const avaliacoesServicos = [
  { servico: 'Banho', nota: 4.8 },
  { servico: 'Tosa', nota: 4.5 },
  { servico: 'Vacinação', nota: 4.9 },
  { servico: 'Consulta', nota: 4.3 },
]; */

/* const petsPorEspecie = [
  { especie: 'Cão', total: 40 },
  { especie: 'Gato', total: 22 },
  { especie: 'Coelho', total: 5 },
  { especie: 'Outro', total: 3 },
]; */

/* const comparecimento = [
  { status: 'Compareceu', valor: 45 },
  { status: 'Faltou/Cancelou', valor: 15 },
]; */

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
  const {
    appointments,
    loadAllAppointments,
  } = useAppointment();

  const {
    pets,
    loadAllPets
  } = usePets();

  useEffect(() => {
    loadAllAppointments();
    loadAllPets();
  }, [])

  const servicosPrestados = appointments
    .map((appointment) => ({
      tipo: appointment.service.type,
      quantidade: 1,
    }))
    .reduce((acc, item) => {
      const existingItem = acc.find((i) => i.tipo === item.tipo); // comparar pela chave
      if (existingItem) {
        existingItem.quantidade++;
      } else {
        acc.push({ ...item }); // garante que não reutiliza o mesmo objeto
      }
      return acc;
    }, [] as { tipo: string; quantidade: number }[]);

  const stats = [
    { title: "Novos Agendamentos", value: appointments.length, description: "Todos" },
    { title: "Serviços Pendentes", value: appointments.filter(appointment => appointment.status === "PENDING").length, description: "Aguardando atendimento" },
    { title: "Atendimentos Finalizados", value: appointments.filter(appointment => appointment.status === "COMPLETED").length, description: "Este mês" },
  ];

  const petsBySize = pets
    .map((pet) => ({
      size: pet.size,
      amount: 1,
    }))
    .reduce((acc, item) => {
      const existing = acc.find((i) => i.size === item.size);
      if (existing) {
        existing.amount++;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, [] as { size: string; amount: number }[]);

  const comparecimento = appointments.reduce((acc, appointment) => {
    if (appointment.status === "COMPLETED") {
      acc[0].valor++;
    } else if (appointment.status === "PENDING" || appointment.status === "CANCELED") {
      acc[1].valor++;
    }
    return acc;
  }, [
    { status: "Compareceu", valor: 0 },
    { status: "Não Compareceu", valor: 0 },
  ]);
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
        <ChartCard title="Serviços Prestados" className="col-span-3">
          <BarChartComponent data={servicosPrestados} />
        </ChartCard>

        {/* <ChartCard title="Avaliações por Serviço">
          <BarChartReviews data={avaliacoesServicos} />
        </ChartCard> */}

        <ChartCard title="Pets por tamanho">
          <PieChartComponent data={petsBySize} nameKey="size" dataKey="amount" />
        </ChartCard>

        <ChartCard title="Comparecimento">
          <PieChartComponent data={comparecimento} nameKey="status" dataKey="valor" isDonut />
        </ChartCard>

        <ChartCard title="Volume no Mês">
          <AreaChartComponent data={volumeMensal} />
        </ChartCard>

        <ChartCard title="Agendamentos da Semana" className="col-span-3">
          <LineChartComponent data={agendamentosSemana} />
        </ChartCard>
      </div>
    </>
  );
}