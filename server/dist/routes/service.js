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
const userService_1 = __importDefault(require("../service/userService"));
const serviceService_1 = __importDefault(require("../service/serviceService"));
const clinicaService_1 = __importDefault(require("../service/clinicaService"));
const user_1 = __importDefault(require("../models/user"));
const service_1 = __importDefault(require("../models/service"));
const clinica_1 = __importDefault(require("../models/clinica"));
const router = (0, express_1.Router)();
const userService = new userService_1.default(user_1.default);
const serviceService = new serviceService_1.default(service_1.default);
const clinicaService = new clinicaService_1.default(clinica_1.default);
router.post("/:clinicaId/services", authenticateToken_1.default, (0, typeUser_1.default)("Profissional"), (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceDTO = request.body;
        const { clinicaId } = request.params;
        const clinica = yield clinicaService.getClinicaById(clinicaId);
        const newService = yield serviceService.createService(serviceDTO, clinica);
        response.status(201).json({
            message: `Serviço adicionado a clinica ${clinica.nome} com sucesso!`,
            data: newService
        });
    }
    catch (error) {
        next(error);
    }
}));
router.get("/:clinicaId/services", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { clinicaId } = request.params;
    try {
        const services = yield serviceService.getServicesByClinicaId(clinicaId);
        response.status(200).json({ message: "Serviços encontrados com sucesso.", data: services });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
