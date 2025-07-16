import CardPet from "@/components/molecules/card-pet";
import ModalAddPet from "@/components/molecules/modal-add-pet";
import { PageHeader } from "@/components/molecules/page-header";
import { useEffect, useState } from "react";

type Pet = {
  name: string;
  breed: string;
  size: string;
  age: number;
  features: string;
  image: string
};

const petsMock: Pet[] = [
  {
    name: "Thor",
    breed: "Labrador",
    size: "Grande",
    age: 3,
    features: "Brincalhão,どcil, adora água",
    image:"https://i.pinimg.com/736x/eb/a8/e8/eba8e8a51e9692156cadc66446672a49.jpg"
  },
  {
    name: "Luna",
    breed: "Poodle",
    size: "Pequeno",
    age: 5,
    features: "Muito inteligente, gosta de colo",
    image:"https://hips.hearstapps.com/clv.h-cdn.co/assets/16/18/gettyimages-586890581.jpg?crop=0.668xw:1.00xh;0.219xw,0&resize=980:*"
  },
  {
    name: "Max",
    breed: "Bulldog",
    size: "Médio",
    age: 2,
    features: "Tranquilo, dorminhoco, leal",
    image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqRcQH4JIuXXAcg8EDCq42WBYpv_EQiwAKrA&s"
  },
];

export function Pets() {
  const [open, setOpen] = useState(false);
  const [pets, setPets] = useState<Pet[]>([])

  useEffect(() => {
    setPets(petsMock)
  }, [])

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
            setPets={setPets}
            key={pet.name}
            name={pet.name}
            breed={pet.breed}
            size={pet.size}
            age={pet.age}
            features={pet.features}
            image={pet.image}
          />
        ))}
        {pets.length === 0 && <p className="col-span-4">Nenhum pet registrado!  </p>}
      </div>
      <ModalAddPet open={open} setOpen={setOpen} setPets={setPets} />
    </>
  )
}
