import { ModelStatic, ValidationError, ValidationErrorItem } from "sequelize";
import Service from "../models/service";
import Clinic from "../models/clinic";
import HttpError from "../utils/errors/HttpError";

class ServiceService {
    private serviceModel: ModelStatic<Service>;

    constructor(serviceModel: ModelStatic<Service>) {
        this.serviceModel = serviceModel;
    }

    async get() {
        try {
            const services = await this.serviceModel.findAll();

            return services;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Internal error while fetching services.", 500, error);
            }

            throw new HttpError("Unknown error.", 500);
        }
    }

    async createService(serviceDTO: Service, clinic: Clinic) {
        const { type, notes } = serviceDTO;
        const clinicId = clinic.id;

        if (!type) {
            throw new HttpError("Service type is required.", 400);
        }
    
        try {
            const newService = await this.serviceModel.create({
                ...serviceDTO,
                clinicId,
            });

            return newService;
        } catch (error) {
            if (error instanceof ValidationError) {
                const errors = error.errors.map((err: ValidationErrorItem) => err.message);
                throw new HttpError(
                    `Validation error: ${errors.join(", ")}`, 
                    400
                );
            }
    
            throw new HttpError("Internal error while adding service", 500);
        }
    }

    async getServicesByClinicId(clinicId: string) {
        try {
            const services = this.serviceModel.findAll({
                where: {
                    clinicId
                }
            });

            return services;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Error fetching services.", 500, new Error(error.message));
            };

            throw new HttpError("Internal error fetching services.", 500);
        }
    }
}


export default ServiceService;
