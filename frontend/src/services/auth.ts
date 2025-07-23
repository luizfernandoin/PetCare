import api from "@/config/api";
import { User, UserCreate } from "@/types/User";
import { ApiResponse } from "@/types/api";
import { Login } from "@/types/auth";


export const registerUser = async (userDTO: UserCreate): Promise<User> => {
    const response = await api.post('/auth/register', userDTO);

    return response.data.data;
}

export const LoginUser = async (loginDTO: Login): Promise<string> => {
    const response = await api.post<ApiResponse<null>>('/auth/login', loginDTO);
    
    return response.data.token!;
}