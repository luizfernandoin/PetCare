import { USER_ROLE } from "@petcare/shared/src/enums";

interface IUserCreate {
    email: string;
    name: string;
    password: string;
    phone: string;
    location: {
        street: string,
        number: string,
        city: string,
        state: string,
        country: string,
        postalcode: string
    };
    role: USER_ROLE;
}

export {IUserCreate};