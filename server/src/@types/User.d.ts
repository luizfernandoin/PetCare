interface IUserCreate {
    email: string;
    nome: string;
    senha: string;
    telefone: string;
    location: {
        street: string,
        number: string,
        city: string,
        state: string,
        country: string,
        postalcode: string
    };
    tipo: 'Cliente' | 'Profissional';
}

export {IUserCreate};