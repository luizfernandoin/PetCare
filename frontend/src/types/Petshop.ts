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


export {
    PetShop,
    PetShopCreate,
    PetShopUpdate,
};