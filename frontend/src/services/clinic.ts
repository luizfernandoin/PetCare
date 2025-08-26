import api from "@/config/api";
import { ApiResponse } from "@/types/api";
import { Clinic } from "@/types/clinic";



export type ClinicFilterOptions = {
    services?: string[];
    name?: string;
    radius?: number;
    latitude?: number;
    longitude?: number;
};

// const getClinicByServiceId = async (serviceId: string): Promise<Clinic | null> => {
//     try {
//         const response = await api.get<ApiResponse<Clinic>>(`/services/${serviceId}/clinic`);
//         return response.data.data || null;
//     } catch (error) {
//         console.error(error);
//         return null;
//     }
// }

export const getClinicById = async (clinicId: string): Promise<ApiResponse<Clinic>> => {
    try {
        const response = await api.get<ApiResponse<Clinic>>(`/clinics/${clinicId}`);
        return response.data;
    } catch (error) {
        console.error("❌ Error fetching clinic by ID:", error);
        throw error;
    }
};

export const filterClinics = async (
    filters: ClinicFilterOptions
): Promise<Clinic[]> => {
    try {
        const params = new URLSearchParams();

        if (filters.services) {
            filters.services.forEach(service => {
                params.append('services', service);
            });
        }

        if (filters.name) params.append('name', filters.name);
        if (filters.radius) params.append('radius', filters.radius.toString());
        if (filters.latitude) params.append('latitude', filters.latitude.toString());
        if (filters.longitude) params.append('longitude', filters.longitude.toString());

        const response = await api.get<ApiResponse<Clinic[]>>("/clinics/filter", {
            params: params,
        });

        return response.data.data || [];
    } catch (error) {
        console.error("❌ Error filtering clinics:", error);
        return [];
    }
};


export const getClinicsByProfessionalId = async (professionalId: string): Promise<{
  clinicId: string;
  userId: string;
}[]> => {
    try {
        const response = await api.get<ApiResponse<{
  clinicId: string;
  userId: string;
}[]>>(
            `/users/myclinics/${professionalId}`
        );
        console.log("response.data.data", response.data.data);
        
        return response.data.data || [];
    } catch (error) {
        console.error("❌ Error fetching clinics by professional ID:", error);
        return [];
    }
}
