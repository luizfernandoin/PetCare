import CardPet from "@/components/molecules/card-pet";
import ModalAddPet from "@/components/molecules/modal-add-pet";
import { PageHeader } from "@/components/molecules/page-header";
import { useState } from "react";

export function Pets() {
  const [open, setOpen] = useState(false);

  type Pet = {
  name: string;
  breed: string;
  size: string;
  age: number;
  features: string;
};

const [pets, setPets] = useState<Pet[]>([
  {
    name: "Thor",
    breed: "Labrador",
    size: "Grande",
    age: 3,
    features: "Brincalhão, dócil, adora água",
  },
  {
    name: "Luna",
    breed: "Poodle",
    size: "Pequeno",
    age: 5,
    features: "Muito inteligente, gosta de colo",
  },
  {
    name: "Max",
    breed: "Bulldog",
    size: "Médio",
    age: 2,
    features: "Tranquilo, dorminhoco, leal",
  },
])
  return (
    <>
      <PageHeader
        title="Meus Pets"
        description="Todos os seus pets registrados"
        buttonLabel="Novo Pet"
        onButtonClick={() => {
          setOpen(true)
        }}
      />
      <div className="relative grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {pets.map((pet) => (
          <CardPet
            key={pet.name}
            name={pet.name}
            image="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          />
        ))}
      </div>
      <ModalAddPet open={open} setOpen={setOpen} setPets={setPets}/>
    </>
  )
}
