import { User, UserRole } from "./User";

type Login = {
    email: string;
    senha: string;
};

type AuthRole = UserRole | "NAO_LOGADO";

type LoginResult = {
  token: string;
  user: User;
} | undefined;


export {
    Login,
    AuthRole,
    LoginResult
};