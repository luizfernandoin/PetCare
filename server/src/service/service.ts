class Service {
    constructor(serviceModel) {
        this.service = serviceModel;
    }

    async createService(serviceDTO, clinica) {
        const { tipo, observacoes } = serviceDTO;
        const clinicaId = clinica.id;

        if (!tipo) {
            return { status: 400, message: "Tipo do serviço é obrigatorio." };
        }
    
        try {
            const newService = await this.service.create({
                tipo,
                observacoes,
                clinicaId,
            });
    
            return { 
                status: 201, 
                message: `Serviço adicionado a clinica ${clinica.nome} com sucesso!`, 
                data: newService 
            };
        } catch (error) {    
            if (error.name === "SequelizeValidationError") {
                return {
                    status: 400,
                    message: "Erro de validação.",
                    errors: error.errors.map((err) => err.message),
                };
            }
    
            return { status: 500, message: "Erro interno ao adicionar serviço.", error: error.message };
        }
    }

    async getServicesByClinicaId(clinicaId) {
        try {
            const services = this.service.findAll({
                where: {
                    clinicaId
                }
            });

            return { status: 200, message: "Serviços encontrados com sucesso.", data: services };
        } catch (error) {
            return { status: 500, message: "Erro ao buscar serviços.", error: error.message };
        }
    }
}


export default Service;