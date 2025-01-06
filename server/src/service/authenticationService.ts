import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ModelStatic, ValidationError, ValidationErrorItem } from "sequelize";
import User from "../models/user";
import HttpError from "../utils/errors/HttpError";

class AuthenticationService {
    private userModel: ModelStatic<User>;
    private secretKey: string;

    constructor(userModel: ModelStatic<User>, secretKey: string) {
        this.userModel = userModel;
        this.secretKey = secretKey;
    }

    async createUser(userDTO: User) {
        const { email, nome, senha, telefone, uf, cidade, rua, bairro, num, tipo } = userDTO;
    
        if (!email || !nome || !senha || !telefone || !uf || !cidade || !rua || !bairro || !num || !tipo) {
            throw new HttpError("Todos os campos são obrigatórios.", 400);
        }
    
        if (!["Cliente", "Profissional"].includes(tipo)) {
            throw new HttpError("O campo 'tipo' deve ser 'Cliente' ou 'Profissional'.", 400);
        }

        const usuarioExiste = await this.userModel.findOne({ where: { email } });

        if (usuarioExiste) {
            throw new HttpError("E-mail já cadastrado.", 400);
        }
    
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(senha, salt);
    
            const novoUsuario = await this.userModel.create({
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
            if (error instanceof ValidationError) {
                const errors = error.errors.map((err: ValidationErrorItem) => err.message);
                throw new HttpError(`Erro de validação: ${errors.join(", ")}`, 400);
            }
    
            throw new HttpError("Erro interno ao criar usuário.", 500);
        }    
    }

    async login(email: string, senha: string) {
        if (!email || !senha) {
            throw new HttpError("Email e senha são obrigatórios.", 400);
        }

        try {
            const user = await this.userModel.findOne({ where: { email } });

            if (!user) {
                throw new HttpError("Usuário não encontrado.", 404);
            }

            const senhaValida = await bcrypt.compare(senha, user.senha);

            if (!senhaValida) {
                throw new HttpError("Senha incorreta.", 401);
            }

            const token = jwt.sign(
                { email: user.email, tipo: user.tipo },
                this.secretKey,
                { expiresIn: "1h" }
            );

            return token;
        } catch (error) {
            if (error instanceof HttpError) {
                throw new HttpError(error.message, error.statusCode);
            }

            throw new HttpError(`Erro interno ao realizar login: erro`, 500);
        }
    }
}

export default AuthenticationService;
