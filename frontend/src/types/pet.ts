type PortePet = 'PEQUENO' | 'MÉDIO' | 'GRANDE';

type Pet = {
    id: string;
    nome: string;
    raca: string;
    idade: number;
    porte: PortePet;
    caracteristicas?: string;
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