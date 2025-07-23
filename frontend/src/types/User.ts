type UserRole = "CLIENTE" | "PROFISSIONAL" | "ADMIN";

type GeoLocation = {
    type: 'Point';
    coordinates: [number, number];
}

type AddressInput = {
    pais: string;
    estado: string;
    cep: string;
    cidade: string;
    rua: string;
    numero: string;
}

type Location = AddressInput | GeoLocation;

type User = {
    id: string;
    email: string;
    nome: string;
    senha: string;
    telefone?: string;
    location: Location;
    tipo: UserRole;
    image?: string;
}

type UserCreate = Omit<User, 'id'>

type UserUpdate = Partial<UserCreate>;


export {
    UserRole,
    User,
    UserCreate,
    UserUpdate,
    GeoLocation,
    AddressInput,
    Location,
};