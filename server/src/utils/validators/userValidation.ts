import 'zod-openapi/extend';
import { z } from "zod";


const userSchema = z.object({
    email: z
        .string()
        .email("E-mail inválido")
        .openapi({ description: "Email do usuário", example: "usuario@example.com" }),
    nome: z
        .string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .max(100, "O nome pode ter no máximo 100 caracteres")
        .openapi({ description: "Nome do usuário", example: "a" }),
    senha: z
        .string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .openapi({ description: "Senha do usuário (mínimo 6 caracteres)", example: "a" }),
    telefone: z
        .string()
        .regex(/^\d{10,15}$/, "O telefone deve conter entre 10 e 15 dígitos numéricos")
        .openapi({ description: "Número de telefone", example: "11999999999" }),
    location: z.object({
        street: z.string().min(1, "A rua deve ser informada!").openapi({ description: "Rua", example: "a" }),
        number: z.string().min(1, "O número deve ser informado!").openapi({ description: "Número da residência", example: "a" }),
        city: z.string().min(1, "A cidade deve ser informada!").openapi({ description: "Cidade", example: "a" }),
        state: z.string().min(1, "O estado deve ser informado!").openapi({ description: "Estado", example: "a" }),
        country: z.string().min(1, "O país deve ser informado!").openapi({ description: "País", example: "a" }),
        postalcode: z.string().min(1, "O código postal deve ser informado!").openapi({ description: "CEP", example: "a" }),
    }).optional().openapi({ description: "Localização do usuário" }),
    tipo: z.enum(["Cliente", "Profissional"]).refine(
        (value) => ["Cliente", "Profissional"].includes(value),
        {
            message: "Tipo deve ser 'Cliente' ou 'Profissional'",
        }
    ).openapi({ description: "Tipo de usuário", example: "Cliente" }),
}).refine((data) => !!data.location, {
    message: "O atributo 'location' é obrigatorio!",
    path: ["location"],
});

const loginSchema = z.object({
    email: z
        .string()
        .email("E-mail inválido")
        .openapi({ description: "Email do usuário", example: "usuario@example.com" }),
    senha: z
        .string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .regex(/[a-zA-Z]/, "A senha deve conter ao menos uma letra")
        .regex(/[0-9]/, "A senha deve conter ao menos um número")
        .regex(/[\W_]/, "A senha deve conter ao menos um caractere especial (por exemplo, !, @, #, $, etc.)")
        .openapi({ description: "Senha do usuário (mínimo 6 caracteres)", example: "a" }),
});

const userUpdateSchema = z.object({
    email: z
        .string()
        .email("E-mail inválido")
        .optional()
        .openapi({ description: "Email do usuário", example: "usuario@example.com" }),
    senha: z
        .string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .optional()
        .openapi({ description: "Senha do usuário (mínimo 6 caracteres)", example: "a" }),
    nome: z
        .string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .max(100, "O nome pode ter no máximo 100 caracteres")
        .optional()
        .openapi({ description: "Nome do usuário", example: "a" }),
    telefone: z
        .string()
        .regex(/^\d{10,15}$/, "O telefone deve conter entre 10 e 15 dígitos numéricos")
        .optional()
        .openapi({ description: "Número de telefone", example: "11999999999" }),
    location: z.object({
        street: z.string().min(1, "A rua deve ser informada!").openapi({ description: "Rua", example: "a" }),
        number: z.string().min(1, "O número deve ser informado!").openapi({ description: "Número da residência", example: "a" }),
        city: z.string().min(1, "A cidade deve ser informada!").openapi({ description: "Cidade", example: "a" }),
        state: z.string().min(1, "O estado deve ser informado!").openapi({ description: "Estado", example: "a" }),
        country: z.string().min(1, "O país deve ser informado!").openapi({ description: "País", example: "a" }),
        postalcode: z.string().min(1, "O código postal deve ser informado!").openapi({ description: "CEP", example: "a" }),
    }).optional().openapi({ description: "Localização do usuário" }),
    tipo: z.enum(["Cliente", "Profissional"]).optional().openapi({ description: "Tipo de usuário", example: "Cliente" }),
}).refine(data => Object.keys(data).length > 0, {
    message: "Nenhum campo foi enviado para atualização.",
});


export { userSchema, userUpdateSchema, loginSchema};