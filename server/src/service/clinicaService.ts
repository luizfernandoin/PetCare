import { ModelStatic, Sequelize, ValidationError, ValidationErrorItem } from "sequelize";
import Clinica from "../models/clinica";
import TrabalhaClinica from "../models/TrabalhaClinica";
import HttpError from "../utils/errors/HttpError";
import User from "../models/user";


class ClinicaService {
    private clinicaModel: ModelStatic<Clinica>;

    constructor(clinicaModel: ModelStatic<Clinica>) {
        this.clinicaModel = clinicaModel;
    }

    async getOwnerId(clinicaId: string) {
        try {
            const ownerRecord = await TrabalhaClinica.findOne({
                where: { clinicaId: clinicaId },
            });
    
            if (!ownerRecord) {
                throw new HttpError("Proprietário não encontrado para esta clínica!", 404);
            }
    
            return ownerRecord.userId;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError(error.message, 500);
            };

            throw new HttpError("Erro interno ao buscar proprietário da clínica.", 500);
        }
    }

    async getElementById(clinicaId: string) {
        try {
            const clinica = await this.clinicaModel.findByPk(clinicaId);

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

    async getAllClinicas() {
        try {
            const clinicas = await this.clinicaModel.findAll();

            return clinicas;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError(error.message, 500);
            };

            throw new HttpError("Erro interno ao buscar clínicas.", 500);
        }
    }

    async getClinicaById(clinicaId: string) {
        try {
            const clinica = await this.clinicaModel.findByPk(clinicaId);

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

    async getNearbyClinicas (longitude: number, latitude: number, distance: number) {
        console.log(longitude, latitude);
        return await Clinica.findAll({
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

    async createClinica(clinicaDTO: any, user: any) {
        const { nome, telefone } = clinicaDTO;
    
        if (!nome || !telefone) {
            throw new HttpError("Nome e telefone são obrigatórios.", 400)
        }
    
        try {
            const newClinica = await this.clinicaModel.create(clinicaDTO);
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
    
    async deleteClinica(clinicaId: string, user: User) {
        try {
            const clinica = await this.clinicaModel.findOne({ where: { id: clinicaId } });

            if (!clinica) {
                throw new HttpError("Clinica não encontrada!", 404);
            }

            await user.removeClinica(clinica);
            await clinica.destroy();

            return clinica;
        } catch(error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao tentar deletar a clínica.", 500);
            }

            throw new HttpError("Erro interno ao deletar clínica.", 500);
        }
    }
}


export default ClinicaService;
