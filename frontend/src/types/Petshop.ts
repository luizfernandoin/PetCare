
type PetShop = {
    id: string;
    name: string;
    phone: string;
    location: {
        street: string;
        number: string;
        city: string;
        state: string;
        country: string;
        postalcode: string
    };
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