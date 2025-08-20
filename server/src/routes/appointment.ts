import { Router, Request, Response, NextFunction } from "express";
import Appointment from "../models/appointment";
import AppointmentService from "../service/appointmentService";
import authenticateToken from "../utils/middlewares/authenticateToken";
import UserService from "../service/userService";
import User from "../models/user";
import HttpError from "../utils/errors/HttpError";
import { validate, validateParams } from "../utils/middlewares/validate";
import { appointmentSchema, urlParamsSchema } from "@petcare/shared";


const router = Router();
const appointmentService = new AppointmentService(Appointment)
const userService = new UserService(User);


router.get("/:clinicId/appointments", 
    validateParams(urlParamsSchema), 
    async(request: Request, response: Response, next: NextFunction) => {
    const { clinicId } = request.params;

    try {
        const appointments = await appointmentService.getAppointmentsForClinicId(clinicId);

        response.status(201).json({
            message: `Agendamentos encontrados com sucesso!`,
            data: appointments,
        });
    } catch (error) {
        next(error);
    }
})

router.post("/:clinicId/appointments", 
    validateParams(urlParamsSchema), validate(appointmentSchema),
    authenticateToken, async (request: Request, response: Response, next: NextFunction) => {
    const { clinicId } = request.params;
    const { email } = request.user;
    const user = await userService.getUserByEmail(email);
    const agendamentoData = {
        ...request.body,
        clinicId,
        userId: user.id
    };

    if (!agendamentoData.petId || !agendamentoData.serviceId || !agendamentoData.appointmentDate ||
        !agendamentoData.startTime || !agendamentoData.endTime || !agendamentoData.status) {
        next(new HttpError("Todos os campos obrigatórios devem ser enviados.", 400));
    }

    try {
        const disponivel = await appointmentService.checkAvailability(agendamentoData);
        if (!disponivel) {
            return next(new HttpError("Horário indisponível para agendamento.", 400));
        }

        console.log("O HttpError não interrompeu!")
        const agendamento = await appointmentService.createAppointment(agendamentoData);

        response.status(201).json({
            message: `Agendamento do pet ${agendamento.petId} realizado na clinia ${agendamento.clinicId} com sucesso!`,
            data: agendamento,
        });
    } catch (error) {
        next(error);
    }
});


export default router;