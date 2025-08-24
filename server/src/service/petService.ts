import { InferCreationAttributes, ModelStatic, ValidationError, ValidationErrorItem } from "sequelize";
import Pet from "../models/pet";
import User from "../models/user";
import HttpError from "../utils/errors/HttpError";
import OwnerPet from "../models/owner-pet";

class PetService {
    private petModel: ModelStatic<Pet>;

    constructor(petModel: ModelStatic<Pet>) {
        this.petModel = petModel;
    }

    async createPet(petDTO: InferCreationAttributes<Pet>, user: User) {
        try {
            const newPet = await this.petModel.create(petDTO);

            await user.addPet(newPet);

            return newPet;
        } catch (error) {
            if (error instanceof ValidationError) {
                const errors = error.errors.map((err: ValidationErrorItem) => err.message);
                throw new HttpError(
                    `Validation error: ${errors.join(", ")}`,
                    400
                );
            }

            throw new HttpError("Internal error while creating pet.", 500);
        }
    }

    async getAllPets() {
        try {
            const pets = await this.petModel.findAll();

            return pets;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Internal error while fetching pets.", 500, error);
            }

            throw new HttpError("Unknown error.", 500);
        }
    }

    async getPetById(petId: string) {
        try {
            const pet = await this.petModel.findOne({
                where: { id: petId }
            })

            if (!pet) {
                throw new HttpError("Pet not found.", 404);
            }

            return pet;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Internal error while fetching pet.", 500, error);
            }

            throw new HttpError("Unknown error.", 500);
        }
    }

    async getPetsByUserId(userId: string) {
        try {
            console.log('userId', userId);

            const userWithPets = await User.findByPk(userId, {
                include: [{
                    model: Pet,
                    through: { attributes: [] }
                }]
            });

            if (!userWithPets) {
                throw new HttpError("User not found", 404);
            }

            const pets = await userWithPets.getPets();
            return pets;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Internal error while fetching pets.", 500, error);
            }
            throw new HttpError("Unknown error.", 500);
        }
    }

    async isOwner(petId: string, userId: string) {
        const ownerPet = await OwnerPet.findOne({
            where: {
                petId: petId,
                userId: userId
            }
        });
        return !!ownerPet;
    }

    async updatePet(petId: string, user: User, updates: Pet) {
        try {
            const pet = await this.petModel.findOne({ where: { id: petId } });
            if (!pet) {
                throw new HttpError("Pet not found.", 404);
            }

            const isOwner = await this.isOwner(petId, user.id);
            if (!isOwner) {
                throw new HttpError("You do not have permission to update this pet.", 403);
            }

            await pet.update(updates);

            return pet;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Error while updating pet.", 500, error);
            }

            throw new HttpError("Internal error while updating pet.", 500);
        }
    }

    async deletePet(petId: string, user: User) {
        try {
            const isOwner = await this.isOwner(petId, user.id);

            if (!isOwner) {
                throw new HttpError("You do not have permission to delete this pet.", 403);
            }

            const pet = await this.petModel.findOne({ where: { id: petId } });

            if (!pet) {
                throw new HttpError("Pet not found.", 404);
            }

            await pet.destroy();
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Internal error while deleting pet.", 500, error);
            }

            throw new HttpError("Unknown error.", 500);
        }
    }

    async deletePets(user: User) {
        try {
            const pets = await user.getPets();

            if (pets.length === 0) {
                return { status: 404, message: "Pets not found." };
            }

            await user.removePets(pets);

            await this.petModel.destroy({
                where: {
                    id: pets.map(pet => pet.id)
                }
            });

            return { status: 200, message: "Pets deleted successfully." };
        } catch (error) {
            if (error instanceof HttpError) {
                throw new HttpError(error.message, error.statusCode);
            }

            throw new HttpError("Internal error while deleting pets.", 500);
        }
    }
}


export default PetService;
