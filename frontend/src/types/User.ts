import { USER_ROLE } from "@petcare/shared/enums";

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
    name: string;
    password: string;
    phone: string;
    location: AddressInput;
    role: USER_ROLE;
    image?: string;
}

type UserCreate = Omit<User, 'id'>

type UserUpdate = Partial<UserCreate>;

type Profile = User;


export {
    User,
    UserCreate,
    UserUpdate,
    AddressInput,
    Profile
};