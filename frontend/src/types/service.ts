import { ServiceCreate } from "@petcare/shared";
import { SERVICE_TYPE } from "@petcare/shared/enums";


type Service = {
    id: string;
    type: SERVICE_TYPE;
    name: string;
    description?: string;
}

type ServiceUpdate = Partial<ServiceCreate>;


export {
    Service,
    ServiceCreate,
    ServiceUpdate,
};