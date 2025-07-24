import 'zod-openapi/extend';
import * as z from "zod";


const userRole = z.enum(["Cliente", "Profissional"]);

const senhaInput = z
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .regex(/[a-zA-Z]/, "A senha deve conter ao menos uma letra")
    .regex(/[0-9]/, "A senha deve conter ao menos um número")
    .regex(/[\W_]/, "A senha deve conter ao menos um caractere especial (por exemplo, !, @, #, $, etc.)")
    .openapi({ description: "Senha do usuário (mínimo 6 caracteres, incluindo letras, números e caracteres especiais)", example: "andre#123" });

const location = z.object({
    street: z.string().min(1, "A rua deve ser informada!").openapi({ description: "Rua", example: "Rua Feliz" }),
    number: z.string().min(1, "O número deve ser informado!").openapi({ description: "Número da residência", example: "10" }),
    city: z.string().min(1, "A cidade deve ser informada!").openapi({ description: "Cidade", example: "São Paulo" }),
    state: z.string().min(1, "O estado deve ser informado!").openapi({ description: "Estado", example: "São Paulo" }),
    country: z.string().min(1, "O país deve ser informado!").openapi({ description: "País", example: "Brasil" }),
    postalcode: z.string().min(1, "O código postal deve ser informado!").openapi({ description: "CEP", example: "58900000" }),
}).openapi({ description: "Localização do usuário" });

const baseUserSchema = z.object({
    email: z
        .string()
        .email("E-mail inválido")
        .openapi({ description: "Email do usuário", example: "usuario@example.com" }),
    nome: z
        .string()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
        .max(100, "O nome pode ter no máximo 100 caracteres")
        .openapi({ description: "Nome do usuário", example: "Andre" }),
    senha: senhaInput,
    telefone: z
        .string()
        .regex(/^\d{10,15}$/, "O telefone deve conter entre 10 e 15 dígitos numéricos")
        .openapi({ description: "Número de telefone", example: "11999999999" }),
    location: location,
    tipo: userRole.openapi({ description: "Tipo de usuário", example: "Cliente" }),
})

const userSchema = baseUserSchema;

// const userSchema = z.object({
// }).refine((data) => !!data.location, {
//     message: "O atributo 'location' é obrigatorio!",
//     path: ["location"],
// });

const loginSchema = baseUserSchema.pick({
    email: true,
    senha: true
});

const userUpdateSchema = userSchema.partial().refine(data => Object.keys(data).length > 0, {
    message: "Nenhum campo foi enviado para atualização.",
});;


export { userSchema, userUpdateSchema, loginSchema };