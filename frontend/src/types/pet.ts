type PortePet = 'PEQUENO' | 'MÉDIO' | 'GRANDE';

type Pet = {
    id: string;
    name: string;
    breed: string;
    age: number;
    size: PortePet;
    features?: string;
    image?: string;
};

type PetCreate = Omit<Pet, 'id'>

type PetUpdate = Partial<PetCreate>;


export {
    PortePet,
    Pet,
    PetCreate,
    PetUpdate,
};