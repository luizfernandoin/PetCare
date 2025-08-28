import { z } from "zod";
import { SERVICE_TYPE } from "../enums";


const serviceSchema = z.object({
  name: z.string().min(3, { message: "Nome do serviço deve ter ao menos 3 caracteres" })
    .max(100, { message: "Nome do serviço deve ter no máximo 100 caracteres" }),
  type: z.nativeEnum(SERVICE_TYPE, {
    errorMap: () => ({ message: "Tipo de serviço inválido. Escolha um dos tipos definidos." }),
  }),
  description: z.string().max(500, { message: "Descrição do serviço deve ter no máximo 500 caracteres" }).optional(),
});

type ServiceCreate = z.infer<typeof serviceSchema>;


export {
  serviceSchema,
  ServiceCreate
};