"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Service {
    constructor(serviceModel) {
        this.service = serviceModel;
    }
    createService(serviceDTO, clinica) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tipo, observacoes } = serviceDTO;
            const clinicaId = clinica.id;
            if (!tipo) {
                return { status: 400, message: "Tipo do serviço é obrigatorio." };
            }
            try {
                const newService = yield this.service.create({
                    tipo,
                    observacoes,
                    clinicaId,
                });
                return {
                    status: 201,
                    message: `Serviço adicionado a clinica ${clinica.nome} com sucesso!`,
                    data: newService
                };
            }
            catch (error) {
                if (error.name === "SequelizeValidationError") {
                    return {
                        status: 400,
                        message: "Erro de validação.",
                        errors: error.errors.map((err) => err.message),
                    };
                }
                return { status: 500, message: "Erro interno ao adicionar serviço.", error: error.message };
            }
        });
    }
    getServicesByClinicaId(clinicaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const services = this.service.findAll({
                    where: {
                        clinicaId
                    }
                });
                return { status: 200, message: "Serviços encontrados com sucesso.", data: services };
            }
            catch (error) {
                return { status: 500, message: "Erro ao buscar serviços.", error: error.message };
            }
        });
    }
}
exports.default = Service;
