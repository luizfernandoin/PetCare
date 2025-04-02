import { z } from "zod";


const petCreateSchema = z.object({
    nome: z.string().nonempty({ message: "O nome do pet é obrigatório!" })
    .max(100, "O nome pode ter no máximo 100 caracteres."),
    raca: z.string()
        .max(25, "A raça pode ter no máximo 25 caracteres.")
        .optional(),
    idade: z.number()
        .int("A idade deve ser um número inteiro.")
        .min(0, "A idade não pode ser negativa.")
        .optional(),
    porte: z.enum(["pequeno", "medio", "grande"], {
        errorMap: () => ({ message: "O porte deve ser 'pequeno', 'medio' ou 'grande'." }),
    }),
    caracteristicas: z.string()
        .max(255, "As características podem ter no máximo 255 caracteres.")
        .optional(),
});

const petUpdateSchema = z.object({
    nome: z.string()
        .min(1, "O nome deve ter pelo menos 1 caracter.")
        .max(100, "O nome pode ter no máximo 100 caracteres.")
        .optional(),
    raca: z.string()
        .max(25, "A raça pode ter no máximo 25 caracteres.")
        .optional(),
    idade: z.number()
        .int("A idade deve ser um número inteiro.")
        .min(0, "A idade não pode ser negativa.")
        .optional(),
    porte: z.enum(["pequeno", "medio", "grande"], {
        errorMap: () => ({ message: "O porte deve ser 'pequeno', 'medio' ou 'grande'." }),
    }).optional(),
    caracteristicas: z.string()
        .max(255, "As características podem ter no máximo 255 caracteres.")
        .optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: "Nenhum campo foi enviado para atualização.",
});


export { petCreateSchema, petUpdateSchema };