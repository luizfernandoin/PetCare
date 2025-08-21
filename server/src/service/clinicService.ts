import { ModelStatic, Sequelize, ValidationError, ValidationErrorItem } from "sequelize";
import Clinic from "../models/clinic";
import Employee from "../models/employee";
import Schedule from "../models/schedule";
import HttpError from "../utils/errors/HttpError";
import User from "../models/user";
import { UUID } from "crypto";

interface scheduleType {
    day: string,
    startTime: string,
    endTime: string
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
                throw new HttpError("Owner not found for this clinic!", 404);
            }

            return ownerRecord.userId as string;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError(error.message, 500);
            };

            throw new HttpError("Internal error while fetching clinic owner.", 500);
        }
    }

    async getElementById(clinicId: string) {
        try {
            const clinic = await this.clinicModel.findByPk(clinicId);

            if (!clinic) {
                throw new HttpError("Clinic not found!", 404);
            }

            return clinic;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError(error.message, 500);
            };

            throw new HttpError("Internal error while fetching clinic.", 500);
        }
    }

    async getAllClinics() {
        try {
            const clinics = await this.clinicModel.findAll();

            return clinics;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError(error.message, 500);
            };

            throw new HttpError("Internal error while fetching clinics.", 500);
        }
    }

    async getClinicById(clinicId: string) {
        try {
            const clinic = await this.clinicModel.findByPk(clinicId);

            if (!clinic) {
                throw new HttpError("Clinic not found!", 404);
            }

            return clinic;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Error while fetching clinic.", 500, new Error(error.message))
            }

            throw new HttpError("Internal error while fetching clinics.", 500)
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
            const schedule = await Schedule.findAll({
                where: { clinicId },
                order: [["day", "ASC"], ["startTime", "ASC"]]
            })

            return schedule;
        } catch(error) {
            throw new HttpError("Error fetching schedules.", 500);
        }
    }

    async createClinic(clinicDTO: Partial<Clinic>, user: any) {
        try {
            const newClinic = await this.clinicModel.create(clinicDTO);
            await user.addClinic(newClinic);

            return newClinic;
        } catch (error) {
            if (error instanceof ValidationError) {
                const errors = error.errors.map((err: ValidationErrorItem) => err.message);
                throw new HttpError(`Validation error`, 400, new Error(errors.join(", ")));
            }

            throw new HttpError("Internal error while creating clinic.", 500);
        }
    }

    async linkProfessional(clinicId: string, professionalId: string) {
        try {
            if (!clinicId || !professionalId) {
                throw new HttpError('ClinicId and ProfessionalId are required.', 400);
            }

            const existingLink = await Employee.findOne({
                where: { clinicId, userId: professionalId }
            });

            if (existingLink) {
                throw new HttpError('The professional is already linked to this clinic.', 409);
            }

            const link= await Employee.create({ clinicId, userId: professionalId });

            return link;
        } catch (error) {
            console.error('Error while linking professional:', error);

            throw error instanceof HttpError
                ? error
                : new HttpError('Internal error while linking professional.', 500);
        }
    }

    async unlinkProfessional(clinicId: string, professionalId: string) {
        try {
            if (!clinicId || !professionalId) throw new HttpError('ClinicId and ProfessionalId are required.', 400);

            const link = await Employee.findOne({
                where: { clinicId, userId: professionalId }
            });
    
            if (!link) {
                throw new HttpError('The professional is not linked to this clinic.', 404);
            }

            const linkedProfessionals = await Employee.count({
                where: { clinicId },
            });

            if (linkedProfessionals <= 1) {
                throw new HttpError(
                    'The clinic must have at least one professional. Cannot unlink this professional.',
                    400
                );
            }
    
            await link.destroy();
    
            return { message: 'Professional unlinked successfully.' };
        } catch (error) {
            console.error('Error while unlinking professional:', error);
    
            throw error instanceof HttpError
                ? error
                : new HttpError('Internal error while unlinking professional.', 500);
        }
    }

    async addSchedules(schedulesDTO: schedulesDTO, user: User) {
        const { clinicId, schedules } = schedulesDTO;
        console.log(schedulesDTO);
        console.log(schedules);

        if (!clinicId || !schedules || !Array.isArray(schedules)) {
            throw new HttpError("Clinic ID and schedules are required", 400);
        }

        const clinic = await this.clinicModel.findByPk(clinicId);
        if (!clinic) {
            throw new HttpError("Clinic not found!", 404);
        }

        if (!(await user.hasClinic(clinic))) {
            throw new HttpError("User does not have permission to add schedules to this clinic.", 403);
        }

        try {
            const createdSchedules = await Promise.all(
                schedules.map(async (schedule) => {
                    console.log("Finish of the map");
                    const { day, startTime, endTime } = schedule;

                    if (!day || !startTime || !endTime) {
                        throw new HttpError("All schedules must have a day, start time, and end time.", 400);
                    }
                    
                    const formatTime = (hora: string) => {
                        return hora.length === 5 ? `${hora}:00` : hora;
                    };

                    return await Schedule.create({
                        clinicId,
                        day,
                        startTime: formatTime(startTime),
                        endTime: formatTime(endTime),
                    });
                })
            );

            return createdSchedules;
        } catch (error) {
            throw new HttpError("Error adding schedules.", 500);
        }
    };

    async deleteClinic(clinicId: string, user: User) {
        try {
            const clinic = await this.clinicModel.findOne({ where: { id: clinicId } });

            if (!clinic) {
                throw new HttpError("Clinic not found!", 404);
            }

            await user.removeClinic(clinic);
            await clinic.destroy();

            return clinic;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Error deleting clinic.", 500);
            }

            throw new HttpError("Internal error while deleting clinic.", 500);
        }
    }
}


export default ClinicService;
