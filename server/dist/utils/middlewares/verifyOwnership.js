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
const user_1 = __importDefault(require("../../models/user"));
const userService_1 = __importDefault(require("../../service/userService"));
const HttpError_1 = __importDefault(require("../errors/HttpError"));
const userService = new userService_1.default(user_1.default);
const verifyOwnership = (service) => {
    return (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = request.params;
            const emailUser = request.user.email;
            const user = yield userService.getUserByEmail(emailUser);
            const ownerId = yield service.getOwnerId(id);
            if (!ownerId) {
                throw new HttpError_1.default("Serviço não encontrado!", 404);
            }
            if (ownerId !== user.id) {
                throw new HttpError_1.default("Usuário não autorizado.", 403);
            }
            next();
        }
        catch (error) {
            next(error);
        }
    });
};
exports.default = verifyOwnership;
