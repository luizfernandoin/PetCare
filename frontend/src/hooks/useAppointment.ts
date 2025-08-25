// hooks/useAppointment.ts
import { getAppointmentsByUserId, createAppointment, deleteAppointmentById } from "@/services/appointments";
import { getClinicById } from "@/services/clinic";
import { getPetById } from "@/services/pet";
import { getServiceById } from "@/services/service";
import { useAppointmentStore } from "@/stores/appointmentStore";
import { Appointment, AppointmentFull } from "@/types/Appointment";
import { AppointmentCreate } from "@petcare/shared";
import { useCallback } from "react";


export const useAppointment = () => {
    const {
        appointments,
        isLoading,
        error,
        setAppointments,
        setIsLoading,
        setError,
        addAppointment,
        removeAppointment
    } = useAppointmentStore();

    const enrichAppointment = useCallback(async (appointment: Appointment): Promise<AppointmentFull> => {
        try {
            const [pet, service, clinic] = await Promise.all([
                getPetById(appointment.petId),
                getServiceById(appointment.serviceId),
                getClinicById(appointment.clinicId)
            ]);

            if (!service.data || !pet || !clinic.data) {
                throw new Error("Dados incompletos");
            }

            return {
                ...appointment,
                pet: pet,
                service: service.data,
                clinic: clinic.data
            };
        } catch (error) {
            console.error('Erro ao enriquecer appointment:', error);
            throw error;
        }
    }, []);


    const loadAppointments = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await getAppointmentsByUserId();

            if (Array.isArray(response?.data)) {
                const enrichedAppointments = await Promise.all(
                    response.data.map(appointment => enrichAppointment(appointment))
                );

                console.log("Enriched Appointments:", enrichedAppointments);
                setAppointments(enrichedAppointments);
                console.log("Appointments loaded:", appointments);
            }
        } catch (error) {
            console.error("Erro ao carregar agendamentos:", error);
            setError("Erro ao carregar agendamentos");
            throw error;
        } finally {
            setIsLoading(false);
        }
    }, [setAppointments, setIsLoading, setError]);

    const createNewAppointment = useCallback(async (
        appointmentData: AppointmentCreate,
        clinicId: string
    ): Promise<AppointmentFull | null> => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await createAppointment(appointmentData, clinicId);

            if (!response || !response.data) {
                throw new Error("Falha ao criar agendamento");
            }

            const enrichedAppointment = await enrichAppointment(response.data);

            addAppointment(enrichedAppointment);

            return enrichedAppointment;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Erro ao criar agendamento";
            setError(errorMessage);

            console.error("Erro ao criar agendamento:", err);
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [setAppointments, setIsLoading, setError]);

    const deleteAppointment = useCallback(async (id: string) => {
        try {
            await deleteAppointmentById(id);

            removeAppointment(id);
        } catch (error) {
            const errorMessage = "Erro ao excluir agendamento";
            setError(errorMessage);

            console.error("Erro ao excluir agendamento:", error);
            throw error;
        }
    }, [setAppointments, setError]);

    const clearError = useCallback(() => {
        setError(null);
    }, [setError]);

    return {
        appointments,
        isLoading,
        error,
        loadAppointments,
        createNewAppointment,
        deleteAppointment,
        clearError
    };
};