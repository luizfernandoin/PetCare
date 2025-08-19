import { ModelStatic, ValidationError, ValidationErrorItem } from "sequelize";
import Scheduling from "../models/scheduling";
import HttpError from "../utils/errors/HttpError";


class SchedulingService {
    private agendamentoModel: ModelStatic<Scheduling>;

    constructor(userModel: ModelStatic<Scheduling>) {
        this.agendamentoModel = userModel;
    }

    async getAgenamentosForClinicaId(clinicaId: string) {
        try {
            return await this.agendamentoModel.findAll({
                where: { clinicaId }
            })
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao buscar agendamentos.", 500, new Error(error.message))
            }

            throw new HttpError("Erro interno ao buscar agendamentos", 500)
        }
    }

    async getAgengamentosForDay(clinicaId: string, data: Date) {
        console.log(clinicaId, data);
        try {
            return await this.agendamentoModel.findAll({
                where: {
                    clinicaId,
                    dataAgendamento: data
                }
            })
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao buscar agendamentos.", 500, new Error(error.message))
            }

            throw new HttpError("Erro interno ao buscar agendamentos", 500)
        }
    }

    async verificarDisponibilidade(agendamentoData: Scheduling) {
        const { clinicId, serviceId, scheduledDate, startTime, endTime } = agendamentoData;

        const agendamentosExistentes = await this.getAgengamentosForDay(clinicId, new Date(scheduledDate));

        return !agendamentosExistentes.some((agendamento) => {
            return (
                (startTime >= agendamento.startTime && startTime < agendamento.endTime) ||
                (endTime > agendamento.startTime && endTime <= agendamento.endTime) ||
                (startTime <= agendamento.startTime && endTime >= agendamento.endTime)
            );
        });
    }

    async criarAgendamento(agendamentoDTO: Scheduling) {
        try {
            console.log(agendamentoDTO);
            const { userId, petId, serviceId, clinicId, scheduledDate, startTime, endTime, status } = agendamentoDTO;

            if (!userId || !petId || !serviceId || !clinicId || !scheduledDate || !startTime || !endTime || !status) {
                throw new Error("Todos os campos são obrigatórios.");
            }

            const agendamento = await Scheduling.create({
                userId,
                petId,
                serviceId,
                clinicId,
                scheduledDate,
                startTime,
                endTime,
                status,
            });

            return agendamento;
        } catch (error) {
            if (error instanceof ValidationError) {
                const errors = error.errors.map((err: ValidationErrorItem) => err.message);
                throw new HttpError(
                    `Erro de validação: ${errors.join(", ")}`,
                    400
                );
            }

            throw new HttpError("Erro interno ao agendar serviço.", 500);
        }
    }

    async listarAgendamentos(filtros: any) {
        const { clinicaId, userId, dataAgendamento } = filtros;

        const where: any = {};
        if (clinicaId) where.clinicaId = clinicaId;
        if (userId) where.userId = userId;
        if (dataAgendamento) where.dataAgendamento = dataAgendamento;

        const agendamentos = await Scheduling.findAll({
            where,
            include: ["User", "Pet", "Service", "Clinica"],
        });

        return agendamentos;
    }

    async deletarAgendamento(agendamentoId: string) {
        const agendamento = await Scheduling.findOne({
            where: { agendamentoId }
        });

        if (!agendamento) {
            throw new Error("Agendamento não encontrado.");
        }

        await agendamento.destroy();
        return { message: "Agendamento deletado com sucesso." };
    }
}


export default SchedulingService;