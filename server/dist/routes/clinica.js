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
const index_1 = require("../models/index");
const clinica_1 = __importDefault(require("../service/clinica"));
const authenticateToken_1 = __importDefault(require("../utils/middlewares/authenticateToken"));
const typeUser_js_1 = __importDefault(require("../utils/middlewares/typeUser.js"));
const user_1 = __importDefault(require("../service/user"));
const verifyOwnership_1 = __importDefault(require("../utils/middlewares/verifyOwnership"));
const router = (0, express_1.Router)();
const clinicaService = new clinica_1.default(index_1.clinica);
const userService = new user_1.default(index_1.user);
router.get("/api/clinicas", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const clinicas = yield clinicaService.getAllClinicas();
    if (clinicas.error) {
        return response.status(clinicas.status).json({
            message: clinicas.message,
            error: clinicas.error,
        });
    }
    return response.status(clinicas.status).json({
        message: clinicas.message,
        data: clinicas.data,
    });
}));
router.post('/api/clinicas', authenticateToken_1.default, (0, typeUser_js_1.default)("Profissional"), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getUserByEmail(request.user.email);
    const clinica = yield clinicaService.createClinica(request.body, user);
    if (!clinica) {
        return response.status(500).json({
            message: "Erro interno: resultado indefinido.",
        });
    }
    return response.status(clinica.status).json({
        message: clinica.message,
        data: clinica.data,
        errors: clinica.errors,
    });
}));
router.delete("/api/clinicas/:id", authenticateToken_1.default, (0, typeUser_js_1.default)("Profissional"), (0, verifyOwnership_1.default)(clinicaService), (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getUserByEmail(request.user.email);
    const clinicaId = request.params.id;
    try {
        const result = yield clinicaService.deleteClinica(clinicaId, user);
        return response.status(result.status).json(Object.assign({ message: result.message }, (result.status === 200 && { data: result.data })));
    }
    catch (error) {
        return response.status(500).json({
            message: 'Erro interno ao tentar deletar a clínica.',
            error: error.message
        });
    }
}));
exports.default = router;
