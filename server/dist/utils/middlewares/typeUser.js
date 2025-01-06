"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpError_1 = __importDefault(require("../errors/HttpError"));
const typeUser = (requiredType) => {
    return (request, response, next) => {
        if (!request.user) {
            throw new HttpError_1.default('Usuário não autenticado.', 401);
        }
        if (request.user.tipo !== requiredType) {
            throw new HttpError_1.default(`Acesso negado! Tipo de usuário necessário: ${requiredType}`, 403);
        }
        next();
    };
};
exports.default = typeUser;
