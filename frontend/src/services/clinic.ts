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

const getClinicByServiceId = async (serviceId: string): Promise<Clinic | null> => {
    try {
        const response = await api.get<ApiResponse<Clinic>>(`/services/${serviceId}/clinic`);
        return response.data.data || null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const filterClinics = async (
    filters: ClinicFilterOptions
): Promise<Clinic[]> => {
    try {
        const response = await api.get<ApiResponse<Clinic[]>>("/clinics/filter", {
            params: filters,
        });

        return response.data.data || [];
    } catch (error) {
        console.error("❌ Error filtering clinics:", error);
        return [];
    }
};
