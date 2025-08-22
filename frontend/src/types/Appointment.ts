import { AppointmentCreate } from "@petcare/shared";


type Appointment = AppointmentCreate & {
    id: string;
    userId: string;
    clinicId: string;
}

type AppointmentUpdate = Partial<AppointmentCreate>


export {
    Appointment,
    AppointmentUpdate
};