import { Edit, Trash } from "lucide-react";
import ModalEditPet from "../modal-edit-pet";
import { useState } from "react";

import { Pet } from "@/types/pet";
import { deletePet } from "@/services/pet";
import { usePetStore } from "@/stores/petStore";

interface props {
  pet: Pet;
}

export default function CardPet({ pet }: props) {
  const { id, name, image } = pet;
  const { remove } = usePetStore();
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    const message = await deletePet(id)
    if (message) remove(id)
  }

  const handleEdit = () => {
    setOpen(true);
  }

  return (
    <div className="p-4 bg-gray-100 rounded">
      <div className="relative max-w-60 rounded overflow-hidden shadow-md border border-gray-200">
        <div className="absolute top-0 w-full flex justify-between p-2 rounded-2xl">
          <span data-testid={`delete-${id}`} >
            <Trash onClick={handleDelete} size={30} color="white" className="bg-red-500 p-1.5 rounded cursor-pointer" />
          </span>
          <span>
            <Edit onClick={handleEdit} size={30} color="white" className="bg-[#467C98] p-1.5 rounded cursor-pointer" />
          </span>
        </div>
        <img className="object-cover h-full min-h-96" src={image} alt="Dog" />
        <div className="absolute w-full p-2 text-center bottom-0 bg-[#F0F0F0]">
          {name}
        </div>
        <ModalEditPet
          open={open}
          setOpen={setOpen}
          pet={pet}
        />
      </div>
    </div>
  )
}
