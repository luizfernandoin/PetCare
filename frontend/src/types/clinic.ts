import { ClinicCreate } from "@petcare/shared";

type Clinic = {
    id: string;
    name: string;
    phone: string;
    location: string;
    image?: string;
}

type ClinicUpdate = Partial<ClinicCreate>;

export {
    Clinic,
    ClinicUpdate
};