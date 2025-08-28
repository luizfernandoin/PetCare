import { ModelStatic, ValidationError, ValidationErrorItem } from "sequelize";
import Service from "../models/service";
import HttpError from "../utils/errors/HttpError";
import ClinicService from "src/models/clinic-service";
import { ServiceCreate } from "@petcare/shared";

class ServiceService {
    private serviceModel: ModelStatic<Service>;
    private clinicServiceModel: ModelStatic<ClinicService>;

    constructor(serviceModel: ModelStatic<Service>, clinicServiceModel: ModelStatic<ClinicService>) {
        this.serviceModel = serviceModel;
        this.clinicServiceModel = clinicServiceModel;
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

    async getServiceById(serviceId: string) {
        try {
            const service = await this.serviceModel.findByPk(serviceId);

            return service || null;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Error fetching service by ID.", 500, new Error(error.message));
            };

            throw new HttpError("Internal error fetching service by ID.", 500);
        }
    }

    async createService(serviceDto: ServiceCreate) {
        /* const { type } = serviceDTO;

        if (!type) {
            throw new HttpError("Service type is required.", 400);
        } */
    
        try {
            const newService = await this.serviceModel.create(serviceDto);

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

    async createServiceForClinic(clinicId: string, serviceId: string) {
        /* const { type } = serviceDTO;

        if (!type) {
            throw new HttpError("Service type is required.", 400);
        } */
    
        try {
            const newService = await this.clinicServiceModel.create({
                clinicId,
                serviceId
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
            const services = this.clinicServiceModel.findAll({
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
