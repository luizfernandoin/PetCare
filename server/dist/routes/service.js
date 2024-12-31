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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_1 = __importDefault(require("../utils/middlewares/authenticateToken"));
const typeUser_1 = __importDefault(require("../utils/middlewares/typeUser"));
const index_1 = require("../models/index");
const user_1 = __importDefault(require("../service/user"));
const service_1 = __importDefault(require("../service/service"));
const clinica_1 = __importDefault(require("../service/clinica"));
const router = (0, express_1.Router)();
const userService = new user_1.default(index_1.user);
const serviceService = new service_1.default(index_1.service);
const clinicaService = new clinica_1.default(index_1.clinica);
router.post("/api/:clinicaId/services", authenticateToken_1.default, (0, typeUser_1.default)("Profissional"), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { clinicaId } = request.params;
        const clinica = yield clinicaService.getClinicaById(clinicaId);
        if (!clinica) {
            return response.status(404).json({ message: "Clínica não encontrada." });
        }
        const resultService = yield serviceService.createService(request.body, clinica);
        if (!resultService) {
            return response.status(500).json({
                message: "Erro interno: resultado indefinido.",
            });
        }
        return response.status(resultService.status).json({
            message: resultService.message,
            data: resultService.data,
            errors: resultService.errors,
        });
    }
    catch (error) {
        console.error("Erro interno na rota:", error);
        return response.status(500).json({
            message: "Erro interno ao processar a solicitação.",
            error: error.message,
        });
    }
}));
router.get("/api/:clinicaId/services", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { clinicaId } = request.params;
    const services = yield serviceService.getServicesByClinicaId(clinicaId);
    if (services.error) {
        return response.status(services.status).json({
            message: services.message,
            error: services.error,
        });
    }
    return response.status(services.status).json({
        message: services.message,
        data: services.data,
    });
}));
exports.default = router;
