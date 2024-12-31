import { user } from "../../models/index";
import User from "../../service/user";

const userService = new User(user);

const verifyOwnership = (service) => {
    return async(request, response, next) => {
        try {
            const { id } = request.params;
            const emailUser = request.user.email;
            const user = await userService.getUserByEmail(emailUser);
            console.log(service, id, user.id);
            console.log(user)

            const ownerId = await service.getOwnerId(id);
            console.log(ownerId)

            if (!ownerId) {
                return response.status(404).json({ message: "Objeto não encontrado!" });
            }

            if (ownerId !== user.id) {
                return response.status(403).json({ message: "Usuário não autorizado." });
            }
            
            next();
        } catch (error) {
            return response.status(500).json({ message: "Erro interno ao verificar propriedade." });
        }
    };
};

export default verifyOwnership;
