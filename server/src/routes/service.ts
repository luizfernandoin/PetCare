import { Router } from "express";
import authenticateToken from "../utils/middlewares/authenticateToken";
import typeUser from "../utils/middlewares/typeUser";
import { user, service, clinica } from "../models/index";
import User from "../service/user";
import Service from "../service/service"
import Clinica from "../service/clinica";

const router = Router();
const userService = new User(user);
const serviceService = new Service(service);
const clinicaService = new Clinica(clinica);

router.post("/api/:clinicaId/services", authenticateToken, typeUser("Profissional"), async(request, response) => {
    try {
        const { clinicaId } = request.params;

        const clinica = await clinicaService.getClinicaById(clinicaId);
        if (!clinica) {
            response.status(404).json({ message: "Clínica não encontrada." });
        }

        const resultService = await serviceService.createService(request.body, clinica);
        if (!resultService) {
            response.status(500).json({
                message: "Erro interno: resultado indefinido.",
            });
        }

        response.status(resultService.status).json({
            message: resultService.message,
            data: resultService.data,
            errors: resultService.errors,
        });
    } catch (error) {
        console.error("Erro interno na rota:", error);
        response.status(500).json({
            message: "Erro interno ao processar a solicitação.",
            error: error.message,
        });
    }
})

router.get("/api/:clinicaId/services", async(request, response) => {
    const { clinicaId } = request.params;
    const services = await serviceService.getServicesByClinicaId(clinicaId);

    if (services.error) {
        response.status(services.status).json({
            message: services.message,
            error: services.error,
        });
    }

    response.status(services.status).json({
        message: services.message,
        data: services.data,
    });
})

export default router;