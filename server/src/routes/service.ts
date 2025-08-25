import { NextFunction, Router } from "express";
import authenticateToken from "../utils/middlewares/authenticateToken";
import typeUser from "../utils/middlewares/typeUser";
import UserService from "../service/userService";
import ServiceService from "../service/serviceService";
import ClinicService from "../service/clinicService";

import User from "../models/user";
import Service from "../models/service"
import Clinic from "../models/clinic";
import ClinicServiceModel from "src/models/clinic-service";
import { validate, validateParams } from "../utils/middlewares/validate";
import {
    urlParamsSchema,
    serviceSchema,
    ServiceCreate
} from "@petcare/shared";
import { USER_ROLE } from "@petcare/shared/src/enums";


const router = Router();
const userService = new UserService(User);
const serviceService = new ServiceService(Service, ClinicServiceModel);
const clinicService = new ClinicService(Clinic);


router.get("/", async (request, response, next: NextFunction) => {
    try {
        const services = await serviceService.get();

        response.status(200).json({ message: "Services retrieved successfully.", data: services });
    } catch (error) {
        next(error);
    }
});

router.get("/service/:serviceId",
    validateParams(urlParamsSchema),
    async (request, response, next: NextFunction) => {
        const { serviceId } = request.params;

        try {
            const service = await serviceService.getServiceById(serviceId);

            if (!service) {
                response.status(404).json({ message: "Service not found." });
                return;
            }

            response.status(200).json({ message: "Service retrieved successfully.", data: service });
        } catch (error) {
            next(error);
        }
    }
);


router.post("/",
    //validateParams(urlParamsSchema),
    validate(serviceSchema),
    authenticateToken, typeUser(USER_ROLE.PROFESSIONAL), async (request, response, next: NextFunction) => {
        try {
            //const { clinicId, serviceId } = request.params;

            const serviceDto: ServiceCreate = request.body;
            console.log(serviceDto);

            const newService = await serviceService.createService(serviceDto);

            response.status(201).json({
                message: `Service added to clinic ${newService.name} successfully!`,
                data: newService
            });
        } catch (error) {
            next(error);
        }
    });

router.get("/:clinicId/services",
    validateParams(urlParamsSchema),
    async (request, response, next: NextFunction) => {
        const { clinicId } = request.params;

        try {
            const services = await serviceService.getServicesByClinicId(clinicId);
            response.status(200).json({ message: "Services retrieved successfully.", data: services });
        } catch (error) {
            next(error);
        }
    }
);

router.post("/:clinicId/services/:serviceId",
    validateParams(urlParamsSchema),
    authenticateToken, typeUser(USER_ROLE.PROFESSIONAL), async (request, response, next: NextFunction) => {
        try {
            const { clinicId, serviceId } = request.params;

            const clinic = await clinicService.getClinicById(clinicId);
            const newService = await serviceService.createServiceForClinic(clinicId, serviceId);

            response.status(201).json({
                message: `Service added to clinic ${clinic.name} successfully!`,
                data: newService
            });
        } catch (error) {
            next(error);
        }
    });


export default router;