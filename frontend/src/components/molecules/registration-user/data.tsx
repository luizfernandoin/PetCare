import { UserCreate } from "@/types/User";

export const defaultUser: UserCreate = {
    nome: "jose",
    email: "jose4@gmail.com",
    telefone: "34999999999",
    senha: "123123",
    tipo: "CLIENTE",
    location: {
      street: "Avenida Paulista",
      number: "1578",
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
      postalcode: "01310-200"
    }
  }