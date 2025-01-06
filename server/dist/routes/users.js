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
const dotenv_1 = __importDefault(require("dotenv"));
const authenticateToken_1 = __importDefault(require("../utils/middlewares/authenticateToken"));
const authenticationService_1 = __importDefault(require("../service/authenticationService"));
const user_1 = __importDefault(require("../models/user"));
const pet_1 = __importDefault(require("../models/pet"));
const HttpError_1 = __importDefault(require("../utils/errors/HttpError"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
const router = (0, express_1.Router)();
const userService = new userService_1.default(user_1.default);
const petService = new petService_1.default(pet_1.default);
const authenticationService = new authenticationService_1.default(user_1.default, SECRET_KEY);
router.get("/api/users", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
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
router.post("/api/users", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDTO = request.body;
        console.log(userDTO);
        const newUser = yield userService.createUser(userDTO);
        response.status(201).json({
            message: "Usuário criado com sucesso.",
            data: newUser,
        });
    }
    catch (error) {
        next(error);
    }
    ;
}));
router.post("/api/login", (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, senha } = request.body;
        const token = yield authenticationService.login(email, senha);
        response.status(200).json({
            message: "Usuário logado com sucesso.",
            token: token,
        });
    }
    catch (error) {
        next(error);
    }
    ;
}));
router.delete('/api/users/', authenticateToken_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userAuth = request.user;
        if (!userAuth) {
            throw new HttpError_1.default("Usuário não encontrado.", 404);
        }
        const user = yield userService.getUserByEmail(userAuth.email);
        yield petService.deletePets(user);
        const result = yield userService.deleteUser(userAuth);
        response.status(200).json({
            message: "Usuário deletado com sucesso."
        });
    }
    catch (error) {
        next(error);
    }
}));
/*
router.delete('/api/users/:id', async(request, response) => {
    const { id } = request.params;

    const result = await userService.deleteUserById(id);

    if (result.error) {
        return response.status(result.status).json({ message: result.error });
    }

    return response.status(result.status).json({ message: result.message });
})

router.delete('/api/users', authenticateToken, async(request, response) => {
    const userEmail = request.user.email;

    const result = await userService.deleteUserByEmail(userEmail);

    return response.status(result.status).json({ message: result.message });
})

router.put('/api/users/profile', authenticateToken, async(request, response) => {
    const userAuth = request.user;
    const {
        nome,
        telefone,
        uf,
        cidade,
        rua,
        bairro,
        num,
    } = request.body;

    if (!nome || !telefone || !uf || !cidade || !rua || !bairro || !num) {
        return response.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
    }

    try {
        const result = await userService.updateUser(userAuth, {
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
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        return response.status(500).json({
            message: "Erro interno do servidor ao atualizar perfil.",
            error: error.message,
        });
    }
})

router.patch("/api/users/profile", authenticateToken, async (request, response) => {
    const userEmail = request.user.email;
    const updates = request.body;

    if (Object.keys(updates).length === 0) {
        return response.status(400).json({
            message: "Nenhum campo foi enviado para atualização.",
        });
    }

    try {
        const result = await userService.patchUser(userEmail, updates);
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
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        return response.status(500).json({
            message: "Erro interno do servidor ao atualizar perfil.",
            error: error.message,
        });
    }
});
*/
exports.default = router;
