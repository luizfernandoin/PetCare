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
const clinicaService_1 = __importDefault(require("../service/clinicaService"));
const authenticateToken_1 = __importDefault(require("../utils/middlewares/authenticateToken"));
const typeUser_js_1 = __importDefault(require("../utils/middlewares/typeUser.js"));
const verifyOwnership_1 = __importDefault(require("../utils/middlewares/verifyOwnership"));
const clinica_1 = __importDefault(require("../models/clinica"));
const userService_1 = __importDefault(require("../service/userService"));
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
const clinicaService = new clinicaService_1.default(clinica_1.default);
const userService = new userService_1.default(user_1.default);
router.get("/", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clinicas = yield clinicaService.getAllClinicas();
        response.status(200).json({
            message: "Clínicas encontradas com sucesso!",
            data: clinicas
        });
    }
    catch (error) {
        next(error);
    }
}));
router.post('/', authenticateToken_1.default, (0, typeUser_js_1.default)("Profissional"), (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.getUserByEmail(request.user.email);
        const clinica = yield clinicaService.createClinica(request.body, user);
        response.status(201).json({
            message: `Clínica ${clinica.nome} criada e associada ao usuário ${user.nome} com sucesso!`,
            data: clinica
        });
    }
    catch (error) {
        next(error);
    }
    ;
}));
router.delete("/:id", authenticateToken_1.default, (0, typeUser_js_1.default)("Profissional"), (0, verifyOwnership_1.default)(clinicaService), (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const clinicaId = request.params.id;
    const { email } = request.user;
    try {
        const user = yield userService.getUserByEmail(email);
        const clinica = yield clinicaService.deleteClinica(clinicaId, user);
        response.status(200).json({
            message: `Clinica ${clinica.nome} deletada com sucesso.`,
            data: clinica
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
