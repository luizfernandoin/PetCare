import CardPet from "@/components/molecules/card-pet";
import ModalAddPet from "@/components/molecules/modal-add-pet";
import { PageHeader } from "@/components/molecules/page-header";
import { useEffect, useState } from "react";
import { getAllPets } from "@/services/pet";
import { usePetStore } from "@/stores/petStore";


export function Pets() {
  const [open, setOpen] = useState(false);
  const {pets, clear, addListPet} = usePetStore()

  const handleGetPets = async () => {
    getAllPets().then((myPets) => {
      clear();
      addListPet(myPets)
    })
  }
  useEffect(() => {
    handleGetPets()
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
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 justify-items-center">
        {pets.map((pet) => (
          <CardPet
            key={pet.id}
            pet={pet}
          />
        ))}
        {pets.length === 0 && <p className="col-span-4">Nenhum pet registrado!  </p>}
      </div>
      <ModalAddPet open={open} setOpen={setOpen} />
    </>
  )
}
