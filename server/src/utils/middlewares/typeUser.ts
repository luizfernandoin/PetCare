import { Request, Response, NextFunction } from "express";
import HttpError from "../errors/HttpError";

const typeUser = (requiredType: string) => {
    return (request: Request, response: Response, next: NextFunction) => {
        if (!request.user) {
            throw new HttpError('Usuário não autenticado.', 401);
        }

        if (request.user.tipo !== requiredType) {
            throw new HttpError(`Acesso negado! Tipo de usuário necessário: ${requiredType}`, 403);
        }

        next();
    };
};

export default typeUser;
