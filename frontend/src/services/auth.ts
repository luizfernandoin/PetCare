import api from "@/config/api";
import { User, UserCreate } from "@/types/User";
import { ApiResponse } from "@/types/api";
import { Login, LoginResult } from "@/types/auth";
import { getProfile } from "./user";

export const registerUser = async (userDTO: UserCreate): Promise<User | undefined> => {
    try {
        const response = await api.post<ApiResponse<User>>('/auth/register', userDTO);
        return response.data.data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const loginUser = async (loginDTO: Login): Promise<LoginResult> => {
    try {
        const token = await getTokenUser(loginDTO);
        if (!token) return undefined;

        localStorage.setItem("token", token);
        const profile = await getProfile();
        if (!profile) return undefined;
        console.log(profile);

        const user = {
            ...profile,
            tipo: profile.role
        }

        return {
            user,
            token
        }
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const getTokenUser = async (loginDTO: Login): Promise<string | undefined> => {
    const response = await api.post<ApiResponse<null>>('/auth/login', loginDTO);
    return response.data.token;
}