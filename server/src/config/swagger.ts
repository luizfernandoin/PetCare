import { Express } from "express";
import { version } from "../../package.json";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
import { createSchema } from "zod-openapi";
import { loginSchema, userSchema, userUpdateSchema } from "../utils/validators/userValidation";
import { z } from "zod";
import { agendamentoSchema } from "../utils/validators/agendamentoValidation";
import { clinicaCreateSchema } from "../utils/validators/clinicaValidation";
import { petCreateSchema, petUpdateSchema } from "../utils/validators/petValidation";
import { reviewSchema } from "../utils/validators/reviewValidation";
import { serviceSchema } from "../utils/validators/serviceValidation";
import { horarioSchema } from "../utils/validators/horarioValidation";


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentation API - PetCare+",
            version: "1.0.0",
            description: "API documentation for PetCare+",
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
            schemas: {
                User: createSchema(userSchema).schema,
                UserUpdate: createSchema(userUpdateSchema).schema,
                Login: createSchema(loginSchema).schema,
                Agendamento: createSchema(agendamentoSchema).schema,
                Clinica: createSchema(clinicaCreateSchema).schema,
                Horarios: createSchema(horarioSchema).schema,
                Pet: createSchema(petCreateSchema).schema,
                PetUpdate: createSchema(petUpdateSchema).schema,
                Review: createSchema(reviewSchema).schema,
                Service: createSchema(serviceSchema).schema,
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/docs/*.ts"],
};


const swaggerDocs = swaggerJSDoc(swaggerOptions);

function swaggerDocsSetup(app: Express, port: number | string) {
    app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocs, {
        explorer: true,
        swaggerOptions: {
            url: `http://localhost:${port}/api-docs.json`,
        },
    }));

    app.get("/api-docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerDocs);
    });

    console.log(`Swagger UI is running on http://localhost:${port}/api-docs`);
}


export default swaggerDocsSetup;