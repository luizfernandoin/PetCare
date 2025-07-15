import { CardService } from "@/components/molecules/card-service";
import { PageHeader } from "@/components/molecules/page-header";

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