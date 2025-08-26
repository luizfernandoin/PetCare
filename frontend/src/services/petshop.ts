import api from "@/config/api"
import { ApiResponse } from "@/types/api"
import { PetShop, PetShopCreate, WorksPetshop } from "@/types/Petshop"
import { Schedule } from "@/types/schedule";


export const getAllClinicas = async (): Promise<PetShop[]> => {
    const response = await api.get<ApiResponse<PetShop[]>>('/clinics'); 

    return response.data.data!;
}

export const getNearbyClinicas = async (): Promise<PetShop[]> => {
    const response = await api.get<PetShop[]>('/clinicas/clinicas-proximas');

    return response.data;
}

export const getHorariosByClinicaId = async (petshopId: string): Promise<Schedule[]> => {
    const response = await api.get<ApiResponse<Schedule[]>>(`/clinicas/${petshopId}/horarios`);

    return response.data.data!;
}

export const vincularProfissional = async (clinicaId: string, userId: string): Promise<WorksPetshop> => {
    const response = await api.post<ApiResponse<WorksPetshop>>(`/clinicas/${clinicaId}/vincular-profissional/${userId}`);

    return response.data.data!;
}

export const desvincularProfissional = async (clinicaId: string, profissionalId: string): Promise<string> => {
    const response = await api.delete<ApiResponse<null>>(`/clinicas/${clinicaId}/desvincular-profissional/${profissionalId}`);

    return response.data.message;
}

export const createClinica = async (clinicaDTO: PetShopCreate): Promise<PetShop|undefined> => {
    try {
      const response = await api.post<ApiResponse<PetShop>>('/clinics', clinicaDTO);

    return response.data.data!;
    } catch (error) {
      console.log(error);
      
      console.log("erro ao criar clinica");
      return undefined
      
    }
}

export const addHorarios = async (petshopId: string): Promise<Schedule> => {
    const response = await api.post<ApiResponse<Schedule>>(`/clinicas/${petshopId}/horarios`);

    return response.data.data!;
}

export const deleteClinica = async (petshopId: string): Promise<PetShop> => {
    const response = await api.delete<ApiResponse<PetShop>>(`/clinicas/${petshopId}`);

    return response.data.data!;
}