import { ModelStatic, ValidationError, ValidationErrorItem } from "sequelize";
import Pet from "../models/pet";
import User from "../models/user";
import HttpError from "../utils/errors/HttpError";
import DonoPet from "../models/DonoPet";

class PetService {
    private petModel: ModelStatic<Pet>;

    constructor(petModel: ModelStatic<Pet>) {
        this.petModel = petModel;
    }

    async createPet(petDTO: Pet, user: User) {
        const { nome, porte } = petDTO;
    
        if (!nome || !porte) {
            throw new HttpError("Nome e porte são obrigatórios.", 400);
        }
    
        try {
            const newPet = await this.petModel.create(petDTO);

            await user.addPet(newPet);
        } catch (error) {
            if (error instanceof ValidationError) {
                const errors = error.errors.map((err: ValidationErrorItem) => err.message);
                throw new HttpError(
                    `Erro de validação: ${errors.join(", ")}`, 
                    400
                );
            }
    
            throw new HttpError("Erro interno ao criar usuário.", 500);
        }
    }
    
    async getAllPets() {
        try {
            const pets = await this.petModel.findAll();
            
            return pets;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro interno ao buscar pets.", 500, error);
            }

            throw new HttpError("Erro desconhecido.", 500);
        }
    }
    
    async getPetById(petId: string) {
        try {
            const pet = await this.petModel.findOne({ 
                where: { id: petId }
            })

            if (!pet) {
                throw new HttpError("Pet não encontrado.", 404);
            }
    
            return pet;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro interno ao buscar pet.", 500, error);
            }

            throw new HttpError("Erro desconhecido.", 500);
        }
    }

    async isOwner(petId: string, userId: string) {
        const donoPet = await DonoPet.findOne({
            where: {
                petId: petId,
                userId: userId
            }
        });
        return !!donoPet;
    }
    
    async updatePet(petId: string, user: User, updates: Pet) {
        const {
            nome,
            raca,
            idade,
            porte,
            foto,
            caracteristicas,
        } = updates;

        if (!nome || !porte) {
            throw new HttpError("Nome e porte são obrigatórios.", 400);
        }

        try {
            const pet = await this.petModel.findOne({ where: { id: petId } });
            if (!pet) {
                throw new HttpError("Pet não encontrado.", 404);
            }

            const isOwner = await this.isOwner(petId, user.id);
            if (!isOwner) {
                throw new HttpError("Você não tem permissão para atualizar este pet.", 403);
            }

            await pet.update(updates);

            return pet;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao tentar atualizar pet.", 500, error);
            }

            throw new HttpError("Erro interno ao tentar atualizar pet.", 500);
        }
    }
    
    async deletePet(petId: string, user: User) {
        try {  
            const isOwner = await this.isOwner(petId, user.id);
            
            if (!isOwner) {
                throw new HttpError("Você não tem permissão para deletar este pet.", 403);
            }
    
            const pet = await this.petModel.findOne({ where: { id: petId } });
            
            if (!pet) {
                throw new HttpError("Pet não encontrado.", 404);
            }
    
            await pet.destroy();
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro interno ao deletar pet.", 500, error);
            }

            throw new HttpError("Erro desconhecido.", 500);
        }
    }

    async deletePets(user: User) {
        try {
            const pets = await user.getPets();
    
            if (pets.length === 0) {
                return { status: 404, message: "Pets não encontrados." };
            }
    
            await user.removePets(pets);
    
            await this.petModel.destroy({
                where: {
                    id: pets.map(pet => pet.id)
                }
            });

            return { status: 200, message: "Pets deletados com sucesso." };
        } catch (error) {
            if (error instanceof HttpError) {
                throw new HttpError(error.message, error.statusCode);
            }
            
            throw new HttpError("Erro interno ao deletar pets.", 500);
        }    
    }
}


export default PetService;
