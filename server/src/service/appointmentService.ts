import { ModelStatic, ValidationError, ValidationErrorItem } from "sequelize";
import Appointment from "../models/appointment";
import HttpError from "../utils/errors/HttpError";
import Pet from "src/models/pet";
import Service from "src/models/service";
import Clinic from "src/models/clinic";


class AppointmentService {
    private appointmentModel: ModelStatic<Appointment>;

    constructor(appointmentModel: ModelStatic<Appointment>) {
        this.appointmentModel = appointmentModel;
    }

    async getAppointmentById(appointmentId: string) {
        try {
            const appointment = await this.appointmentModel.findOne({
                where: { id: appointmentId }
            });
            if (!appointment) {
                throw new HttpError("Agendamento não encontrado.", 404);
            }
            return appointment;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao buscar agendamento.", 500, new Error(error.message))
            }
            throw new HttpError("Erro interno ao buscar agendamento", 500)
        }
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
        try {
            return await this.appointmentModel.findAll({
                where: {
                    clinicId,
                    appointmentDate: date
                }
            })
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao buscar agendamentos.", 500, new Error(error.message))
            }

            throw new HttpError("Erro interno ao buscar agendamentos", 500)
        }
    }

    async getAppointmentsByUserId(userId: string) {
        try {
            const appointments = await this.appointmentModel.findAll({
                where: { userId },
                order: [['appointmentDate', 'DESC'], ['startTime', 'DESC']],
                include: [
                    {
                        model: Pet,
                        as: 'pet'
                    },
                    {
                        model: Service,
                        as: 'service'
                    },
                    {
                        model: Clinic,
                        as: 'clinic'
                    }
                ]
            })

            return appointments;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao buscar agendamentos.", 500, new Error(error.message));
            }

            throw new HttpError("Erro interno ao buscar agendamentos", 500);
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
        const { clinicId, userId, appointmentDate } = filters;

        const where: any = {};
        if (clinicId) where.clinicId = clinicId;
        if (userId) where.userId = userId;
        if (appointmentDate) where.appointmentDate = appointmentDate;

        const appointment = await Appointment.findAll({
            where,
            include: ["User", "Pet", "Service", "Clinic"],
        });

        return appointment;
    }

    async deleteAppointment(appointmentId: string) {
        const appointment = await Appointment.findOne({
            where: { id: appointmentId }
        });

        if (!appointment) {
            throw new Error("Agendamento não encontrado.");
        }

        await appointment.destroy();
        return { message: "Agendamento deletado com sucesso." };
    }
}


export default AppointmentService;