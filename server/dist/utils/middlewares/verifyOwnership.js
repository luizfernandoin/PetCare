"use strict";
/*
import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
import UserService from "../../service/userService";
import Service from "../../models/service";

const userService = new UserService(User);

const verifyOwnership = (service: ) => {
    return async(request: Request, response: Response, next: NextFunction) => {
        try {
            const { id } = request.params;
            const emailUser = request.user.email;
            const user = await userService.getUserByEmail(emailUser);

            const ownerId = await service.getOwnerId(id);

            if (!ownerId) {
                return response.status(404).json({ message: "Objeto não encontrado!" });
            }

            if (ownerId !== user.id) {
                return response.status(403).json({ message: "Usuário não autorizado." });
            }
            
            next();
        } catch (error) {
            return response.status(500).json({ message: "Erro interno ao verificar propriedade." });
        }
    };
};

export default verifyOwnership;
*/ 
