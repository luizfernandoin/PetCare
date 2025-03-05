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
const petService_1 = __importDefault(require("../service/petService"));
const userService_1 = __importDefault(require("../service/userService"));
const authenticateToken_1 = __importDefault(require("../utils/middlewares/authenticateToken"));
const pet_1 = __importDefault(require("../models/pet"));
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
const petService = new petService_1.default(pet_1.default);
const userService = new userService_1.default(user_1.default);
router.post('/', authenticateToken_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = request.user;
        const petDTO = request.body;
        const user = yield userService.getUserByEmail(email);
        const resultPet = yield petService.createPet(petDTO, user);
        response.status(201).json({ "message": "Pet criado com sucesso.", "data": resultPet });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const pets = yield petService.getAllPets();
    try {
        const pets = yield petService.getAllPets();
        response.status(200).json({ "message": "Pets encontrados com sucesso.", "data": pets });
    }
    catch (error) {
        next(error);
    }
}));
router.get('/:id', (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const pet = yield petService.getPetById(id);
        response.status(200).json({ "message": "Pet encontrado com sucesso.", "data": pet });
    }
    catch (error) {
        next(error);
    }
    ;
}));
router.put('/:id', authenticateToken_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = request.params;
    const petDTO = request.body;
    try {
        const user = yield userService.getUserByEmail(request.user.email);
        const pet = yield petService.updatePet(id, user, petDTO);
        response.status(200).json({
            message: "Pet atualizado com sucesso.",
            data: pet,
        });
    }
    catch (error) {
        next(error);
    }
}));
router.delete('/:id', authenticateToken_1.default, (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = request.params;
        const userAuth = request.user;
        const user = yield userService.getUserByEmail(userAuth.email);
        const result = yield petService.deletePet(id, user);
        response.status(200).json({ message: 'Pet deletado com sucesso.' });
    }
    catch (error) {
        next(error);
    }
}));
exports.default = router;
