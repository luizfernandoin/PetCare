import { CardService } from "@/components/molecules/card-service";
import { PageHeader } from "@/components/molecules/page-header";
import { createService, getAllServices } from "@/services/service";
import { Service } from "@/types/service";
import { SERVICE_TYPE } from "@petcare/shared/enums";
import { useEffect, useState } from "react";

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(()=>{
    getAllServices()
    .then((myServices: Service[]) => {
      setServices(myServices)});
  }, []) 

  const handleAddService = () => {
    const newService = createService({
      name: "Banho Higienico",
      type: SERVICE_TYPE.GROOMING,
      description: "Banho completo com shampoo neutro e secagem"
    })
  }
  
    return (
        <>
            <PageHeader
                title="Serviços da Clínica"
                description="Resumo das atividades e estatísticas"
                buttonLabel="Adicionar Serviço"
                onButtonClick={handleAddService}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.map((service) => (
                    <CardService
                        key={service.id}
                        service={service}
                    />
                ))}
            </div>
        </>
    );

}