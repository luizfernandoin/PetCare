export type Appointment = {
    id: string;
    tutor: string;
    pet: string;
    servico: string;
    clinica: string;
    status: "pendente" | "concluído" | "cancelado";
    data: string;
    horarioInicio: string;
    horarioFim: string;
};