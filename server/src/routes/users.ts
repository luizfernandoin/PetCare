import { Router } from "express";
import { user, pet as petModel } from "../models/index";
import Pet from '../service/pet';
import User from '../service/user';
import dotenv from 'dotenv';
import authenticateToken from "../utils/middlewares/authenticateToken";
import Authentication from "../service/authentication";


dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const router = Router();
const userService = new User(user);
const petService = new Pet(petModel);
const authenticationService = new Authentication(user, SECRET_KEY)

router.get("/api/users", async (request: Request, response: Response) => {
    try {
        const result = await userService.get();
        return response.status(200).json(result);
    } catch (error: unknown) {
        console.error('Erro ao buscar usuários:', error);
        if (error instanceof Error) {
            return response.status(500).json({ message: 'Erro ao buscar usuários.', error: error.message });
        }
        return response.status(500).json({ message: 'Erro ao buscar usuários.', error: 'Erro desconhecido' });
    }
});


export default router;
