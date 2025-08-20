import { Router, Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import AuthenticationService from "../service/authenticationService";
import User from "../models/user";
import { validate } from "../utils/middlewares/validate";
import { loginSchema, userSchema } from "@petcare/shared";
import GeocodingService from "../service/GeocodingService";
import { IUserCreate } from "../@types/User";


dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';

const router = Router();
const authenticationService = new AuthenticationService(User, SECRET_KEY)
const geocodingService = new GeocodingService();



router.post("/register", validate(userSchema), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userDTO: IUserCreate = request.body;
        const { lat, lon } = await geocodingService.getCoordinates(userDTO.location);
        
        const userToSave = {
            email: userDTO.email,
            name: userDTO.name,
            password: userDTO.password,
            phone: userDTO.phone,
            role: userDTO.role,
            location: {
                type: "Point",
                coordinates: [lon, lat] as [number, number],
            },
        };

        const newUser = await authenticationService.createUser(userToSave);

        response.status(201).json({
            message: "User created successfully.",
            data: newUser,
        });
    } catch (error) {
        next(error)
    };
});

router.post("/login", validate(loginSchema), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { email, password } = request.body;
        const token = await authenticationService.login(email, password);
        response.status(200).json({
            message: "User logged in successfully.",
            token: token,
        });
    } catch (error) {
        next(error);
    };
});


export default router;
