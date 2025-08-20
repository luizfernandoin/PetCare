import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from "express";
import HttpError from "../errors/HttpError";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';


const authenticateToken = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw next(new HttpError("Token not provided.", 401));
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        request.user = decoded;
        next();
    } catch (error) {
        return next(new HttpError("Invalid or expired token.", 403));
    }
};

export default authenticateToken;
