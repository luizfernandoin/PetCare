type SchedulingStatus = 
    "PENDENTE" | "CONFIRMADO" | "CANCELADO";

type Scheduling = {
    id: string;
    userId: string;
    petId: string;
    serviceId: string;
    clinicaId: string;
    dataAgendamento: Date;
    horaInicio: string;
    horaFim: string;
    status: SchedulingStatus;
}

type SchedulingCreate = Omit<Scheduling, 'id' | 'userId' | 'clinicaId' | 'status'>;

type SchedulingUpdate = Partial<Omit<Scheduling, 'id'>>;


export {
    SchedulingStatus,
    Scheduling,
    SchedulingCreate,
    SchedulingUpdate,
};