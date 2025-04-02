import { Router, Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import AuthenticationService from "../service/authenticationService";
import User from "../models/user";
import { validate } from "../utils/middlewares/validate";
import { loginSchema, userSchema } from "../utils/validators/userValidation";
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
            nome: userDTO.nome,
            senha: userDTO.senha,
            telefone: userDTO.telefone,
            tipo: userDTO.tipo,
            location: {
                type: "Point",
                coordinates: [lon, lat] as [number, number],
            },
        };

        const newUser = await authenticationService.createUser(userToSave);

        response.status(201).json({
            message: "Usuário criado com sucesso.",
            data: newUser,
        });
    } catch (error) {
        next(error)
    };
});

router.post("/login", validate(loginSchema), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { email, senha } = request.body;
        const token = await authenticationService.login(email, senha);
        response.status(200).json({
            message: "Usuário logado com sucesso.",
            token: token,
        });
    } catch (error) {
        next(error);
    };
});


export default router;
