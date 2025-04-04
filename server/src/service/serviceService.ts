import { ModelStatic, ValidationError, ValidationErrorItem } from "sequelize";
import Service from "../models/service";
import Clinica from "../models/clinica";
import HttpError from "../utils/errors/HttpError";

class ServiceService {
    private serviceModel: ModelStatic<Service>;

    constructor(serviceModel: ModelStatic<Service>) {
        this.serviceModel = serviceModel;
    }

    async createService(serviceDTO: Service, clinica: Clinica) {
        const { tipo, observacoes } = serviceDTO;
        const clinicaId = clinica.id;

        if (!tipo) {
            throw new HttpError("Tipo do serviço é obrigatorio.", 400);
        }
    
        try {
            const newService = await this.serviceModel.create({
                ...serviceDTO,
                clinicaId,
            });

            return newService;
        } catch (error) {
            if (error instanceof ValidationError) {
                const errors = error.errors.map((err: ValidationErrorItem) => err.message);
                throw new HttpError(
                    `Erro de validação: ${errors.join(", ")}`, 
                    400
                );
            }
    
            throw new HttpError("Erro interno ao adicionar serviço.", 500);
        }
    }

    async getServicesByClinicaId(clinicaId: string) {
        try {
            const services = this.serviceModel.findAll({
                where: {
                    clinicaId
                }
            });

            return services;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao buscar serviços.", 500, new Error(error.message));
            };

            throw new HttpError("Erro interno ao buscar serviços.", 500);
        }
    }
}


export default ServiceService;
