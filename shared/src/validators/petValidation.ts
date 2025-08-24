import { z } from "zod";
import { PET_SIZE } from "../enums";


const petCreateSchema = z.object({
    name: z.string().nonempty({ message: "O nome do pet é obrigatório!" })
    .max(100, "O nome pode ter no máximo 100 caracteres."),
    breed: z.string()
        .max(25, "A raça pode ter no máximo 25 caracteres."),
    age: z.number()
        .int("A idade deve ser um número inteiro.")
        .min(0, "A idade não pode ser negativa."),
    size: z.nativeEnum(PET_SIZE, {
        errorMap: () => ({ message: "O porte deve ser 'PEQUENO', 'MÉDIO' ou 'GRANDE'." }),
    }),
    features: z.string()
        .max(255, "As características podem ter no máximo 255 caracteres.")
        .optional(),
    image: z.string()
        .url("A imagem deve ser uma URL válida.")
});

const petUpdateSchema = z.object({
    name: z.string()
        .min(1, "O nome deve ter pelo menos 1 caracter.")
        .max(100, "O nome pode ter no máximo 100 caracteres.")
        .optional(),
    breed: z.string()
        .max(25, "A raça pode ter no máximo 25 caracteres.")
        .optional(),
    age: z.number()
        .int("A idade deve ser um número inteiro.")
        .min(0, "A idade não pode ser negativa.")
        .optional(),
    size: z.nativeEnum(PET_SIZE, {
        errorMap: () => ({ message: "O porte deve ser 'PEQUENO', 'MÉDIO' ou 'GRANDE'." }),
    }).optional(),
    characteristics: z.string()
        .max(255, "As características podem ter no máximo 255 caracteres.")
        .optional(),
    image: z.string()
        .url("A imagem deve ser uma URL válida.")
        .optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: "Nenhum campo foi enviado para atualização.",
});


export { petCreateSchema, petUpdateSchema };