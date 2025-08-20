import { ModelStatic, ValidationError, ValidationErrorItem } from "sequelize";
import Appointment from "../models/appointment";
import HttpError from "../utils/errors/HttpError";


class AppointmentService {
    private appointmentModel: ModelStatic<Appointment>;

    constructor(userModel: ModelStatic<Appointment>) {
        this.appointmentModel = userModel;
    }

    async getAppointmentsForClinicId(clinicId: string) {
        try {
            return await this.appointmentModel.findAll({
                where: { clinicId }
            })
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao buscar agendamentos.", 500, new Error(error.message))
            }

            throw new HttpError("Erro interno ao buscar agendamentos", 500)
        }
    }

    async getAppoimentsForDay(clinicId: string, date: Date) {
        console.log(clinicId, date);
        try {
            return await this.appointmentModel.findAll({
                where: {
                    clinicId,
                    dataAgendamento: date
                }
            })
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao buscar agendamentos.", 500, new Error(error.message))
            }

            throw new HttpError("Erro interno ao buscar agendamentos", 500)
        }
    }

    async checkAvailability(appointment: Appointment) {
        const { clinicId, serviceId, appointmentDate, startTime, endTime } = appointment;

        const appointmentsExisting = await this.getAppoimentsForDay(clinicId, new Date(appointmentDate));

        return !appointmentsExisting.some((appointment) => {
            return (
                (startTime >= appointment.startTime && startTime < appointment.endTime) ||
                (endTime > appointment.startTime && endTime <= appointment.endTime) ||
                (startTime <= appointment.startTime && endTime >= appointment.endTime)
            );
        });
    }

    async createAppointment(appointmentData: Appointment) {
        try {
            console.log(appointmentData);
            const { userId, petId, serviceId, clinicId, appointmentDate, startTime, endTime, status } = appointmentData;

            if (!userId || !petId || !serviceId || !clinicId || !appointmentDate || !startTime || !endTime || !status) {
                throw new Error("Todos os campos são obrigatórios.");
            }

            const appointment = await Appointment.create({
                userId,
                petId,
                serviceId,
                clinicId,
                appointmentDate,
                startTime,
                endTime,
                status,
            });

            return appointment;
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

    async listAppointments(filters: any) {
        const { clinicaId, userId, dataAgendamento } = filters;

        const where: any = {};
        if (clinicaId) where.clinicaId = clinicaId;
        if (userId) where.userId = userId;
        if (dataAgendamento) where.dataAgendamento = dataAgendamento;

        const appointment = await Appointment.findAll({
            where,
            include: ["User", "Pet", "Service", "Clinica"],
        });

        return appointment;
    }

    async deleteAppointment(appointmentId: string) {
        const appointment = await Appointment.findOne({
            where: { appointmentId }
        });

        if (!appointment) {
            throw new Error("Agendamento não encontrado.");
        }

        await appointment.destroy();
        return { message: "Agendamento deletado com sucesso." };
    }
}


export default AppointmentService;