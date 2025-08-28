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
                attributes: { exclude: ['password']},
            });

            return users;
        } catch (error) {
            if (error instanceof Error) {
                return new HttpError("Could not retrieve users", 500, error);
            }

            throw new HttpError("Internal error while trying to retrieve users.", 500);
        }
    }

    async getUserById(userId: string) {
        try {
            const user = await this.user.findOne({ 
                where: { id: userId },
                attributes: { exclude: ['password'] } 
            })

            if (!user) {
                throw new HttpError("User not found.", 404);
            }
    
            return user;
        } catch (error) {
            if (error instanceof HttpError) {
                throw new HttpError(error.message, error.statusCode);
            }

            throw new HttpError("Internal error while retrieving user.", 500);
        }
    }

    async getUserByEmail(userEmail: string) {
        try {
            const user = await this.user.findOne({ 
                where: { email: userEmail },
                attributes: { exclude: ['password'] }
            });

            if (!user) throw new HttpError("User not found.", 404);

            return user;
        } catch (error) {
            if (error instanceof HttpError) {
                throw new HttpError(error.message, error.statusCode);
            }

            throw new HttpError("Internal error while retrieving user.", 500);
        }
    }
    
    async deleteUser(userAuth: User) {
        try {
            const user = await this.getUserByEmail(userAuth.email);

            if(!user) {
                throw new HttpError("User not found.", 404);
            }

            await user.destroy();
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Error deleting user.", 500, new Error(error.message));
            }

            throw new HttpError("Error deleting user.", 500);
        }
    }
    
    async deleteUserById(id: string) {
        try {
            const user = await this.user.findOne({ where: { 'id': id } })
            
            if (!user) {
                throw new HttpError("User not found.", 404);
            }
    
            await user.destroy();
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Error deleting user.", 500, new Error(error.message));
            }
            
            throw new HttpError("Error deleting user.", 500);
        }

    }
    
    async deleteUserByEmail(email: string) {
        try {
            const userToDelete = await this.user.findOne({ where: { email } });

            if (!userToDelete) {
                throw new HttpError("User not found.", 404);
            }

            await userToDelete.destroy();

            return userToDelete
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Error trying to delete user.", 500, error);
            }

            throw new HttpError("Internal error while trying to delete user.", 500);
        }
    }

    async updateUser(userAuth: User, updates: Partial<User>) {
        try {
            const user = await this.getUserByEmail(userAuth.email);

            if (!user) {
                throw new HttpError("User not found.", 404);
            }

            await user.update(updates);

            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Error updating user.", 500, new Error(error.message));
            }

            throw new HttpError("Internal error while updating user.", 500);
        }
    }

    async patchUser(email: string, updates: Partial<User>) {
        try {
            const user = await this.user.findOne({ where: { email } });
    
            if (!user) {
                return { status: 404, message: "User not found." };
            }
    
            await user.update(updates);
    
            return user;
        } catch (error) {
            if (error instanceof Error) {
                throw new HttpError("Error updating user.", 500, error);
            }  
            
            throw new HttpError("Internal error while trying to update user.", 500);
        }
    }
}


export default UserService;