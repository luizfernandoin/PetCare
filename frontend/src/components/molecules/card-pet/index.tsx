import { Edit, Trash } from "lucide-react";
interface props {
  name: string,
  image: string
}
export default function CardPet({name, image}: props) {
  return (
    <div className="relative max-w-60 rounded overflow-hidden">
      <div className="absolute top-0 w-full flex justify-between p-2 rounded-2xl">
        <Trash size={30} color="white" className="bg-red-500 p-1.5 rounded"/>
        <Edit size={30} color="white" className="bg-[#467C98] p-1.5 rounded" />
      </div>
      <img src={image} alt="Dog" />
      <div className="absolute w-full p-2 text-center bottom-0 bg-[#F0F0F0]">
        {name}
      </div>
    </div>
  )
}
