import { Router, Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import AuthenticationService from "../service/authenticationService";
import User from "../models/user";


dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';

const router = Router();
const authenticationService = new AuthenticationService(User, SECRET_KEY)


router.post("/register", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userDTO = request.body;
        const newUser = await authenticationService.createUser(userDTO);

        response.status(201).json({
            message: "Usuário criado com sucesso.",
            data: newUser,
        });
    } catch (error) {
        next(error)
    };
});

router.post("/login", async (request: Request, response: Response, next: NextFunction) => {
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
