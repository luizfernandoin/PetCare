import { UserCreate } from "@/types/User";

export const defaultUser: UserCreate = {
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    tipo: "CLIENTE",
    location: {
      street: "",
      number: "",
      city: " ",
      state: "",
      country: "",
      postalcode: ""
    },
    image:""
  }