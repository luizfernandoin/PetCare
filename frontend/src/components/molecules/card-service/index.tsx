import imageBath from "/src/assets/icons/bath.svg"
import imageGrooming from "/src/assets/icons/grooming.svg"
import imageVaccination from "/src/assets/icons/vaccination.svg"
import { ArrowRight } from "lucide-react"

type serviceType = "bath" | "grooming" | "vaccination"

interface props {
  type: serviceType
}

interface typeServiceData {
  description: string,
  icon: string,
  action: () => void,
  alt: string,
  className: string
}

const serviceData: Record<serviceType, typeServiceData> = {
  "bath": {
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum labore voluptatem assumenda rerum autem recusandae maxime atque praesentium?",
    icon: imageBath,
    alt: "Banho",
    action: () => { alert("Baño") },
    className: "bg-[#DDC8EF] p-4 flex flex-col gap-3 min-w-56 rounded"
  },
  "grooming": {
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum labore voluptatem assumenda rerum autem recusandae maxime atque praesentium? ",
    icon: imageGrooming,
    alt: "Banho",
    action: () => { alert("Baño") },
    className: "bg-[#CCEBEF] p-4 flex flex-col gap-3 min-w-56 rounded"
  },
  "vaccination": {
    description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum labore voluptatem assumenda rerum autem recusandae maxime atque praesentium? ",
    icon: imageVaccination,
    alt: "Banho",
    action: () => { alert("Baño") },
    className: "bg-[#DCF6F8] p-4 flex flex-col gap-3 min-w-56 rounded"
  }
}

export function CardService({ type }: props) {
  const { description, icon, action, alt, className } = serviceData[type]

  return (
    <div className={className}>

      <img className="w-16" src={icon} alt={alt} />
      <div className="space-y-1">
        <h1 className="font-semibold text-lg">{type}</h1>
        <p className="text-xs">{description}</p>
      </div>
      <p className="flex items-center gap-2 mt-5 text-xs font-medium text-left w-min" onClick={action}>SELECT <ArrowRight size={16}/></p>
    </div>
  )
}
