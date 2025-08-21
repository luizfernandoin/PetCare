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
import { USER_ROLE } from "@petcare/shared/src/enums";


const router = Router();
const clinicService = new ClinicService(Clinic);
const userService = new UserService(User);
const geocodingService = new GeocodingService();


router.get("/", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const clinics = await clinicService.getAllClinics();
        
        response.status(200).json({
            message: "Clinics retrieved successfully!",
            data: clinics
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

        const distance = parseFloat(radius as string) || 5000;
        const [longitude, latitude] = user.location.coordinates;

        const nearbyClinics = await clinicService.getNearbyClinics(longitude, latitude, distance);

        response.status(200).json(nearbyClinics);
    } catch (error) {
        next(error);
    }
})

router.get('/:id/schedules', validateParams(urlParamsSchema), async(request: Request, response: Response, next: NextFunction) => {
    try {
        const { id: clinicId } = request.params;

        const schedules = await clinicService.getSchedulesByClinicId(clinicId);

        response.status(200).json({
            message: "Schedules retrieved successfully!",
            data: schedules,
        });
    } catch (error) {
        next(error);
    }
})

router.post("/:id/link-professional/:professionalId",
    validateParams(urlParamsSchema),
    authenticateToken, typeUser(USER_ROLE.PROFESSIONAL), verifyOwnership(clinicService),
    async(request: Request, response: Response, next: NextFunction) => {
        try {
            const { id: clinicId, professionalId } = request.params;

            const link = await clinicService.linkProfessional(clinicId, professionalId);

            response.status(201).json({
                message: "Professional linked to clinic successfully.",
                link
            });
        } catch (error) {
            next(error);
        }
})

router.delete("/:id/unlink-professional/:professionalId",
    validateParams(urlParamsSchema), 
    authenticateToken, typeUser(USER_ROLE.PROFESSIONAL), verifyOwnership(clinicService), 
    async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { id: clinicId, professionalId } = request.params;

            const result = await clinicService.unlinkProfessional(clinicId, professionalId);

            response.status(200).json(result);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    validate(clinicCreateSchema),
    authenticateToken, typeUser(USER_ROLE.PROFESSIONAL), async(request: Request, response: Response, next: NextFunction) => {
    try {
        const { name, phone, location } = request.body;
        const { lat, lon } = await geocodingService.getCoordinates(location);
        
        const clinicToSave = {
            name,
            phone,
            location: {
                type: "Point",
                coordinates: [lon, lat] as [number, number],
            },
        };

        const user = await userService.getUserByEmail(request.user.email);
        const clinic = await clinicService.createClinic(clinicToSave, user);

        response.status(201).json({ 
            message: `Clinic ${clinic.name} created and associated with user ${user.name} successfully!`, 
            data: clinic 
        });
    } catch (error) {
        next(error);
    };
});

router.post('/:id/schedules',
    validateParams(urlParamsSchema),
    authenticateToken, typeUser(USER_ROLE.PROFESSIONAL), async(request: Request, response: Response, next: NextFunction) => {
    try {
        const { id: clinicId } = request.params;
        const { email } = request.user;
        const schedulesData = { ...request.body, clinicId };

        const user = await userService.getUserByEmail(email);
        const schedules = await clinicService.addSchedules(schedulesData, user);

        response.status(201).json({
            message: "Schedules added successfully!",
            data: schedules,
        });
    } catch (error) {
        next(error);
    }
})

router.delete("/:id", authenticateToken, validateParams(urlParamsSchema), typeUser(USER_ROLE.PROFESSIONAL), verifyOwnership(clinicService), async(request: Request, response: Response, next: NextFunction) => {
    const clinicId = request.params.id;
    const { email } = request.user;

    try {
        const user = await userService.getUserByEmail(email);
        const clinic = await clinicService.deleteClinic(clinicId, user);

        response.status(200).json({
            message: `Clinic ${clinic.name} deleted successfully.`,
            data: clinic
        });
    } catch (error) {
        next(error);
    }
})

export default router;
