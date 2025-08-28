import { UserCreate } from "@/types/User";
import { USER_ROLE } from "@petcare/shared/enums";

export const defaultUser: UserCreate = {
  name: "",
  email: "",
  phone: "",
  password: "",
  role: USER_ROLE.CLIENT,
  location: {
    street: "",
    number: "",
    city: "",
    state: "",
    country: "",
    postalcode: ""
  },
  image: ""
}