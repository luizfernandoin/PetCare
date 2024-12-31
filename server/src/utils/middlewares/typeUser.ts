const typeUser = (requiredType) => {
    return (request, response, next) => {
        if (!request.user) {
            return response.status(401).json({ message: 'Usuário não autenticado.' });
        }

        if (request.user.tipo !== requiredType) {
            return response.status(403).json({ message: `Acesso negado! Tipo de usuário necessário: ${requiredType}` });
        }

        next();
    };
};

export default typeUser;
