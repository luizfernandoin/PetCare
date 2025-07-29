import { Edit, Trash } from "lucide-react";
import ModalEditPet from "../modal-edit-pet";
import { useState } from "react";

import { PetCreate } from "@/types/pet";

interface props extends PetCreate{
    setPets: React.Dispatch<React.SetStateAction<PetCreate[]>>
}

export default function CardPet({ name, breed, size, age, features, image, setPets }: props) {
    const [open, setOpen] = useState(false);

    const handleDelete = () => {
        if (setPets) setPets(prevPets => prevPets.filter(pet => pet.name !== name))
    }

    const handleEdit = () => {
        setOpen(true);
    }

    return (
        <div className="p-4 bg-gray-100 rounded">
            <div className="relative max-w-60 rounded overflow-hidden shadow-md border border-gray-200">
                <div className="absolute top-0 w-full flex justify-between p-2 rounded-2xl">
                    <span data-testid={`delete-${name}`} >
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
                    name={name} 
                    breed={breed} 
                    size={size} 
                    age={age} 
                    features={features} 
                    image={image} 
                    setPets={setPets} />
            </div>
        </div>
    )
}
