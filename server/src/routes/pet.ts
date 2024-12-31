import { Router } from "express";
import { pet, user } from "../models/index";
import Pet from "../service/pet";
import User from "../service/user";
import authenticateToken from "../utils/middlewares/authenticateToken";

const router = Router()
const petService = new Pet(pet);
const userService = new User(user);

router.post('/api/pets', authenticateToken, async(request, response) => {
    const user = await userService.getUserByEmail(request.user.email);
    const resultPet = await petService.createPet(request.body, user);
    
    if (!resultPet) {
        response.status(500).json({
            message: "Erro interno: resultado indefinido.",
        });
    }

    response.status(resultPet.status).json({
        message: resultPet.message,
        data: resultPet.data,
        errors: resultPet.errors,
    });
});

router.get('/api/pets', async (request, response) => {
    const pets = await petService.getAllPets();

    if (pets.error) {
        response.status(pets.status).json({
            message: pets.message,
            error: pets.error,
        });
    }

    response.status(pets.status).json({
        message: pets.message,
        data: pets.data,
    });
});

router.get('/api/pets/:id', async (request, response) => {
    const { id } = request.params;
    const pet = await petService.getPetById(id);

    if (pet.error || !pet) {
        response.status(pet.status).send(pet.error)
    }

    response.send(pet);
});

router.put('/api/pets/:id', authenticateToken, async (request, response) => {
    const { id } = request.params;
    const {
        nome,
        raca,
        idade,
        porte,
        foto,
        caracteristicas,
    } = request.body;
    const user = await userService.getUserByEmail(request.user.email)

    if (!nome || !porte) {
        response.status(400).json({ 
            message: "Nome e porte são obrigatórios." 
        });
    }

    try {
        const updates = { nome, raca, idade, porte, foto, caracteristicas };

        const pet = await petService.updatePet(id, user, updates);

        const result = {
            message: pet.message,
            data: pet.data,
        };

        if (pet.errors) {
            result.errors = pet.errors;
        }

        response.status(pet.status).json(result);
    } catch (error) {
        console.error("Erro ao atualizar pet:", error);
        response.status(500).json({
            message: "Erro interno ao atualizar o pet.",
            error: error.message,
        });
    }
});

router.delete('/api/pets/:id', authenticateToken, async (request, response) => {
    try {
        const petId = request.params.id;
        const userAuth = request.user;
        const user = await userService.getUserByEmail(userAuth.email)

        const result = await petService.deletePet(petId, user);

        response.status(result.status).json({
            message: result.message,
            ...(result.data && { data: result.data })
        });
    } catch (error) {
        console.error('Erro ao deletar pet:', error);
        response.status(500).json({ message: 'Erro ao deletar pet.', error: error.message });
    }
});


export default router;