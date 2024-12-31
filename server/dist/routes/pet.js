"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../models/index");
const pet_1 = __importDefault(require("../service/pet"));
const user_1 = __importDefault(require("../service/user"));
const authenticateToken_1 = __importDefault(require("../utils/middlewares/authenticateToken"));
const router = (0, express_1.Router)();
const petService = new pet_1.default(index_1.pet);
const userService = new user_1.default(index_1.user);
router.post('/api/pets', authenticateToken_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userService.getUserByEmail(request.user.email);
    const resultPet = yield petService.createPet(request.body, user);
    if (!resultPet) {
        return response.status(500).json({
            message: "Erro interno: resultado indefinido.",
        });
    }
    return response.status(resultPet.status).json({
        message: resultPet.message,
        data: resultPet.data,
        errors: resultPet.errors,
    });
}));
router.get('/api/pets', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const pets = yield petService.getAllPets();
    if (pets.error) {
        return response.status(pets.status).json({
            message: pets.message,
            error: pets.error,
        });
    }
    return response.status(pets.status).json({
        message: pets.message,
        data: pets.data,
    });
}));
router.get('/api/pets/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const pet = yield petService.getPetById(id);
    if (pet.error || !pet) {
        return response.status(pet.status).send(pet.error);
    }
    return response.send(pet);
}));
router.put('/api/pets/:id', authenticateToken_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const { nome, raca, idade, porte, foto, caracteristicas, } = request.body;
    const user = yield userService.getUserByEmail(request.user.email);
    if (!nome || !porte) {
        return response.status(400).json({
            message: "Nome e porte são obrigatórios."
        });
    }
    try {
        const updates = { nome, raca, idade, porte, foto, caracteristicas };
        const pet = yield petService.updatePet(id, user, updates);
        const result = {
            message: pet.message,
            data: pet.data,
        };
        if (pet.errors) {
            result.errors = pet.errors;
        }
        return response.status(pet.status).json(result);
    }
    catch (error) {
        console.error("Erro ao atualizar pet:", error);
        return response.status(500).json({
            message: "Erro interno ao atualizar o pet.",
            error: error.message,
        });
    }
}));
router.delete('/api/pets/:id', authenticateToken_1.default, (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const petId = request.params.id;
        const userAuth = request.user;
        const user = yield userService.getUserByEmail(userAuth.email);
        const result = yield petService.deletePet(petId, user);
        return response.status(result.status).json(Object.assign({ message: result.message }, (result.data && { data: result.data })));
    }
    catch (error) {
        console.error('Erro ao deletar pet:', error);
        return response.status(500).json({ message: 'Erro ao deletar pet.', error: error.message });
    }
}));
exports.default = router;
