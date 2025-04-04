import { z } from "zod";


const agendamentoSchema = z.object({
    petId: z.string().uuid({ message: "ID do pet inválido. Deve ser um UUID válido." }),
    serviceId: z.string().uuid({ message: "ID do serviço inválido. Deve ser um UUID válido." }),
    dataAgendamento: z.string().date("Data de agendamento inválida. Use o formato YYYY-MM-DD."),
    horaInicio: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Hora de início inválida. Use o formato HH:mm." }),
    horaFim: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Hora de início inválida. Use o formato HH:mm." }),
    status: z.enum(["pendente", "confirmado", "cancelado"], { message: "Status inválido. Os valores permitidos são: pendente, confirmado ou cancelado." })
});


export { agendamentoSchema };