import api from "@/config/api";
import { ApiResponse } from "@/types/api";
import { Service, ServiceCreate } from "@/types/service";



export const getAllServices = async (): Promise<Service[]> => {
    const response = await api.get<ApiResponse<Service[]>>('/services/');
    return response.data.data!;
}

export const getServicesByClinicaId = async (clinicaId: string): Promise<Service[]> => {
    const response = await api.get<ApiResponse<Service[]>>(`/services/${clinicaId}/services`);

    return response.data.data!
}

export const createService = async (clinicaId: string, serviceDTO: ServiceCreate): Promise<Service> => {
    const response = await api.post<ApiResponse<Service>>(`/services/${clinicaId}/services`, serviceDTO);

    return response.data.data!;
}