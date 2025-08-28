import { z } from "zod";

const urlParamsSchema = z.object({
    id: z.string().uuid("ID must be a valid UUID").optional(),
    clinicId: z.string().uuid("Clinic ID must be a valid UUID").optional(),
    petId: z.string().uuid("Pet ID must be a valid UUID").optional(),
    professionalId: z.string().uuid("Professional ID must be a valid UUID").optional(),
    serviceId: z.string().uuid("Service ID must be a valid UUID").optional(),
});

export { urlParamsSchema };
