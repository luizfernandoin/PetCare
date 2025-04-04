import { z } from "zod";


const serviceSchema = z.object({
  tipo: z.enum(['Consulta', 'Vacinação', 'Exame', 'Outros'], {
    errorMap: () => ({ message: "Tipo deve ser 'Consulta', 'Vacinação', 'Exame' ou 'Outros'" }),
  }),
  observacoes: z.string().max(500, {
    message: "Observações não podem exceder 500 caracteres",
  }).optional(),
});


export { serviceSchema };