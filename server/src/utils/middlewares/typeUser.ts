import { Request, Response, NextFunction } from "express";
import HttpError from "../errors/HttpError";

const typeUser = (requiredType: string) => {
    return (request: Request, response: Response, next: NextFunction) => {
        if (!request.user) {
            throw new HttpError('User not authenticated.', 401);
        }

        if (request.user.role !== requiredType) {
            throw new HttpError(`Access denied! Required user role: ${requiredType}`, 403);
        }

        next();
    };
};

export default typeUser;
