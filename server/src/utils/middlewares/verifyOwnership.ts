import { NextFunction, Request, Response } from "express";
import User from "../../models/user";
import UserService from "../../service/userService";
import ClinicService from "../../service/clinicService";
import HttpError from "../errors/HttpError";

const userService = new UserService(User);

const verifyOwnership = (service: ClinicService) => {
    return async(request: Request, response: Response, next: NextFunction) => {
        try {
            const { id } = request.params;
            const emailUser = request.user.email;
            const user = await userService.getUserByEmail(emailUser);

            const ownerId = await service.getOwnerId(id);

            if (!ownerId) {
                throw new HttpError("Service not found!", 404);
            }

            if (ownerId !== user.id) {
                throw new HttpError("User not authorized.", 403);
            }
            
            next();
        } catch (error) {
            next(error);
        }
    };
};

export default verifyOwnership;