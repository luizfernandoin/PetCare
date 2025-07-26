import { NextFunction, Router, Request, Response } from "express";
import PetService from "../service/petService";
import UserService from "../service/userService";
import authenticateToken from "../utils/middlewares/authenticateToken";

import Pet from "../models/pet";
import User from "../models/user";
import { validate, validateParams } from "../utils/middlewares/validate";
import { 
    petCreateSchema, 
    petUpdateSchema, 
    urlParamsSchema 
} from "@petcare/shared";


const router = Router()
const petService = new PetService(Pet);
const userService = new UserService(User);


router.post('/', 
    validate(petCreateSchema),
    authenticateToken, 
    async(request: Request, response: Response, next: NextFunction) => {
    try {
        const { email } = request.user;
        const petDTO: Pet = request.body;

        const user = await userService.getUserByEmail(email);
        const resultPet = await petService.createPet(petDTO, user);

        response.status(201).json({"message": "Pet criado com sucesso.", "data": resultPet});
    } catch (error) {
        next(error)
    }
});

router.get('/', async (request: Request, response: Response, next: NextFunction) => {
    const pets = await petService.getAllPets();

    try {
        const pets = await petService.getAllPets();

        response.status(200).json({"message": "Pets encontrados com sucesso.", "data": pets});
    } catch (error) {
        next(error)
    }
});

router.get('/:id', validateParams(urlParamsSchema), async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { id } = request.params;
        const pet = await petService.getPetById(id);

        response.status(200).json({"message": "Pet encontrado com sucesso.", "data": pet});
    } catch (error) {
        next(error);
    };
});

router.put('/:id',
    validateParams(urlParamsSchema),
    validate(petUpdateSchema),
    authenticateToken, async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const petDTO = request.body;

    try {
        const user = await userService.getUserByEmail(request.user.email)
        const pet = await petService.updatePet(id, user, petDTO);

        response.status(200).json({
            message: "Pet atualizado com sucesso.",
            data: pet,
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', validateParams(urlParamsSchema), authenticateToken, async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { id } = request.params;
        const userAuth = request.user;

        const user = await userService.getUserByEmail(userAuth.email)
        const result = await petService.deletePet(id, user);

        response.status(200).json({ message: 'Pet deletado com sucesso.' });
    } catch (error) {
        next(error);
    }
});


export default router;