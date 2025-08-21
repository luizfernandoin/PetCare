import 'zod-openapi/extend';
import * as z from "zod";
import { USER_ROLE } from '../enums';


const userRole = z.nativeEnum(USER_ROLE, { message: "Invalid user role" });

const passwordInput = z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(/[a-zA-Z]/, "Password must contain at least one letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character (e.g., !, @, #, $, etc.)")
    .openapi({
        description: "User password (minimum 6 characters, including letters, numbers, and special characters)",
        example: "andre#123"
    });

const locationSchema = z.object({
    street: z
        .string()
        .min(1, "Street is required")
        .openapi({
            description: "Street",
            example: "Happy Street"
        }),
    number: z
        .string()
        .min(1, "House number is required")
        .openapi({
            description: "House number",
            example: "10"
        }),

    city: z
        .string()
        .min(1, "City is required")
        .openapi({
            description: "City",
            example: "São Paulo"
        }),
    state: z
        .string()
        .min(1, "State is required")
        .openapi({
            description: "State",
            example: "São Paulo"
        }),
    country: z
        .string()
        .min(1, "Country is required")
        .openapi({
            description: "Country",
            example: "Brazil"
        }),
    postalcode: z
        .string()
        .min(1, "Postal code is required")
        .openapi({
            description: "ZIP code",
            example: "58900000"
        }),
}).openapi({ description: "User location information" });

const baseUserSchema = z.object({
    email: z
        .string()
        .email("Invalid email address")
        .openapi({ description: "User email", example: "user@example.com" }),
    name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .max(100, "Name can have up to 100 characters maximum")
        .openapi({ description: "User name", example: "Andre" }),
    password: passwordInput,
    phone: z
        .string()
        .regex(/^\d{10,15}$/, "Phone number must contain between 10 and 15 numeric digits")
        .openapi({ description: "Phone number", example: "11999999999" }),
    location: locationSchema,
    role: userRole.openapi({ description: "User type", example: USER_ROLE.CLIENT }),
})

const userSchema = baseUserSchema;

const loginSchema = baseUserSchema.pick({
    email: true,
    password: true
});

const userUpdateSchema = userSchema.partial().refine(data => Object.keys(data).length > 0, {
    message: "No fields were provided for update.",
});


export { userSchema, userUpdateSchema, loginSchema };