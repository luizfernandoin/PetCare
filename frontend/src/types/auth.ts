import { User } from "./User";
import { USER_ROLE } from "@petcare/shared/enums";
type Login = {
    email: string;
    password: string;
};

type AuthRole =  `${USER_ROLE}` | "NOT_LOGGED";

type LoginResult = {
  token: string;
  user: User;
} | undefined;


export {
    Login,
    AuthRole,
    LoginResult
};