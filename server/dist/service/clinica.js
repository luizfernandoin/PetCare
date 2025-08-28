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
const index_1 = require("../models/index");
class Clinica {
    constructor(clinicaModel) {
        this.clinica = clinicaModel;
    }
    getOwnerId(clinicaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ownerRecord = yield index_1.TrabalhaClinica.findOne({
                    where: { clinicaId: clinicaId },
                });
                if (!ownerRecord) {
                    throw new Error("Proprietário não encontrado para esta clínica!");
                }
                console.log("Owner Record: ", ownerRecord);
                return ownerRecord.userId;
            }
            catch (error) {
                console.error("Erro ao buscar ownerId:", error.message);
                throw new Error("Erro ao buscar ownerId.");
            }
        });
    }
    getElementById(clinicaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clinica = yield this.clinica.findByPk(clinicaId);
                if (!clinica) {
                    return { error: "Clinica não encontrada!", status: 404 };
                }
                return clinica;
            }
            catch (error) {
                return { status: 500, error: "Erro ao buscar clinica:  " + error.message };
            }
        });
    }
    getAllClinicas() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clinicas = yield this.clinica.findAll();
                return { status: 200, message: "Clinicas encontrados com sucesso.", data: clinicas };
            }
            catch (error) {
                return { status: 500, message: "Erro ao buscar clinicas.", error: error.message };
            }
        });
    }
    getClinicaById(clinicaId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clinica = yield this.clinica.findByPk(clinicaId);
                if (!clinica) {
                    return { error: "Clinica não encontrada!", status: 404 };
                }
                return clinica;
            }
            catch (error) {
                return { status: 500, error: "Erro ao buscar clinica:  " + error.message };
            }
        });
    }
    createClinica(clinicaDTO, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, telefone } = clinicaDTO;
            if (!nome || !telefone) {
                return { status: 400, message: "Nome e telefone são obrigatórios." };
            }
            try {
                const newClinica = yield this.clinica.create(clinicaDTO);
                yield user.addClinica(newClinica);
                return {
                    status: 201,
                    message: `Clínica ${newClinica.nome} criada e associada ao usuário ${user.nome} com sucesso!`,
                    data: newClinica
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
                return { status: 500, message: "Erro interno ao adicionar clinica.", error: error.message };
            }
        });
    }
    deleteClinica(clinicaId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(user);
            try {
                const clinica = yield this.clinica.findOne({ where: { id: clinicaId } });
                console.log(clinica);
                if (!clinica) {
                    return {
                        status: 404,
                        message: "Clinica não encontrada!"
                    };
                }
                yield user.removeClinica(clinica);
                yield clinica.destroy();
                return {
                    status: 200,
                    message: `Clínica ${clinica.nome} deletada com sucesso!`
                };
            }
            catch (error) {
                if (error.name === "SequelizeDatabaseError") {
                    return {
                        status: 500,
                        message: "Erro ao acessar o banco de dados ao tentar deletar a clínica.",
                        error: error.message,
                    };
                }
                return {
                    status: 500,
                    message: "Erro interno ao deletar clínica.",
                    error: error.message
                };
            }
        });
    }
}
exports.default = Clinica;
