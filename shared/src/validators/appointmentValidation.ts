import { z } from "zod";


const appointmentSchema = z.object({
    petId: z.string().uuid({ message: "ID do pet inválido. Deve ser um UUID válido." }),
    serviceId: z.string().uuid({ message: "ID do serviço inválido. Deve ser um UUID válido." }),
    appointmentDate: z.union([
        z.string().date("Data de agendamento inválida. Use o formato YYYY-MM-DD."),
        z.date({ message: "Data de agendamento inválida." })
    ]),
    startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Hora de início inválida. Use o formato HH:mm." }),
    endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, { message: "Hora de início inválida. Use o formato HH:mm." }),
    status: z.enum(["PENDING", "CONFIRMED", "CANCELED", "COMPLETED"], { message: "Status inválido. Os valores permitidos são: pendente, confirmado, cancelado ou completado." })
});

type AppointmentCreate = z.infer<typeof appointmentSchema>


export {
    appointmentSchema,
    AppointmentCreate
};