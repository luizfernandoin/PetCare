import { NextFunction, Router } from "express";
import authenticateToken from "../utils/middlewares/authenticateToken";
import typeUser from "../utils/middlewares/typeUser";
import UserService from "../service/userService";
import ServiceService from "../service/serviceService";
import ClinicaService from "../service/clinicService";

import User from "../models/user";
import Service from "../models/service"
import Clinica from "../models/clinic";
import { validate, validateParams } from "../utils/middlewares/validate";
import { 
    urlParamsSchema, 
    serviceSchema 
} from "@petcare/shared";


const router = Router();
const userService = new UserService(User);
const serviceService = new ServiceService(Service);
const clinicaService = new ClinicaService(Clinica);


router.get("/:clinicaId/services", 
    validateParams(urlParamsSchema),
    async(request, response, next: NextFunction) => {
    const { clinicaId } = request.params;
    
    try {
        const services = await serviceService.getServicesByClinicaId(clinicaId);

        response.status(200).json({ message: "Serviços encontrados com sucesso.", data: services });
    } catch (error) {
        next(error);
    }
})

router.post("/:clinicaId/services", 
    validateParams(urlParamsSchema), validate(serviceSchema),
    authenticateToken, typeUser("Profissional"), async(request, response, next: NextFunction) => {
    try {
        const serviceDTO = request.body;
        const { clinicaId } = request.params;

        const clinica = await clinicaService.getClinicaById(clinicaId);
        const newService = await serviceService.createService(serviceDTO, clinica);

        response.status(201).json({ 
            message: `Serviço adicionado a clinica ${clinica.name} com sucesso!`, 
            data: newService 
        });
    } catch (error) {
        next(error);
    }
});

export default router;