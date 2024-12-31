import { where } from "sequelize";
import { TrabalhaClinica } from "../models/index";

class Clinica {
    constructor(clinicaModel) {
        this.clinica = clinicaModel;
    }

    async getOwnerId(clinicaId) {
        try {
            const ownerRecord = await TrabalhaClinica.findOne({
                where: { clinicaId: clinicaId },
            });
    
            if (!ownerRecord) {
                throw new Error("Proprietário não encontrado para esta clínica!");
            }
    
            console.log("Owner Record: ", ownerRecord);
    
            return ownerRecord.userId;
        } catch (error) {
            console.error("Erro ao buscar ownerId:", error.message);
            throw new Error("Erro ao buscar ownerId.");
        }
    }

    async getElementById(clinicaId) {
        try {
            const clinica = await this.clinica.findByPk(clinicaId);

            if (!clinica) {
                return { error: "Clinica não encontrada!", status: 404 };
            }
    
            return clinica;
        } catch (error) {
            return { status: 500, error: "Erro ao buscar clinica:  " + error.message };
        }
    }

    async getAllClinicas() {
        try {
            const clinicas = await this.clinica.findAll();

            return { status: 200, message: "Clinicas encontrados com sucesso.", data: clinicas };
        } catch (error) {
            return { status: 500, message: "Erro ao buscar clinicas.", error: error.message };
        }
    }

    async getClinicaById(clinicaId) {
        try {
            const clinica = await this.clinica.findByPk(clinicaId);

            if (!clinica) {
                return { error: "Clinica não encontrada!", status: 404 };
            }
    
            return clinica;
        } catch (error) {
            return { status: 500, error: "Erro ao buscar clinica:  " + error.message };
        }
    }

    async createClinica(clinicaDTO, user) {
        const { nome, telefone } = clinicaDTO;
    
        if (!nome || !telefone) {
            return { status: 400, message: "Nome e telefone são obrigatórios." };
        }
    
        try {
            const newClinica = await this.clinica.create(clinicaDTO);

            await user.addClinica(newClinica);
    
            return { 
                status: 201, 
                message: `Clínica ${newClinica.nome} criada e associada ao usuário ${user.nome} com sucesso!`, 
                data: newClinica 
            };
        } catch (error) {    
            if (error.name === "SequelizeValidationError") {
                return {
                    status: 400,
                    message: "Erro de validação.",
                    errors: error.errors.map((err) => err.message),
                };
            }
    
            return { status: 500, message: "Erro interno ao adicionar clinica.", error: error.message };
        }
    }

    async deleteClinica(clinicaId, user) {
        console.log(user);
        try {
            const clinica = await this.clinica.findOne({ where: { id: clinicaId } });
            console.log(clinica)

            if (!clinica) {
                return {
                    status: 404,
                    message: "Clinica não encontrada!"
                };
            }

            await user.removeClinica(clinica);
            await clinica.destroy();

            return {
                status: 200,
                message: `Clínica ${clinica.nome} deletada com sucesso!`
            }
        } catch(error) {
            if (error.name === "SequelizeDatabaseError") {
                return {
                    status: 500,
                    message: "Erro ao acessar o banco de dados ao tentar deletar a clínica.",
                    error: error.message,
                };
            }

            return { 
                status: 500, 
                message: "Erro interno ao deletar clínica.", 
                error: error.message 
            };
        }
    }
}


export default Clinica;