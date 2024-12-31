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
const index_1 = require("../../models/index");
const user_1 = __importDefault(require("../../service/user"));
const userService = new user_1.default(index_1.user);
const verifyOwnership = (service) => {
    return (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const emailUser = request.user.email;
            const user = yield userService.getUserByEmail(emailUser);
            console.log(service, id, user.id);
            console.log(user);
            const ownerId = yield service.getOwnerId(id);
            console.log(ownerId);
            if (!ownerId) {
                return response.status(404).json({ message: "Objeto não encontrado!" });
            }
            if (ownerId !== user.id) {
                return response.status(403).json({ message: "Usuário não autorizado." });
            }
            next();
        }
        catch (error) {
            return response.status(500).json({ message: "Erro interno ao verificar propriedade." });
        }
    });
};
exports.default = verifyOwnership;
