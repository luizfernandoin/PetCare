type UserRole = "CLIENTE" | "PROFISSIONAL";
type UserRoleBackend = "Cliente" | "Profissional";

const userRoleMapper: Record<UserRole, UserRoleBackend> = {
    "CLIENTE": "Cliente",
    "PROFISSIONAL": "Profissional"
}

const userRoleBackendMapper: Record<UserRoleBackend, UserRole> = {
    "Cliente": "CLIENTE",
    "Profissional": "PROFISSIONAL"
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

type Profile = Omit<User,"tipo"> &  {
    tipo: UserRoleBackend
}

type UserCreate = Omit<User, 'id'|'image'>
type UserUpdate = Partial<UserCreate>

export {
    UserRole,
    User,
    UserCreate,
    UserUpdate,
    AddressInput,
    userRoleMapper,
    userRoleBackendMapper,
    Profile
};