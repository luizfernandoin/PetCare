import { NextFunction, Router } from "express";
import authenticateToken from "../utils/middlewares/authenticateToken";
import typeUser from "../utils/middlewares/typeUser";
import UserService from "../service/userService";
import ServiceService from "../service/serviceService";
import ClinicService from "../service/clinicService";

import User from "../models/user";
import Service from "../models/service"
import Clinic from "../models/clinic";
import { validate, validateParams } from "../utils/middlewares/validate";
import { 
    urlParamsSchema, 
    serviceSchema 
} from "@petcare/shared";
import { USER_ROLE } from "@petcare/shared/src/enums";


const router = Router();
const userService = new UserService(User);
const serviceService = new ServiceService(Service);
const clinicService = new ClinicService(Clinic);


router.get("/", async (request, response, next: NextFunction) => {
    try {
        const services = await serviceService.get();
        
        response.status(200).json({ message: "Services retrieved successfully.", data: services });
    } catch (error) {
        next(error);
    }
});

router.get("/:clinicId/services", 
    validateParams(urlParamsSchema),
    async(request, response, next: NextFunction) => {
    const { clinicId } = request.params;
    
    try {
        const services = await serviceService.getServicesByClinicId(clinicId);

        response.status(200).json({ message: "Services retrieved successfully.", data: services });
    } catch (error) {
        next(error);
    }
})

router.post("/:clinicId/services", 
    validateParams(urlParamsSchema), validate(serviceSchema),
    authenticateToken, typeUser(USER_ROLE.PROFESSIONAL), async(request, response, next: NextFunction) => {
    try {
        const serviceDTO = request.body;
        const { clinicId } = request.params;

        const clinic = await clinicService.getClinicById(clinicId);
        const newService = await serviceService.createService(serviceDTO, clinic);

        response.status(201).json({ 
            message: `Service added to clinic ${clinic.name} successfully!`, 
            data: newService 
        });
    } catch (error) {
        next(error);
    }
});

export default router;