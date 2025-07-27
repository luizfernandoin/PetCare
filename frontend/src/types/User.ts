type UserRole = "CLIENTE" | "PROFISSIONAL";
type UserRoleBackend = "Cliente" | "Profissional";

const userRoleMapper: Record<UserRole, UserRoleBackend> = {
    "CLIENTE": "Cliente",
    "PROFISSIONAL": "Profissional"
}

type AddressInput = {
    street: string,
    number: string,
    city: string,
    state: string,
    country: string,
    postalcode: string
};

type User = {
    id: string;
    email: string;
    nome: string;
    senha: string;
    telefone: string;
    location: AddressInput;
    tipo: UserRole;
    image?: string;
}

type UserCreate = Omit<User, 'id'|'image'>

export {
    UserRole,
    User,
    UserCreate,
    AddressInput,
    userRoleMapper
};