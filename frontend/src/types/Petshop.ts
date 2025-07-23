import { GeoLocation } from "@/types/User"


type PetShop = {
    id: string;
    nome: string;
    telefone: string;
    location: GeoLocation;
    image?: string;
}

type PetShopCreate = Omit<PetShop, 'id'>;

type PetShopUpdate = Partial<PetShopCreate>;

type WorksPetshop = {
    userId: string;
    clinicaId: string;
}

export {
    PetShop,
    PetShopCreate,
    PetShopUpdate,
    WorksPetshop,
};