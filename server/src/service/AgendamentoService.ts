import { ModelStatic, ValidationError, ValidationErrorItem } from "sequelize";
import Agendamento from "../models/agendamento";
import HttpError from "../utils/errors/HttpError";


class AgendamentoService {
    private agendamentoModel: ModelStatic<Agendamento>;

    constructor(userModel: ModelStatic<Agendamento>) {
        this.agendamentoModel = userModel;
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

    async verificarDisponibilidade(agendamentoData: Agendamento) {
        const { clinicaId, serviceId, dataAgendamento, horaInicio, horaFim } = agendamentoData;

        const agendamentosExistentes = await this.getAgengamentosForDay(clinicaId, new Date(dataAgendamento));

        return !agendamentosExistentes.some((agendamento) => {
            return (
                (horaInicio >= agendamento.horaInicio && horaInicio < agendamento.horaFim) ||
                (horaFim > agendamento.horaInicio && horaFim <= agendamento.horaFim) ||
                (horaInicio <= agendamento.horaInicio && horaFim >= agendamento.horaFim)
            );
        });
    }

    async criarAgendamento(agendamentoDTO: Agendamento) {
        try {
            console.log(agendamentoDTO);
            const { userId, petId, serviceId, clinicaId, dataAgendamento, horaInicio, horaFim, status } = agendamentoDTO;

            if (!userId || !petId || !serviceId || !clinicaId || !dataAgendamento || !horaInicio || !horaFim || !status) {
                throw new Error("Todos os campos são obrigatórios.");
            }

            const agendamento = await Agendamento.create({
                userId,
                petId,
                serviceId,
                clinicaId,
                dataAgendamento,
                horaInicio,
                horaFim,
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

        const agendamentos = await Agendamento.findAll({
            where,
            include: ["User", "Pet", "Service", "Clinica"],
        });

        return agendamentos;
    }

    async deletarAgendamento(agendamentoId: string) {
        const agendamento = await Agendamento.findOne({
            where: { agendamentoId }
        });

        if (!agendamento) {
            throw new Error("Agendamento não encontrado.");
        }

        await agendamento.destroy();
        return { message: "Agendamento deletado com sucesso." };
    }
}


export default AgendamentoService;