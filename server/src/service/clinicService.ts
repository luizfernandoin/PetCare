import { ModelStatic, Sequelize, ValidationError, ValidationErrorItem } from "sequelize";
import Clinic from "../models/clinic";
import Employee from "../models/employee";
import Schedule from "../models/schedule";
import HttpError from "../utils/errors/HttpError";
import User from "../models/user";
import { UUID } from "crypto";

interface scheduleType {
    dia: string,
    horaInicio: string,
    horaFim: string
}

interface schedulesDTO {
    clinicId: string,
    schedules: scheduleType
}


class ClinicService {
    private clinicModel: ModelStatic<Clinic>;

    constructor(clinicModel: ModelStatic<Clinic>) {
        this.clinicModel = clinicModel;
    }

    async getOwnerId(clinicId: string) {
        try {
            const ownerRecord = await Employee.findOne({
                where: { clinicId: clinicId },
            });

            if (!ownerRecord) {
                throw new HttpError("Proprietário não encontrado para esta clínica!", 404);
            }

            return ownerRecord.userId as string;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError(error.message, 500);
            };

            throw new HttpError("Erro interno ao buscar proprietário da clínica.", 500);
        }
    }

    async getElementById(clinicId: string) {
        try {
            const clinica = await this.clinicModel.findByPk(clinicId);

            if (!clinica) {
                throw new HttpError("Clínica não encontrada!", 404);
            }

            return clinica;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError(error.message, 500);
            };

            throw new HttpError("Erro interno ao buscar clínica.", 500);
        }
    }

    async getAllClinics() {
        try {
            const clinicas = await this.clinicModel.findAll();

            return clinicas;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError(error.message, 500);
            };

            throw new HttpError("Erro interno ao buscar clínicas.", 500);
        }
    }

    async getClinicById(clinicId: string) {
        try {
            const clinica = await this.clinicModel.findByPk(clinicId);

            if (!clinica) {
                throw new HttpError("Clinica não encontrada!", 404);
            }

            return clinica;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao buscar clinica", 500, new Error(error.message))
            }

            throw new HttpError("Erro interno ao buscar clinica", 500)
        }
    }

    async getNearbyClinics(longitude: number, latitude: number, distance: number) {
        console.log(longitude, latitude);
        return await Clinic.findAll({
            where: Sequelize.where(
                Sequelize.fn(
                    'ST_DWithin',
                    Sequelize.col('location'),
                    Sequelize.fn('ST_SetSRID', Sequelize.fn('ST_MakePoint', longitude, latitude), 4326),
                    distance / 111
                ),
                true
            )
        });
    };

    async getSchedulesByClinicId(clinicId: string) {
        try {
            const horarios = await Schedule.findAll({
                where: { clinicId },
                order: [["dia", "ASC"], ["horaInicio", "ASC"]]
            })

            return horarios;
        } catch(error) {
            throw new HttpError("Erro ao buscar horários.", 500);
        }
    }

    async createClinic(clinicDTO: Partial<Clinic>, user: any) {
        try {
            const newClinica = await this.clinicModel.create(clinicDTO);
            await user.addClinica(newClinica);

            return newClinica;
        } catch (error) {
            if (error instanceof ValidationError) {
                const errors = error.errors.map((err: ValidationErrorItem) => err.message);
                throw new HttpError(
                    `Erro de validação`,
                    400,
                    new Error(errors.join(", "))
                );
            }

            throw new HttpError("Erro interno ao criar usuário.", 500);
        }
    }

    async linkProfessional(clinicId: string, professionalId: string) {
        try {
            if (!clinicId || !professionalId) {
                throw new HttpError('ClinicId e ProfissionalId são obrigatórios.', 400);
            }

            const existeVinculo = await Employee.findOne({
                where: { clinicId, userId: professionalId }
            });

            if (existeVinculo) {
                throw new HttpError('O profissional já está vinculado a esta clínica.', 409);
            }

            const vinculo = await Employee.create({ clinicId, userId: professionalId });

            return vinculo;
        } catch (error) {
            console.error('Erro ao vincular profissional:', error);

            throw error instanceof HttpError
                ? error
                : new HttpError('Erro interno ao vincular profissional.', 500);
        }
    }

    async unlinkProfessional(clinicId: string, professionalId: string) {
        try {
            if (!clinicId || !professionalId) throw new HttpError('ClinicId e ProfissionalId são obrigatórios.', 400);

            const vinculo = await Employee.findOne({
                where: { clinicId, userId: professionalId }
            });
    
            if (!vinculo) {
                throw new HttpError('O profissional não está vinculado a esta clínica.', 404);
            }

            const profissionaisVinculados = await Employee.count({
                where: { clinicId },
            });

            if (profissionaisVinculados <= 1) {
                throw new HttpError(
                    'A clínica precisa ter pelo menos um profissional vinculado. Não é possível desvincular este profissional.',
                    400
                );
            }
    
            await vinculo.destroy();
    
            return { message: 'Profissional desvinculado com sucesso.' };
        } catch (error) {
            console.error('Erro ao desvincular profissional:', error);
    
            throw error instanceof HttpError
                ? error
                : new HttpError('Erro interno ao desvincular profissional.', 500);
        }
    }

    async addSchedules(schedulesDTO: schedulesDTO, user: User) {
        const { clinicId, schedules } = schedulesDTO;
        console.log(schedulesDTO);
        console.log(schedules);

        if (!clinicId || !schedules || !Array.isArray(schedules)) {
            throw new HttpError("ID da clínica e horários são obrigatórios.", 400);
        }

        const clinica = await this.clinicModel.findByPk(clinicId);
        if (!clinica) {
            throw new HttpError("Clínica não encontrada.", 404);
        }

        if (!(await user.hasClinic(clinica))) {
            throw new HttpError("Usuário não tem permissão para adicionar horários a esta clínica.", 403);
        }

        try {
            const horariosCriados = await Promise.all(
                schedules.map(async (horario) => {
                    console.log("Chegou no map");
                    const { dia, horaInicio, horaFim } = horario;

                    if (!dia || !horaInicio || !horaFim) {
                        throw new HttpError("Todos os horários devem ter dia, hora de início e hora de fim.", 400);
                    }
                    
                    const formatarHora = (hora: string) => {
                        return hora.length === 5 ? `${hora}:00` : hora;
                    };

                    const horaInicioFormatada = formatarHora(horaInicio);
                    const horaFimFormatada = formatarHora(horaFim);

                    return await Schedule.create({
                        clinicId,
                        dia,
                        horaInicio: horaInicioFormatada,
                        horaFim: horaFimFormatada,
                    });
                })
            );

            return horariosCriados;
        } catch (error) {
            throw new HttpError("Erro ao adicionar horários.", 500);
        }
    };

    async deleteClinic(clinicId: string, user: User) {
        try {
            const clinica = await this.clinicModel.findOne({ where: { id: clinicId } });

            if (!clinica) {
                throw new HttpError("Clinica não encontrada!", 404);
            }

            await user.removeClinic(clinica);
            await clinica.destroy();

            return clinica;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao tentar deletar a clínica.", 500);
            }

            throw new HttpError("Erro interno ao deletar clínica.", 500);
        }
    }
}


export default ClinicService;
