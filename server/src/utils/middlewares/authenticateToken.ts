import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();


const authenticateToken = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).json({ message: "Token não fornecido." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        request.user = decoded;
        next();
    } catch (error) {
        return response.status(403).json({ message: "Token inválido ou expirado." });
    }
};

export default authenticateToken;
