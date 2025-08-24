import api from "@/config/api";
import { ApiResponse } from "@/types/api";
import { AppointmentFull, CreateAppointmentResponse } from "@/types/Appointment";
import { AppointmentCreate } from "@petcare/shared";


const createAppointment = async (
    appointmentDTO: AppointmentCreate,
    clinicId: string
): Promise<CreateAppointmentResponse> => {
    try {
        const response = await api.post<CreateAppointmentResponse>(
            `/clinics/${clinicId}/appointments`,
            appointmentDTO
        );

        return response.data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

const getAppointmentsByUserId = async (): Promise<ApiResponse<AppointmentFull[]> | undefined> => {
    try {
        const response = await api.get(`/users/appointments`);

        return response.data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}


export {
    createAppointment,
    getAppointmentsByUserId
}