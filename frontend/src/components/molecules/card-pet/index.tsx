import { Edit, Trash } from "lucide-react";
import ModalEditPet from "../modal-edit-pet";
import { useState } from "react";

type Pet = {
  name: string;
  breed: string;
  size: string;
  age: number;
  features: string;
  image: string
};

interface props {
  image: string,
  name: string;
  breed: string;
  size: string;
  age: number;
  features: string;
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>
}
export default function CardPet({name, breed, size, age, features, image, setPets}: props) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    if (setPets) setPets(prevPets => prevPets.filter(pet => pet.name !== name))
  }

  const handleEdit = () => {
    setOpen(true);
  }

  return (
    <div className="relative max-w-60 rounded overflow-hidden">
      <div className="absolute top-0 w-full flex justify-between p-2 rounded-2xl">
        <Trash onClick={handleDelete} size={30} color="white" className="bg-red-500 p-1.5 rounded cursor-pointer"/>
        <Edit onClick={handleEdit} size={30} color="white" className="bg-[#467C98] p-1.5 rounded cursor-pointer" />
      </div>
      <img className="object-cover h-full min-h-96" src={image} alt="Dog" />
      <div className="absolute w-full p-2 text-center bottom-0 bg-[#F0F0F0]">
        {name}
      </div>
      <ModalEditPet open={open} setOpen={setOpen} name={name} breed={breed} size={size} age={String(age)} features={features} imagem={image} setPets={setPets}/>
    </div>
  )
}
