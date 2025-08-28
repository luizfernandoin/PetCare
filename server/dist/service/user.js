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
const bcrypt_1 = __importDefault(require("bcrypt"));
const sequelize_1 = require("sequelize");
class User {
    constructor(userModel) {
        this.user = userModel;
    }
    createUser(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, nome, senha, telefone, uf, cidade, rua, bairro, num, tipo } = userDTO;
            if (!email || !nome || !senha || !telefone || !uf || !cidade || !rua || !bairro || !num || !tipo) {
                return { status: 400, message: "Todos os campos obrigatórios devem ser preenchidos." };
            }
            if (!["Cliente", "Profissional"].includes(tipo)) {
                return { status: 400, message: "O campo 'tipo' deve ser 'Cliente' ou 'Profissional'." };
            }
            const usuarioExiste = yield this.user.findOne({ where: { email } });
            if (usuarioExiste) {
                return { status: 400, message: "E-mail já cadastrado." };
            }
            try {
                const salt = yield bcrypt_1.default.genSalt();
                const hashedPassword = yield bcrypt_1.default.hash(senha, salt);
                const novoUsuario = yield this.user.create({
                    email,
                    nome,
                    senha: hashedPassword,
                    telefone,
                    uf,
                    cidade,
                    rua,
                    bairro,
                    num,
                    tipo,
                });
                return { status: 201, message: "Usuário criado com sucesso!", data: novoUsuario };
            }
            catch (error) {
                console.error("Erro ao criar usuário:", error);
                if (error instanceof sequelize_1.ValidationError) {
                    return {
                        status: 400,
                        message: "Erro de validação.",
                        errors: error.errors.map((err) => err.message),
                    };
                }
                if (error instanceof Error) {
                    return { status: 500, message: "Erro interno ao criar usuário.", error: error.message };
                }
                return { status: 500, message: "Erro interno ao criar usuário.", error: "Erro desconhecido." };
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.user.findAll({
                    attributes: { exclude: ['senha'] },
                });
                return { status: 200, message: "Usuários encontrados com sucesso.", data: users };
            }
            catch (error) {
                return { status: 500, message: "Erro ao buscar usuários.", error: error.message };
            }
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.user.findOne({
                    where: { id: userId },
                    attributes: { exclude: ['senha'] }
                });
                if (!user) {
                    return null;
                }
                return user;
            }
            catch (error) {
                console.error('Erro ao buscar usuário:', error);
                throw error;
            }
        });
    }
    getUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.user.findOne({
                    where: { email: userEmail },
                    attributes: { exclude: ['senha'] }
                });
                if (!user)
                    return null;
                return user;
            }
            catch (error) {
                console.error('Erro ao buscar usuário:', error);
                throw error;
            }
        });
    }
    deleteUser(userAuth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.getUserByEmail(userAuth.email);
                if (!user) {
                    return { status: 404, message: "User não encontrado." };
                }
                yield user.destroy();
                return {
                    status: 200,
                    message: "Usuário e seus pets deletados com sucesso.",
                };
            }
            catch (error) {
                console.error("Erro ao deletar pet:", error);
                return {
                    status: 500,
                    message: "Erro ao deletar pet.",
                    error: error.message,
                };
            }
        });
    }
    deleteUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield this.user.findOne({ where: { 'id': id } });
                if (!usuario) {
                    return { error: "Usuário não encontrado!", status: 404 };
                }
                yield usuario.destroy();
                return { message: "Usuário deletado com sucesso!", status: 200 };
            }
            catch (error) {
                console.error("Erro ao deletar usuário:", error);
                return { error: "Erro interno do servidor.", status: 500, details: error.message };
            }
        });
    }
    deleteUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToDelete = yield this.user.findOne({ where: { email } });
                if (!userToDelete) {
                    return { status: 404, message: "Usuário não encontrado." };
                }
                yield userToDelete.destroy();
                return { status: 200, message: "Usuário deletado com sucesso." };
            }
            catch (error) {
                console.error("Erro ao deletar usuário:", error);
                return { status: 500, message: "Erro interno do servidor." };
            }
        });
    }
    updateUser(userAuth, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield this.getUserByEmail(userAuth.email);
                if (!usuario) {
                    return { status: 404, message: "Usuário não encontrado." };
                }
                yield usuario.update(updates);
                return {
                    status: 200,
                    message: "Perfil atualizado com sucesso.",
                    data: usuario,
                };
            }
            catch (error) {
                console.error("Erro ao atualizar usuário:", error);
                return {
                    status: 500,
                    message: "Erro ao atualizar usuário.",
                    error: error.message,
                };
            }
        });
    }
    patchUser(email, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = yield this.user.findOne({ where: { email } });
                if (!usuario) {
                    return { status: 404, message: "Usuário não encontrado." };
                }
                yield usuario.update(updates);
                return {
                    status: 200,
                    message: "Perfil atualizado parcialmente com sucesso.",
                    data: usuario,
                };
            }
            catch (error) {
                console.error("Erro ao atualizar usuário:", error);
                return {
                    status: 500,
                    message: "Erro ao atualizar usuário.",
                    error: error.message,
                };
            }
        });
    }
}
exports.default = User;
