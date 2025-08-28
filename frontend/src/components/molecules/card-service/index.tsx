import { Service } from "@/types/service"
import { ArrowRight } from "lucide-react"
import { serviceData } from "./data";

interface props {
  service: Service
}

export function CardService({ service }: props) {
  //const { description, icon, action, alt, className } = serviceData[type]

  const { name, description, type } = service;
  const { className, icon} = serviceData[type];

  return (
    <div className={className}>

      <img className="w-16" src={icon} alt={type} />
      <div className="space-y-1">
        <h1 className="font-semibold text-lg">{name}</h1>
        <p className="text-xs">{description}</p>
      </div>
      <p 
        className="flex items-center gap-2 mt-5 text-xs font-medium text-left w-min" 
        onClick={()=>console.log("action service click")}
      >SELECT <ArrowRight size={16}/></p>
    </div>
  )
}
