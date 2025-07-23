import api from "@/config/api";
import { ApiResponse } from "@/types/api";
import { User, UserUpdate } from "@/types/User";


export const getAllUsers = async (): Promise<User[]> => {
    const response = await api.get<ApiResponse<User[]>>('/users/');

    return response.data.data!;
}

export const getProfile = async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/users/profile');

    return response.data.data!;
}

export const getUserById = async (userId: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/${userId}`);

    return response.data.data!;
}

export const deleteAuthenticatedUser = async (): Promise<string> => {
    const response = await api.delete<ApiResponse<null>>('/users/');

    return response.data.message!;
}

export const deleteUserById = async (userId: string): Promise<string> => {
    const response = await api.delete<ApiResponse<null>>(`/users/${userId}`);

    return response.data.message!;
}

export const updateAuthenticatedUser = async (userDTO: UserUpdate): Promise<User> => {
    const response = await api.put<ApiResponse<User>>('/profile', userDTO);

    return response.data.data!;
}