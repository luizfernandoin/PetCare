import { Router, Request, Response, NextFunction } from "express";
import ClinicaService from "../service/clinicaService";
import authenticateToken from "../utils/middlewares/authenticateToken";
import typeUser from "../utils/middlewares/typeUser.js";
import verifyOwnership from "../utils/middlewares/verifyOwnership";
import Clinica from "../models/clinica";
import UserService from "../service/userService";
import User from "../models/user";
import HttpError from "../utils/errors/HttpError";
import { STATUS_CODES } from "http";
import { validate, validateParams } from "../utils/middlewares/validate";
import { clinicaCreateSchema } from "../utils/validators/clinicaValidation";
import GeocodingService from "../service/GeocodingService";
import { urlParamsSchema } from "../utils/validators/paramsValidation";

const router = Router();
const clinicaService = new ClinicaService(Clinica);
const userService = new UserService(User);
const geocodingService = new GeocodingService();


router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const clinicas = await clinicaService.getAllClinicas();
        
        response.status(200).json({
            message: "Clínicas encontradas com sucesso!",
            data: clinicas
        });
    } catch (error) {
        next(error);
    }
})

router.get("/clinicas-proximas", authenticateToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userAuth = request.user;
        const { radius } = request.query;

        const user = await userService.getUserByEmail(userAuth.email);

        const distancia = parseFloat(radius as string) || 5000;
        const [longitude, latitude] = user.location.coordinates;

        const nearbyClinicas = await clinicaService.getNearbyClinicas(longitude, latitude, distancia);

        response.status(200).json(nearbyClinicas);
    } catch (error) {
        next(error);
    }
})

router.get('/:id/horarios', validateParams(urlParamsSchema), async(request: Request, response: Response, next: NextFunction) => {
    try {
        const { id: clinicaId } = request.params;

        const horarios = await clinicaService.getHorariosByClinicaId(clinicaId);

        response.status(200).json({
            message: "Horários de atendimento encontrados com sucesso!",
            data: horarios,
        });
    } catch (error) {
        next(error);
    }
})

router.post("/:id/vincular-profissional/:profissionalId",
    validateParams(urlParamsSchema),
    authenticateToken, typeUser("Profissional"), verifyOwnership(clinicaService),
    async(request: Request, response: Response, next: NextFunction) => {
        try {
            const { id: clinicaId, profissionalId } = request.params;

            const vinculo = await clinicaService.vincularProfissional(clinicaId, profissionalId);

            response.status(201).json({
                message: "Profissional vinculado com sucesso à clínica.",
                vinculo
            });
        } catch (error) {
            next(error);
        }
})

router.delete("/:id/desvincular-profissional/:profissionalId",
    validateParams(urlParamsSchema), 
    authenticateToken, typeUser("Profissional"), verifyOwnership(clinicaService), 
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { id: clinicaId, profissionalId } = request.params;

            const resultado = await clinicaService.desvincularProfissional(clinicaId, profissionalId);

            response.status(200).json(resultado);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validate(clinicaCreateSchema),
    authenticateToken, typeUser("Profissional"), async(request: Request, response: Response, next: NextFunction) => {
    try {
        const { nome, telefone, location } = request.body;
        const { lat, lon } = await geocodingService.getCoordinates(location);
        
        const clinicaToSave = {
            nome,
            telefone,
            location: {
                type: "Point",
                coordinates: [lon, lat] as [number, number],
            },
        };

        const user = await userService.getUserByEmail(request.user.email);
        const clinica = await clinicaService.createClinica(clinicaToSave, user);

        response.status(201).json({ 
            message: `Clínica ${clinica.nome} criada e associada ao usuário ${user.nome} com sucesso!`, 
            data: clinica 
        });
    } catch (error) {
        next(error);
    };
});

router.post('/:id/horarios',
    validateParams(urlParamsSchema),
    authenticateToken, typeUser("Profissional"), async(request: Request, response: Response, next: NextFunction) => {
    try {
        const { id: clinicaId } = request.params;
        const { email } = request.user;
        const horarioData = { ...request.body, clinicaId };

        const user = await userService.getUserByEmail(email);
        const horarios = await clinicaService.addHorarios(horarioData, user);

        response.status(201).json({
            message: "Horários de atendimento adicionados com sucesso!",
            data: horarios,
        });
    } catch (error) {
        next(error);
    }
})

router.delete("/:id", authenticateToken, validateParams(urlParamsSchema), typeUser("Profissional"), verifyOwnership(clinicaService), async(request: Request, response: Response, next: NextFunction) => {
    const clinicaId = request.params.id;
    const { email } = request.user;

    try {
        const user = await userService.getUserByEmail(email);
        const clinica = await clinicaService.deleteClinica(clinicaId, user);

        response.status(200).json({
            message: `Clinica ${clinica.nome} deletada com sucesso.`,
            data: clinica
        });
    } catch (error) {
        next(error);
    }
})

export default router;
