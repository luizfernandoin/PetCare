import api from "@/config/api";
import { ApiResponse } from "@/types/api";
import { Appointment, CreateAppointmentResponse } from "@/types/Appointment";
import { AppointmentCreate } from "@petcare/shared";


const createAppointment = async (
    appointmentDTO: AppointmentCreate,
    clinicId: string
): Promise<CreateAppointmentResponse> => {
    const response = await api.post<CreateAppointmentResponse>(
        `/clinics/${clinicId}/appointments`,
        appointmentDTO
    );

    return response.data;
};

const getAppointmentsByUserId = async (): Promise<ApiResponse<Appointment[]> | undefined> => {
    try {
        const response = await api.get(`/users/appointments`);

        return response.data;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

const deleteAppointmentById = async (appointmentId: string): Promise<void> => {
    await api.delete(`/users/appointments/${appointmentId}`);
}

export {
    createAppointment,
    getAppointmentsByUserId,
    deleteAppointmentById
}