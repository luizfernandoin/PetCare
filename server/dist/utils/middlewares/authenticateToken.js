"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const HttpError_1 = __importDefault(require("../errors/HttpError"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
const authenticateToken = (request, response, next) => {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw next(new HttpError_1.default("Token não fornecido.", 401));
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        request.user = decoded;
        next();
    }
    catch (error) {
        return next(new HttpError_1.default("Token inválido ou expirado.", 403));
    }
};
exports.default = authenticateToken;
