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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authentication {
    constructor(userModel, secretKey) {
        this.userModel = userModel;
        this.secretKey = secretKey;
    }
    login(email, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!email || !senha) {
                return { status: 400, message: "Email e senha são obrigatórios." };
            }
            try {
                const usuario = yield this.userModel.findOne({ where: { email } });
                if (!usuario) {
                    return { status: 404, message: "Usuário não encontrado." };
                }
                const senhaValida = yield bcrypt_1.default.compare(senha, usuario.senha);
                if (!senhaValida) {
                    return { status: 401, message: "Senha incorreta." };
                }
                const token = jsonwebtoken_1.default.sign({ email: usuario.email, tipo: usuario.tipo }, this.secretKey, { expiresIn: "1h" });
                return { status: 200, message: "Login realizado com sucesso.", token };
            }
            catch (error) {
                console.error("Erro ao realizar login:", error);
                return { status: 500, message: "Erro interno do servidor.", error: error.message };
            }
        });
    }
}
exports.default = Authentication;
