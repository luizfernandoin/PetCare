import { z } from "zod";


const userSchema = z.object({
    email: z.string().email("E-mail inválido"),
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").max(100, "O nome pode ter no máximo 100 caracteres"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    telefone: z.string().regex(/^\d{10,15}$/, "O telefone deve conter entre 10 e 15 dígitos numéricos"),
    location: z.object({
        street: z.string().min(1, "A rua deve ser informada!"),
        number: z.string().min(1, "O número deve ser informado!"),
        city: z.string().min(1, "A cidade deve ser informada!"),
        state: z.string().min(1, "O estado deve ser informado!"),
        country: z.string().min(1, "O país deve ser informado!"),
        postalcode: z.string().min(1, "O código postal deve ser informado!"),
    }).optional(),
    tipo: z.enum(["Cliente", "Profissional"]).refine(
        (value) => ["Cliente", "Profissional"].includes(value),
        {
            message: "Tipo deve ser 'Cliente' ou 'Profissional'",
        }
    ),
}).refine((data) => !!data.location, {
    message: "O atributo 'location' é obrigatorio!",
    path: ["location"],
});

const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    senha: z.string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .regex(/[a-zA-Z]/, "A senha deve conter ao menos uma letra")
        .regex(/[0-9]/, "A senha deve conter ao menos um número")
        .regex(/[\W_]/, "A senha deve conter ao menos um caractere especial (por exemplo, !, @, #, $, etc.)"),
});

const userUpdateSchema = z.object({
    email: z.string().email("E-mail inválido").optional(),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").optional(),
    nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").max(100, "O nome pode ter no máximo 100 caracteres").optional(),
    telefone: z.string().regex(/^\d{10,15}$/, "O telefone deve conter entre 10 e 15 dígitos numéricos").optional(),
    location: z.object({
        street: z.string().min(1, "A rua deve ser informada!"),
        number: z.string().min(1, "O número deve ser informado!"),
        city: z.string().min(1, "A cidade deve ser informada!"),
        state: z.string().min(1, "O estado deve ser informado!"),
        country: z.string().min(1, "O país deve ser informado!"),
        postalcode: z.string().min(1, "O código postal deve ser informado!"),
    }).optional(),
    tipo: z.enum(["Cliente", "Profissional"]).optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: "Nenhum campo foi enviado para atualização.",
});


export { userSchema, userUpdateSchema, loginSchema};