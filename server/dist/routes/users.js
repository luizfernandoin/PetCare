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
const pet_1 = __importDefault(require("../service/pet"));
const user_1 = __importDefault(require("../service/user"));
const dotenv_1 = __importDefault(require("dotenv"));
const authenticateToken_1 = __importDefault(require("../utils/middlewares/authenticateToken"));
const authentication_1 = __importDefault(require("../service/authentication"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY;
const router = (0, express_1.Router)();
const userService = new user_1.default(index_1.user);
const petService = new pet_1.default(index_1.pet);
const authenticationService = new authentication_1.default(index_1.user, SECRET_KEY);
router.get("/api/users", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userService.get();
    if (result.error) {
        return response.status(result.status).json({
            message: result.message,
            error: result.error,
        });
    }
    return response.status(result.status).json({
        message: result.message,
        data: result.data,
    });
}));
router.post("/api/users", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield userService.createUser(request.body);
    if (!result) {
        return response.status(500).json({
            message: "Erro interno: resultado indefinido.",
        });
    }
    return response.status(result.status).json({
        message: result.message,
        data: result.data,
        errors: result.errors,
    });
}));
router.post("/api/login", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, senha } = request.body;
    const result = yield authenticationService.login(email, senha);
    return response.status(result.status).json({
        message: result.message,
        token: result.token,
    });
}));
router.delete('/api/users/', authenticateToken_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAuth = request.user;
        const user = userService.getUserByEmail(userAuth.email);
        const petsDeletados = yield petService.deletePets(user);
        if (petsDeletados.error) {
            return response.status(petsDeletados.status).json({ message: petsDeletados.message, error: petsDeletados.error });
        }
        const result = yield userService.deleteUser(userAuth);
        return response.status(result.status).json({
            message: result.message
        });
    }
    catch (error) {
        console.error('Erro ao deletar user:', error);
        return response.status(500).json({ message: 'Erro ao deletar user.', error: error.message });
    }
}));
router.delete('/api/users/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const result = yield userService.deleteUserById(id);
    if (result.error) {
        return response.status(result.status).json({ message: result.error });
    }
    return response.status(result.status).json({ message: result.message });
}));
router.delete('/api/users', authenticateToken_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = request.user.email;
    const result = yield userService.deleteUserByEmail(userEmail);
    return response.status(result.status).json({ message: result.message });
}));
router.put('/api/users/profile', authenticateToken_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userAuth = request.user;
    const { nome, telefone, uf, cidade, rua, bairro, num, } = request.body;
    if (!nome || !telefone || !uf || !cidade || !rua || !bairro || !num) {
        return response.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
    }
    try {
        const result = yield userService.updateUser(userAuth, {
            nome,
            telefone,
            uf,
            cidade,
            rua,
            bairro,
            num,
        });
        if (result.error) {
            return response.status(result.status).json({
                message: result.message,
                error: result.error,
            });
        }
        return response.status(result.status).json({
            message: result.message,
            data: result.data,
        });
    }
    catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        return response.status(500).json({
            message: "Erro interno do servidor ao atualizar perfil.",
            error: error.message,
        });
    }
}));
router.patch("/api/users/profile", authenticateToken_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = request.user.email;
    const updates = request.body;
    if (Object.keys(updates).length === 0) {
        return response.status(400).json({
            message: "Nenhum campo foi enviado para atualização.",
        });
    }
    try {
        const result = yield userService.patchUser(userEmail, updates);
        console.log("Resultado do patchUser:", result);
        if (result.error) {
            return response.status(result.status).json({
                message: result.message,
                error: result.error,
            });
        }
        return response.status(result.status).json({
            message: result.message,
            data: result.data,
        });
    }
    catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        return response.status(500).json({
            message: "Erro interno do servidor ao atualizar perfil.",
            error: error.message,
        });
    }
}));
exports.default = router;
