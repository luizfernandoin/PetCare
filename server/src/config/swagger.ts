import { Express } from "express";
import { version } from "../../package.json";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentation API - PetCare+",
            version: version,
            description: "API documentation for PetCare+",
        }
    },
    apis: ["../routes/*.ts"],
}

const swaggerDocs = swaggerJSDoc(swaggerOptions);

function swaggerDocsSetup(app: Express, port: number) {
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