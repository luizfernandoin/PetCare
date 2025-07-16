import { Edit, Trash } from "lucide-react";

type Pet = {
  name: string;
  breed: string;
  size: string;
  age: number;
  features: string;
};

interface props {
  name: string,
  image: string,
  setPets: React.Dispatch<React.SetStateAction<Pet[]>>
}
export default function CardPet({name, image, setPets}: props) {
  const handleDelete = () => {
    setPets(prevPets => prevPets.filter(pet => pet.name !== name))
  }
  
  return (
    <div className="relative max-w-60 rounded overflow-hidden">
      <div className="absolute top-0 w-full flex justify-between p-2 rounded-2xl">
        <Trash onClick={handleDelete} size={30} color="white" className="bg-red-500 p-1.5 rounded cursor-pointer"/>
        <Edit size={30} color="white" className="bg-[#467C98] p-1.5 rounded cursor-pointer" />
      </div>
      <img src={image} alt="Dog" />
      <div className="absolute w-full p-2 text-center bottom-0 bg-[#F0F0F0]">
        {name}
      </div>
    </div>
  )
}
