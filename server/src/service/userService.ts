import { Model, ModelStatic, ValidationError, ValidationErrorItem } from "sequelize";
import User from "../models/user";
import HttpError from "../utils/errors/HttpError";

class UserService {
    private user: ModelStatic<User>;

    constructor(userModel: ModelStatic<User>) {
        this.user = userModel;
    }
    
    async get() {
        try {
            const users = await this.user.findAll({
                attributes: { exclude: ['senha']},
            });

            return users;
        } catch (error) {
            if (error instanceof Error) {
                return new HttpError("Não foi possível buscar usuários", 500, error);
            }

            throw new HttpError("Erro interno ao tentar buscar usuários.", 500);
        }
    }

    async getUserById(userId: string) {
        try {
            const user = await this.user.findOne({ 
                where: { id: userId },
                attributes: { exclude: ['senha'] } 
            })

            if (!user) {
                throw new HttpError("Usuário não encontrado.", 404);
            }
    
            return user;
        } catch (error) {
            if (error instanceof HttpError) {
                throw new HttpError(error.message, error.statusCode);
            }

            throw new HttpError("Erro interno ao buscar usuário.", 500);
        }
    }

    async getUserByEmail(userEmail: string) {
        try {
            const user = await this.user.findOne({ 
                where: { email: userEmail },
                attributes: { exclude: ['senha'] }
            });

            if (!user) throw new HttpError("Usuário não encontrado.", 404);

            return user;
        } catch (error) {
            if (error instanceof HttpError) {
                throw new HttpError(error.message, error.statusCode);
            }

            throw new HttpError("Erro interno ao buscar usuário.", 500);
        }
    }
    
    async deleteUser(userAuth: User) {
        try {
            const user = await this.getUserByEmail(userAuth.email);

            if(!user) {
                throw new HttpError("Usuário não encontrado.", 404);
            }

            await user.destroy();
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao deletar usuário.", 500, new Error(error.message));
            }

            throw new HttpError("Erro ao deletar usuário.", 500);
        }
    }
    
    async deleteUserById(id: string) {
        try {
            const usuario = await this.user.findOne({ where: { 'id': id } })
            
            if (!usuario) {
                throw new HttpError("Usuário não encontrado.", 404);
            }
    
            await usuario.destroy();
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao deletar usuário.", 500, new Error(error.message));
            }
            
            throw new HttpError("Erro ao deletar usuário.", 500);
        }

    }
    
    async deleteUserByEmail(email: string) {
        try {
            const userToDelete = await this.user.findOne({ where: { email } });

            if (!userToDelete) {
                throw new HttpError("Usuário não encontrado.", 404);
            }

            await userToDelete.destroy();

            return userToDelete
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao tentar deletar usuário.", 500, error);
            }

            throw new HttpError("Erro interno ao tentar deletar usuário.", 500);
        }
    }

    async updateUser(userAuth: User, updates: Partial<User>) {
        const {
            nome,
            telefone,
            location
        } = updates;
    
        if (!nome || !telefone || !location) {
            throw new HttpError("Todos os campos obrigatórios devem ser preenchidos.", 400);
        }

        try {
            const usuario = await this.getUserByEmail(userAuth.email);

            if (!usuario) {
                throw new HttpError("Usuário não encontrado.", 404);
            }

            await usuario.update(updates);

            return usuario;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao atualizar usuário.", 500, new Error(error.message));
            }

            throw new HttpError("Erro interno ao atualizar usuário.", 500);
        }
    }

    async patchUser(email: string, updates: Partial<User>) {
        try {
            const usuario = await this.user.findOne({ where: { email } });
    
            if (!usuario) {
                return { status: 404, message: "Usuário não encontrado." };
            }
    
            await usuario.update(updates);
    
            return usuario;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Erro ao atualizar usuário.", 500, error);
            }  
            
            throw new HttpError("Erro interno ao tentar atualizar usuário.", 500);
        }
    }
}


export default UserService;