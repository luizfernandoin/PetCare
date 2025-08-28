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
const petService_1 = __importDefault(require("../service/petService"));
const userService_1 = __importDefault(require("../service/userService"));
const authenticateToken_1 = __importDefault(require("../utils/middlewares/authenticateToken"));
const user_1 = __importDefault(require("../models/user"));
const pet_1 = __importDefault(require("../models/pet"));
const HttpError_1 = __importDefault(require("../utils/errors/HttpError"));
const router = (0, express_1.Router)();
const userService = new userService_1.default(user_1.default);
const petService = new petService_1.default(pet_1.default);
router.get("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userService.get();
        response.status(200).json({
            message: "Usuários encontrados com sucesso.",
            data: users,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ message: 'Erro ao buscar usuários.', error: error.message });
        }
        response.status(500).json({ message: 'Erro ao buscar usuários.', error: 'Erro desconhecido' });
    }
}));
router.delete('/', authenticateToken_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAuth = request.user;
        if (!userAuth) {
            throw new HttpError_1.default("Usuário não encontrado.", 404);
        }
        const user = yield userService.getUserByEmail(userAuth.email);
        const petDeletionResult = yield petService.deletePets(user);
        const result = yield userService.deleteUser(userAuth);
        response.status(200).json({
            message: "Usuário deletado com sucesso."
        });
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const result = yield userService.deleteUserById(id);
        response.status(200).json({ "message": "Usuário deletado com sucesso." });
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/', authenticateToken_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = request.user.email;
        const user = yield userService.deleteUserByEmail(userEmail);
        response.status(200).json({
            message: "Usuário deletado com sucesso.",
            data: user
        });
    }
    catch (error) {
        next(error);
    }
}));
router.put('/profile', authenticateToken_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userAuth = request.user;
    const userDTO = request.body;
    try {
        const user = yield userService.updateUser(userAuth, userDTO);
        response.status(200).json({
            message: "Perfil atualizado com sucesso.",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
}));
router.patch("/profile", authenticateToken_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = request.user.email;
    const updates = request.body;
    if (Object.keys(updates).length === 0) {
        throw new HttpError_1.default("Nenhum campo foi enviado para atualização.", 400);
    }
    try {
        const user = yield userService.patchUser(userEmail, updates);
        response.status(200).json({
            message: "Perfil atualizado parcialmente com sucesso.",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
