import { z } from "zod";

const urlParamsSchema = z.object({
    id: z.string().uuid("O ID deve ser um UUID válido.").optional(),
    clinicId: z.string().uuid({ message: "O ID da clínica é inválido." }).optional(),
    petId: z.string().uuid({ message: "O id do pet é inválido!" }).optional(),
    professionalId: z.string().uuid({ message: "O id do profissional é inválido!" }).optional(),
    serviceId: z.string().uuid({ message: "O id do serviço é inválido!" }).optional(),
});

export { urlParamsSchema };
