import 'zod-openapi/extend';
import { z } from "zod";

const horarioSchema = z.object({
    clinicaId: z
        .string()
        .uuid("ID inválido para a clínica")
        .openapi({
            description: "ID da clínica relacionada ao horário",
            example: "a12b3c4d-e5f6-7890-ab12-c3d4e5f67890",
        }),
    dia: z
        .string()
        .openapi({
            description: "Dia da semana em que o horário está disponível",
            example: "Segunda-feira",
        }),
    horaInicio: z
        .string()
        .regex(/^\d{2}:\d{2}$/, "Hora de início deve estar no formato HH:mm")
        .openapi({
            description: "Hora de início do horário disponível",
            example: "08:00",
        }),
    horaFim: z
        .string()
        .regex(/^\d{2}:\d{2}$/, "Hora de término deve estar no formato HH:mm")
        .openapi({
            description: "Hora de término do horário disponível",
            example: "18:00",
        }),
}).openapi({
    title: "Horário Schema",
    description: "Schema para horários disponíveis de uma clínica",
});

export { horarioSchema };
