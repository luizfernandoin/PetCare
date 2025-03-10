import { Router, Request, Response, NextFunction } from "express";
import Agendamento from "../models/agendamento";
import AgendamentoService from "../service/AgendamentoService";
import authenticateToken from "../utils/middlewares/authenticateToken";
import UserService from "../service/userService";
import User from "../models/user";
import HttpError from "../utils/errors/HttpError";


const router = Router();
const agendamentoService = new AgendamentoService(Agendamento)
const userService = new UserService(User);

router.post("/:clinicaId/agendamentos", authenticateToken, async (request: Request, response: Response, next: NextFunction) => {
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
            next(new HttpError("Horário indisponível para agendamento.", 400));
        }

        const agendamento = await agendamentoService.criarAgendamento(agendamentoData);

        response.status(201).json({
            message: `Agendamento do pet ${agendamento.petId} realizado na clinia ${agendamento.clinicaId} com sucesso!`,
            data: agendamento,
        });
    } catch (error) {
        next(error);
    }
});

router.get("/", authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filtros = req.query;
        const agendamentos = await agendamentoService.listarAgendamentos(filtros);
        res.status(200).json(agendamentos);
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, dataAgendamento, clinicaId } = req.body;
        const resultado = await agendamentoService.deletarAgendamento(userId, dataAgendamento, clinicaId);
        res.status(200).json(resultado);
    } catch (error) {
        next(error);
    }
});


export default router;