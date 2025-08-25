import { AppointmentFull } from "@/types/Appointment";
import { Clinic } from "@/types/clinic";
import { Pet } from "@/types/pet";
import { Service } from "@/types/service";
import { create } from "zustand";


interface AppointmentState {
    appointments: AppointmentFull[];
    pets: Pet[];
    services: Service[];
    clinics: Clinic[];
    isLoading: boolean;
    isLoadingData: boolean;
    error: string | null;
    isRefreshing: boolean;

    setAppointments: (appointments: AppointmentFull[]) => void;
    setPets: (pets: Pet[]) => void;
    setServices: (services: Service[]) => void;
    setClinics: (clinics: Clinic[]) => void;
    setIsLoading: (isLoading: boolean) => void;
    setIsLoadingData: (isLoadingData: boolean) => void;
    setError: (error: string | null) => void;
    setIsRefreshing: (isRefreshing: boolean) => void;

    addAppointment: (newAppointment: AppointmentFull) => void;
    removeAppointment: (id: string) => void;
    clearError: () => void;
}


export const useAppointmentStore = create<AppointmentState>((set) => ({
    appointments: [],
    pets: [],
    services: [],
    clinics: [],
    isLoading: true,
    isLoadingData: true,
    error: null,
    isRefreshing: false,

    setAppointments: (appointments) => set({ appointments }),
    setPets: (pets) => set({ pets }),
    setServices: (services) => set({ services }),
    setClinics: (clinics) => set({ clinics }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setIsLoadingData: (isLoadingData) => set({ isLoadingData }),
    setError: (error) => set({ error }),
    setIsRefreshing: (isRefreshing) => set({ isRefreshing }),


    addAppointment: (newAppointment: AppointmentFull) =>
        set((state) => ({
            appointments: [...state.appointments, newAppointment],
        })),

    removeAppointment: (id) =>
        set((state) => ({
            appointments: state.appointments.filter(item => item.id !== id)
        })),

    clearError: () => set({ error: null }),
}));