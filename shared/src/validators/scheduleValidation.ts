import 'zod-openapi/extend';
import { z } from "zod";

const scheduleSchema = z.object({
    clinicId: z
        .string()
        .uuid("Invalid clinic ID")
        .openapi({
            description: "ID of the clinic associated with the schedule",
            example: "a12b3c4d-e5f6-7890-ab12-c3d4e5f67890",
        }),
    day: z
        .string()
        .openapi({
            description: "Day of the week for this schedule",
            example: "Monday",
        }),
    startTime: z
        .string()
        .regex(/^\d{2}:\d{2}$/, "Start time must be in HH:mm format")
        .openapi({
            description: "Start time of the schedule",
            example: "08:00",
        }),
    endTime: z
        .string()
        .regex(/^\d{2}:\d{2}$/, "End time must be in HH:mm format")
        .openapi({
            description: "End time of the schedule",
            example: "18:00",
        }),
}).openapi({
    title: "Schedule Schema",
    description: "Schema defining clinic schedule hours",
});

export { scheduleSchema };
