import bcrypt from "bcrypt";
import { Model, ModelStatic, ValidationError, ValidationErrorItem } from "sequelize";
import {User} from "../models/user";
import { Response } from "../@types/Response";

class UserService {
    private user: ModelStatic<User>;

    constructor(userModel: ModelStatic<User>) {
        this.user = userModel;
    }

    async createUser(userDTO: User): Promise<Response> {
        const { email, nome, senha, telefone, uf, cidade, rua, bairro, num, tipo } = userDTO;
    
        if (!email || !nome || !senha || !telefone || !uf || !cidade || !rua || !bairro || !num || !tipo) {
            return { status: 400, message: "Todos os campos obrigatórios devem ser preenchidos." };
        }
    
        if (!["Cliente", "Profissional"].includes(tipo)) {
            return { status: 400, message: "O campo 'tipo' deve ser 'Cliente' ou 'Profissional'." };
        }

        const usuarioExiste = await this.user.findOne({ where: { email } });

        if (usuarioExiste) {
            return { status: 400, message: "E-mail já cadastrado." };
        }
    
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(senha, salt);
    
            const novoUsuario = await this.user.create({
                email,
                nome,
                senha: hashedPassword,
                telefone,
                uf,
                cidade,
                rua,
                bairro,
                num,
                tipo,
            });
    
            return { status: 201, message: "Usuário criado com sucesso!", data: novoUsuario };
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
    
            if (error instanceof ValidationError) {
                return {
                    status: 400,
                    message: "Erro de validação.",
                    errors: error.errors.map((err: ValidationErrorItem) => err.message),
                };
            }
    
            if (error instanceof Error) {
                return { status: 500, message: "Erro interno ao criar usuário.", error: error.message };
            }
    
            return { status: 500, message: "Erro interno ao criar usuário.", error: "Erro desconhecido." };
        }    
    }
    

    async get() {
        try {
            const users = await this.user.findAll({
                attributes: { exclude: ['senha']},
            });

            return { status: 200, message: "Usuários encontrados com sucesso.", data: users };
        } catch (error) {
            if (error instanceof Error) {
                return { status: 500, message: "Erro ao buscar usuários.", error: error.message };   
            }

            return { status: 500, message: "Erro ao buscar usuários.", error: "Erro desconhecido." };
        }
    }

    async getUserById(userId: string) {
        try {
            const user = await this.user.findOne({ 
                where: { id: userId },
                attributes: { exclude: ['senha'] } 
            })

            if (!user) {
                return null;
            }
    
            return user;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw error;
        }
    }

    async getUserByEmail(userEmail: string) {
        try {
            const user = await this.user.findOne({ 
                where: { email: userEmail },
                attributes: { exclude: ['senha'] }
            });

            if (!user) return null;

            return user;
        } catch (error) {
            console.error('Erro ao buscar usuário:', error);
            throw error;
        }
    }

    async deleteUser(userAuth) {
        try {
            const user = await this.getUserByEmail(userAuth.email);

            if(!user) {
                return { status: 404, message: "User não encontrado." };
            }

            await user.destroy();
    
            return {
                status: 200,
                message: "Usuário e seus pets deletados com sucesso.",
            };
        } catch (error) {
            console.error("Erro ao deletar pet:", error);
            if (error instanceof Error) {
                return {
                    status: 500,
                    message: "Erro ao deletar pet.",
                    error: error.message,
                };
            }

            return {
                status: 500,
                message: "Erro ao deletar pet.",
                error: "Erro desconhecido.",
            };
        }
    }

    async deleteUserById(id: string) {
        try {
            const usuario = await this.user.findOne({ where: { 'id': id } })
            
            if (!usuario) {
                return { error: "Usuário não encontrado!", status: 404 };
            }
    
            await usuario.destroy();
            return { message: "Usuário deletado com sucesso!", status: 200 };
        } catch (error) {
            if (error instanceof Error) {
                return { error: "Erro interno do servidor.", status: 500, details: error.message };
            }
            
            return { error: "Erro interno do servidor.", status: 500, details: "Erro desconhecido." };
        }

    }

    async deleteUserByEmail(email: string) {
        try {
            const userToDelete = await this.user.findOne({ where: { email } });

            if (!userToDelete) {
                return { status: 404, message: "Usuário não encontrado." };
            }

            await userToDelete.destroy();

            return { status: 200, message: "Usuário deletado com sucesso." };
        } catch (error) {
            if (error instanceof Error) {
                return { status: 500, message: "Erro interno do servidor.", error: error.message };
            }

            return { status: 500, message: "Erro interno do servidor.", error: "Erro desconhecido." };
        }
    }

    async updateUser(userAuth, updates: Partial<User>) {
        try {
            const usuario = await this.getUserByEmail(userAuth.email);

            if (!usuario) {
                return { status: 404, message: "Usuário não encontrado." };
            }

            await usuario.update(updates);

            return {
                status: 200,
                message: "Perfil atualizado com sucesso.",
                data: usuario,
            };
        } catch (error) {
            if (error instanceof Error) {
                return {
                    status: 500,
                    message: "Erro ao atualizar usuário.",
                    error: error.message,
                };
            }

            return {
                status: 500,
                message: "Erro ao atualizar usuário.",
                error: "Erro desconhecido."
            };
        }
    }

    async patchUser(email: string, updates: Partial<User>) {
        try {
            const usuario = await this.user.findOne({ where: { email } });
    
            if (!usuario) {
                return { status: 404, message: "Usuário não encontrado." };
            }
    
            await usuario.update(updates);
    
            return {
                status: 200,
                message: "Perfil atualizado parcialmente com sucesso.",
                data: usuario,
            };
        } catch (error) {
            if (error instanceof Error) {
                return {
                    status: 500,
                    message: "Erro ao atualizar usuário.",
                    error: error.message,
                };
            }
            
            return {
                status: 500,
                message: "Erro ao atualizar usuário.",
                error: "Erro desconhecido.",
            };
        }
    }
}


export default UserService;