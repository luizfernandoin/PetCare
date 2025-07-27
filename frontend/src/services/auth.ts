import api from "@/config/api";
import { User, UserCreate, userRoleMapper  } from "@/types/User";
import { ApiResponse } from "@/types/api";
import { Login } from "@/types/auth";


export const registerUser = async (userDTO: UserCreate): Promise<User | undefined> => {
    const response = await api.post<ApiResponse<User>>('/auth/register', { ...userDTO, tipo: userRoleMapper[userDTO.tipo] });

    return response.data.data;
}

export const loginUser = async (loginDTO: Login): Promise<string | undefined> => {
    const response = await api.post<ApiResponse<null>>('/auth/login', loginDTO);
    return response.data.token;
}