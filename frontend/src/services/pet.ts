import api from "@/config/api";
import { ApiResponse } from "@/types/api";
import { Pet, PetCreate, PetUpdate } from "@/types/pet";


export const createPet = async (petDTO: PetCreate): Promise<Pet> => {
    const response = await api.post<ApiResponse<Pet>>('/pets/', petDTO);

    return response.data.data!;
}

export const getAllPets = async (): Promise<Pet[]> => {
    const response = await api.get<ApiResponse<Pet[]>>('/pets/');

    return response.data.data!;
}

export const getPetById = async (petId: string): Promise<Pet> => {
    const response = await api.get<ApiResponse<Pet>>(`/pets/${petId}`);

    return response.data.data!;
}

export const updatePet = async (petId: string, petDTO: PetUpdate): Promise<Pet> => {
    const response = await api.put<ApiResponse<Pet>>(`/pets/${petId}`, petDTO);

    return response.data.data!
}

export const deletePet = async (petId: string): Promise<string> => {
    const response = await api.delete<ApiResponse<null>>(`/pets/${petId}`);

    return response.data.message!;
}