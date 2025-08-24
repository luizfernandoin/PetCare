import { AppointmentCreate } from "@petcare/shared";
import { ApiResponse } from "./api";
import { Pet } from "./pet";
import { Service } from "./service";
import { Clinic } from "./clinic";


type Appointment = AppointmentCreate & {
    id: string;
    userId: string;
    clinicId: string;
}

type AppointmentFull = AppointmentCreate & {
    id: string;
    userId: string;
    pet: Pet;
    service: Service;
    clinic: Clinic;
};

type AppointmentUpdate = Partial<AppointmentCreate>

type CreateAppointmentResponse = ApiResponse<Appointment> | undefined;

type AppointmentDisplay = {
    id: string;
    pet: string;
    service: string;
    clinic: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
};


export {
    Appointment,
    AppointmentUpdate,
    CreateAppointmentResponse,
    AppointmentDisplay,
    AppointmentFull
};