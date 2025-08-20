import { CardService } from "@/components/molecules/card-service";
import { PageHeader } from "@/components/molecules/page-header";


const servicesData = [
    {
        "id": "svc_001",
        "name": "Banho Higiênico",
        "category": "Estético",
        "description": "Banho completo com shampoo neutro e secagem",
        "duration": 45,
        "basePrice": 60.00,
        "image": "https://example.com/pet-bath.jpg",
        "tags": ["essencial", "pequenos-portes"],
        "clinicIds": ["clinic_01", "clinic_02"]
    },
    {
        "id": "svc_002",
        "name": "Vacina V10",
        "category": "Saúde",
        "description": "Imunização contra 10 doenças caninas",
        "duration": 20,
        "basePrice": 90.00,
        "image": "https://example.com/vaccine.jpg",
        "tags": ["obrigatória", "cães"],
        "clinicIds": ["clinic_01", "clinic_03"]
    },
    {
        "id": "custom_001",
        "name": "Banho Terapêutico",
        "clinicId": "clinic_01",
        "description": "Banho com óleos essenciais para pets ansiosos",
        "duration": 60,
        "price": 120.00,
        "isPremium": true,
        "rating": 4.9,
        "image": "https://example.com/spa-pet.jpg",
        "requirements": ["Atestado de saúde recente"]
    }
]

export default function Services() {
    return (
        <>
            <PageHeader
                title="Serviços da Clínica"
                description="Resumo das atividades e estatísticas"
                buttonLabel="Adicionar Serviço"
                onButtonClick={() => console.log("Adicionando Serviço...")}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CardService type="grooming" />
                <CardService type="bath" />
                <CardService type="vaccination" />
                <CardService type="vaccination" />
            </div>
        </>
    );

}