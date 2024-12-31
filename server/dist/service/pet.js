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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
class Pet {
    constructor(petModel) {
        this.Pet = petModel;
    }
    createPet(petDTO, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nome, raca, idade, porte, foto, caracteristicas } = petDTO;
            if (!nome || !porte) {
                return { status: 400, message: "Nome e porte são obrigatórios." };
            }
            try {
                const newPet = yield this.Pet.create({
                    nome,
                    raca,
                    idade,
                    porte,
                    foto,
                    caracteristicas,
                });
                yield user.addPet(newPet);
                return { status: 201, message: "Pet criado e associado com sucesso!", data: newPet };
            }
            catch (error) {
                console.error("Erro ao adicionar pet:", error);
                if (error.name === "SequelizeValidationError") {
                    return {
                        status: 400,
                        message: "Erro de validação.",
                        errors: error.errors.map((err) => err.message),
                    };
                }
                return { status: 500, message: "Erro interno ao adicionar pet.", error: error.message };
            }
        });
    }
    getAllPets() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pets = yield this.Pet.findAll();
                return { status: 200, message: "Pets encontrados com sucesso.", data: pets };
            }
            catch (error) {
                console.error("Erro ao buscar pets:", error);
                return { status: 500, message: "Erro ao buscar pets.", error: error.message };
            }
        });
    }
    getPetById(petId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pet = yield this.Pet.findOne({
                    where: { id: petId }
                });
                if (!pet) {
                    return { error: "Usuário não encontrado!", status: 404 };
                }
                return pet;
            }
            catch (error) {
                console.error("Erro ao buscar pet:", error);
                return { status: 500, error: "Erro ao buscar pet:  " + error.message };
            }
        });
    }
    isOwner(petId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const donoPet = yield index_1.DonoPet.findOne({
                where: {
                    petId: petId,
                    userId: userId
                }
            });
            return !!donoPet;
        });
    }
    updatePet(petId, user, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const isOwner = yield this.isOwner(petId, user.id);
                if (!isOwner) {
                    return { status: 403, message: "Você não tem permissão para atualizar este pet." };
                }
                const pet = yield this.Pet.findOne({ where: { id: petId } });
                if (!pet) {
                    return { status: 404, message: "Pet não encontrado." };
                }
                yield pet.update(updates);
                return {
                    status: 200,
                    message: "Pet atualizado com sucesso.",
                    data: pet,
                };
            }
            catch (error) {
                console.error("Erro ao atualizar pet:", error);
                return {
                    status: 500,
                    message: "Erro ao atualizar pet.",
                    error: error.message,
                };
            }
        });
    }
    deletePet(petId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(user);
            try {
                const isOwner = yield this.isOwner(petId, user.id);
                if (!isOwner) {
                    return { status: 403, message: "Você não tem permissão para deletar este pet." };
                }
                const pet = yield this.Pet.findOne({ where: { id: petId } });
                if (!pet) {
                    return { status: 404, message: "Pet não encontrado." };
                }
                yield pet.destroy();
                return {
                    status: 200,
                    message: "Pet deletado com sucesso.",
                };
            }
            catch (error) {
                console.error("Erro ao deletar pet:", error);
                return {
                    status: 500,
                    message: "Erro ao deletar pet.",
                    error: error.message,
                };
            }
        });
    }
    deletePets(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pets = yield user.getPets();
                if (pets.length === 0) {
                    return { status: 404, message: "Nenhum pet associado ao usuário." };
                }
                yield user.removePets(pets);
                yield index_1.pet.destroy({
                    where: {
                        id: pets.map(pet => pet.id)
                    }
                });
                return {
                    status: 200,
                    message: "Pets deletados com sucesso.",
                };
            }
            catch (error) {
                console.error("Erro ao deletar pets:", error);
                return {
                    status: 500,
                    message: "Erro ao deletar pets.",
                    error: error.message,
                };
            }
        });
    }
}
exports.default = Pet;
