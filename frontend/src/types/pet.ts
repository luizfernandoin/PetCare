import { PET_SIZE } from "@petcare/shared/enums";

type Pet = {
    id: string;
    name: string;
    breed: string;
    age: number;
    size: PET_SIZE;
    characteristics?: string;
    image?: string;
};

type PetCreate = Omit<Pet, 'id'>

type PetUpdate = Partial<PetCreate>;


export {
    Pet,
    PetCreate,
    PetUpdate,
};