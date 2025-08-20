import { z } from "zod";


const reviewSchema = z.object({
    rating: z.number()
        .min(1, "A nota deve ser no mínimo 1")
        .max(5, "A nota deve ser no máximo 5")
        .int("A nota deve ser um número inteiro"),
    comment: z.string().nonempty("O comentário é obrigatório!")
        .max(500, "O comentário deve ter no máximo 500 caracteres")
});


export { reviewSchema };