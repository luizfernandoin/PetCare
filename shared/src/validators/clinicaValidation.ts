import { z } from "zod";


const clinicaCreateSchema = z.object({
    nome: z.string()
        .min(3, "O nome deve ter pelo menos 3 caracteres.")
        .max(100, "O nome pode ter no máximo 100 caracteres."),
    telefone: z.string().regex(/^\d{10,15}$/, "O telefone deve conter entre 10 e 15 dígitos numéricos."),
    location: z.object({
        street: z.string().nonempty({ message: "A rua deve ser informada!" }),
        number: z.string().nonempty({ message: "O número deve ser informado!" }),
        city: z.string().nonempty({ message: "A cidade deve ser informada!" }),
        state: z.string().nonempty({ message: "O estado deve ser informado!" }),
        country: z.string().nonempty({ message: "O país deve ser informado!" }),
        postalcode: z.string().nonempty({ message: "O código postal deve ser informado!" }),
    }),
}).strip()

const clinicaUpdateSchema = z.object({
    nome: z.string()
        .min(3, "O nome deve ter pelo menos 3 caracteres.")
        .max(100, "O nome pode ter no máximo 100 caracteres.")
        .optional(),
    telefone: z.string().regex(/^\d{10,15}$/, "O telefone deve conter entre 10 e 15 dígitos numéricos.").optional(),
    location: z.object({
        street: z.string().min(1, "A rua deve ser informada!"),
        number: z.string().min(1, "O número deve ser informado!"),
        city: z.string().min(1, "A cidade deve ser informada!"),
        state: z.string().min(1, "O estado deve ser informado!"),
        country: z.string().min(1, "O país deve ser informado!"),
        postalcode: z.string().min(1, "O código postal deve ser informado!"),
    }).optional(),
})


export { clinicaCreateSchema, clinicaUpdateSchema };