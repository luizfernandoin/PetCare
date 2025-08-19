import { Router, Request, Response, NextFunction } from "express";
import Scheduling from "../models/scheduling";
import SchedulingService from "../service/schedulingService";
import authenticateToken from "../utils/middlewares/authenticateToken";
import UserService from "../service/userService";
import User from "../models/user";
import HttpError from "../utils/errors/HttpError";
import { validate, validateParams } from "../utils/middlewares/validate";
import { schedulingSchema, urlParamsSchema } from "@petcare/shared";


const router = Router();
const agendamentoService = new SchedulingService(Scheduling)
const userService = new UserService(User);


router.get("/:clinicaId/agendamentos", 
    validateParams(urlParamsSchema), 
    async(request: Request, response: Response, next: NextFunction) => {
    const { clinicaId } = request.params;

    try {
        const agendamentos = await agendamentoService.getAgenamentosForClinicaId(clinicaId);

        response.status(201).json({
            message: `Agendamentos encontrados com sucesso!`,
            data: agendamentos,
        });
    } catch (error) {
        next(error);
    }
})

router.post("/:clinicaId/agendamentos", 
    validateParams(urlParamsSchema), validate(schedulingSchema),
    authenticateToken, async (request: Request, response: Response, next: NextFunction) => {
    const { clinicaId } = request.params;
    const { email } = request.user;
    const user = await userService.getUserByEmail(email);
    const agendamentoData = {
        ...request.body,
        clinicaId,
        userId: user.id
    };

    if (!agendamentoData.petId || !agendamentoData.serviceId || !agendamentoData.dataAgendamento ||
        !agendamentoData.horaInicio || !agendamentoData.horaFim || !agendamentoData.status) {
        next(new HttpError("Todos os campos obrigatórios devem ser enviados.", 400));
    }

    try {
        const disponivel = await agendamentoService.verificarDisponibilidade(agendamentoData);
        if (!disponivel) {
            return next(new HttpError("Horário indisponível para agendamento.", 400));
        }

        console.log("O HttpError não interrompeu!")
        const agendamento = await agendamentoService.criarAgendamento(agendamentoData);

        response.status(201).json({
            message: `Agendamento do pet ${agendamento.petId} realizado na clinia ${agendamento.clinicId} com sucesso!`,
            data: agendamento,
        });
    } catch (error) {
        next(error);
    }
});


export default router;