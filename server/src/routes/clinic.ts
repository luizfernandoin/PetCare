import { Router, Request, Response, NextFunction } from "express";
import ClinicService from "../service/clinicService";
import authenticateToken from "../utils/middlewares/authenticateToken";
import typeUser from "../utils/middlewares/typeUser.js";
import verifyOwnership from "../utils/middlewares/verifyOwnership";
import Clinic from "../models/clinic";
import UserService from "../service/userService";
import User from "../models/user";
import HttpError from "../utils/errors/HttpError";
import { STATUS_CODES } from "http";
import { validate, validateParams } from "../utils/middlewares/validate";
import { 
    clinicCreateSchema, 
    urlParamsSchema 
} from "@petcare/shared";
import GeocodingService from "../service/GeocodingService";


const router = Router();
const clinicService = new ClinicService(Clinic);
const userService = new UserService(User);
const geocodingService = new GeocodingService();


router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const clinicas = await clinicService.getAllClinics();
        
        response.status(200).json({
            message: "Clínicas encontradas com sucesso!",
            data: clinicas
        });
    } catch (error) {
        next(error);
    }
})

router.get("/nearby-clinics", authenticateToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userAuth = request.user;
        const { radius } = request.query;

        const user = await userService.getUserByEmail(userAuth.email);

        const distancia = parseFloat(radius as string) || 5000;
        const [longitude, latitude] = user.location.coordinates;

        const nearbyClinicas = await clinicService.getNearbyClinics(longitude, latitude, distancia);

        response.status(200).json(nearbyClinicas);
    } catch (error) {
        next(error);
    }
})

router.get('/:id/schedules', validateParams(urlParamsSchema), async(request: Request, response: Response, next: NextFunction) => {
    try {
        const { id: clinicaId } = request.params;

        const horarios = await clinicService.getSchedulesByClinicId(clinicaId);

        response.status(200).json({
            message: "Horários de atendimento encontrados com sucesso!",
            data: horarios,
        });
    } catch (error) {
        next(error);
    }
})

router.post("/:id/link-professional/:professionalId",
    validateParams(urlParamsSchema),
    authenticateToken, typeUser("Profissional"), verifyOwnership(clinicService),
    async(request: Request, response: Response, next: NextFunction) => {
        try {
            const { id: clinicaId, profissionalId } = request.params;

            const link = await clinicService.linkProfessional(clinicaId, profissionalId);

            response.status(201).json({
                message: "Profissional vinculado com sucesso à clínica.",
                link
            });
        } catch (error) {
            next(error);
        }
})

router.delete("/:id/unlink-professional/:professionalId",
    validateParams(urlParamsSchema), 
    authenticateToken, typeUser("Profissional"), verifyOwnership(clinicService), 
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { id: clinicaId, profissionalId } = request.params;

            const result = await clinicService.unlinkProfessional(clinicaId, profissionalId);

            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validate(clinicCreateSchema),
    authenticateToken, typeUser("Profissional"), async(request: Request, response: Response, next: NextFunction) => {
    try {
        const { name, phone, location } = request.body;
        const { lat, lon } = await geocodingService.getCoordinates(location);
        
        const clinicaToSave = {
            name,
            phone,
            location: {
                type: "Point",
                coordinates: [lon, lat] as [number, number],
            },
        };

        const user = await userService.getUserByEmail(request.user.email);
        const clinic = await clinicService.createClinic(clinicaToSave, user);

        response.status(201).json({ 
            message: `Clínica ${clinic.name} criada e associada ao usuário ${user.name} com sucesso!`, 
            data: clinic 
        });
    } catch (error) {
        next(error);
    };
});

router.post('/:id/schedules',
    validateParams(urlParamsSchema),
    authenticateToken, typeUser("Profissional"), async(request: Request, response: Response, next: NextFunction) => {
    try {
        const { id: clinicId } = request.params;
        const { email } = request.user;
        const horarioData = { ...request.body, clinicId };

        const user = await userService.getUserByEmail(email);
        const horarios = await clinicService.addSchedules(horarioData, user);

        response.status(201).json({
            message: "Horários de atendimento adicionados com sucesso!",
            data: horarios,
        });
    } catch (error) {
        next(error);
    }
})

router.delete("/:id", authenticateToken, validateParams(urlParamsSchema), typeUser("Profissional"), verifyOwnership(clinicService), async(request: Request, response: Response, next: NextFunction) => {
    const clinicId = request.params.id;
    const { email } = request.user;

    try {
        const user = await userService.getUserByEmail(email);
        const clinic = await clinicService.deleteClinic(clinicId, user);

        response.status(200).json({
            message: `Clinica ${clinic.name} deletada com sucesso.`,
            data: clinic
        });
    } catch (error) {
        next(error);
    }
})

export default router;
