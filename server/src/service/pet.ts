import { pet as petModel, DonoPet as DonoPetModel } from "../models/index";


class Pet {
    constructor(petModel) {
        this.Pet = petModel;
    }

    async createPet(petDTO, user) {
        const { nome, raca, idade, porte, foto, caracteristicas } = petDTO;
    
        if (!nome || !porte) {
            return { status: 400, message: "Nome e porte são obrigatórios." };
        }
    
        try {
            const newPet = await this.Pet.create({
                nome,
                raca,
                idade,
                porte,
                foto,
                caracteristicas,
            });

            await user.addPet(newPet);
    
            return { status: 201, message: "Pet criado e associado com sucesso!", data: newPet };
        } catch (error) {
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
    }

    async getAllPets() {
        try {
            const pets = await this.Pet.findAll();

            return { status: 200, message: "Pets encontrados com sucesso.", data: pets };
        } catch (error) {
            console.error("Erro ao buscar pets:", error);
            return { status: 500, message: "Erro ao buscar pets.", error: error.message };
        }
    }

    async getPetById(petId) {
        try {
            const pet = await this.Pet.findOne({ 
                where: { id: petId }
            })

            if (!pet) {
                return { error: "Usuário não encontrado!", status: 404 };
            }
    
            return pet;
        } catch (error) {
            console.error("Erro ao buscar pet:", error);
            return { status: 500, error: "Erro ao buscar pet:  " + error.message };
        }
    }

    async isOwner(petId, userId) {
        const donoPet = await DonoPetModel.findOne({
            where: {
                petId: petId,
                userId: userId
            }
        });
        return !!donoPet;
    }

    async updatePet(petId, user, updates) {
        try {
            const isOwner = await this.isOwner(petId, user.id);
            if (!isOwner) {
                return { status: 403, message: "Você não tem permissão para atualizar este pet." };
            }

            const pet = await this.Pet.findOne({ where: { id: petId } });
            if (!pet) {
                return { status: 404, message: "Pet não encontrado." };
            }

            await pet.update(updates);

            return {
                status: 200,
                message: "Pet atualizado com sucesso.",
                data: pet,
            };
        } catch (error) {
            console.error("Erro ao atualizar pet:", error);
            return {
                status: 500,
                message: "Erro ao atualizar pet.",
                error: error.message,
            };
        }
    }

    async deletePet(petId, user) {
        console.log(user);
        try {  
            const isOwner = await this.isOwner(petId, user.id);
            if (!isOwner) {
                return { status: 403, message: "Você não tem permissão para deletar este pet." };
            }
    
            const pet = await this.Pet.findOne({ where: { id: petId } });
            if (!pet) {
                return { status: 404, message: "Pet não encontrado." };
            }
    
            await pet.destroy();
    
            return {
                status: 200,
                message: "Pet deletado com sucesso.",
            };
        } catch (error) {
            console.error("Erro ao deletar pet:", error);
            return {
                status: 500,
                message: "Erro ao deletar pet.",
                error: error.message,
            };
        }
    }

    async deletePets(user) {
        try {
            const pets = await user.getPets();
    
            if (pets.length === 0) {
                return { status: 404, message: "Nenhum pet associado ao usuário." };
            }
    
            await user.removePets(pets);
    
            await petModel.destroy({
                where: {
                    id: pets.map(pet => pet.id)
                }
            });
    
            return {
                status: 200,
                message: "Pets deletados com sucesso.",
            };
        } catch (error) {
            console.error("Erro ao deletar pets:", error);
            return {
                status: 500,
                message: "Erro ao deletar pets.",
                error: error.message,
            };
        }    
    }
}


export default Pet;