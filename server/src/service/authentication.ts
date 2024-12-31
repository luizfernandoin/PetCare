import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


class Authentication {
    constructor(userModel, secretKey) {
        this.userModel = userModel;
        this.secretKey = secretKey;
    }

    async login(email, senha) {
        if (!email || !senha) {
            return { status: 400, message: "Email e senha são obrigatórios." };
        }

        try {
            const usuario = await this.userModel.findOne({ where: { email } });

            if (!usuario) {
                return { status: 404, message: "Usuário não encontrado." };
            }

            const senhaValida = await bcrypt.compare(senha, usuario.senha);

            if (!senhaValida) {
                return { status: 401, message: "Senha incorreta." };
            }

            const token = jwt.sign(
                { email: usuario.email, tipo: usuario.tipo },
                this.secretKey,
                { expiresIn: "1h" }
            );

            return { status: 200, message: "Login realizado com sucesso.", token };
        } catch (error) {
            console.error("Erro ao realizar login:", error);
            return { status: 500, message: "Erro interno do servidor.", error: error.message };
        }
    }
}

export default Authentication;