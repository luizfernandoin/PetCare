import { Router, Request, Response } from "express";
import { clinica, user } from "../models/index";
import Clinica from "../service/clinica";
import authenticateToken from "../utils/middlewares/authenticateToken";
import typeUser from "../utils/middlewares/typeUser.js";
import User from "../service/user";
import verifyOwnership from "../utils/middlewares/verifyOwnership";

const router = Router();
const clinicaService = new Clinica(clinica);
const userService = new User(user);


router.get("/api/clinicas", async (request: Request, response: Response) => {
    const clinicas = await clinicaService.getAllClinicas();
    
    if (clinicas.error) {
        response.status(clinicas.status).json({
            message: clinicas.message,
            error: clinicas.error,
        });
    }

    response.status(clinicas.status).json({
        message: clinicas.message,
        data: clinicas.data,
    });
})

router.post('/api/clinicas', authenticateToken, typeUser("Profissional"), async(request, response) => {
    const user = await userService.getUserByEmail(request.user.email);
    const clinica = await clinicaService.createClinica(request.body, user);
    
    if (!clinica) {
        response.status(500).json({
            message: "Erro interno: resultado indefinido.",
        });
    }

    response.status(clinica.status).json({
        message: clinica.message,
        data: clinica.data,
        errors: clinica.errors,
    });
});

router.delete("/api/clinicas/:id", authenticateToken, typeUser("Profissional"), verifyOwnership(clinicaService), async(request, response) => {
    const user = await userService.getUserByEmail(request.user.email);
    const clinicaId = request.params.id;

    try {
        const result = await clinicaService.deleteClinica(clinicaId, user);

        response.status(result.status).json({
            message: result.message,
            ...(result.status === 200 && { data: result.data })
        });
    } catch (error) {
        response.status(500).json({
            message: 'Erro interno ao tentar deletar a clínica.',
            error: error.message
        });
    }

})

export default router;
