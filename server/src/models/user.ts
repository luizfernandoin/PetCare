import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';


class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<string>;
    declare email: string;
    declare nome: string;
    declare senha: string;
    declare telefone: string;
    declare uf: string;
    declare cidade: string;
    declare rua: string;
    declare bairro: string;
    declare num: string;
    declare tipo: 'Cliente' | 'Profissional';

}

const userModel = (sequelize: Sequelize) => {
    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
              isEmail: true,
            },
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        uf: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        cidade: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        rua: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        bairro: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        num: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        tipo: {
            type: DataTypes.ENUM('Cliente', 'Profissional'),
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'users',
    });

    return User;    
}

export {User, userModel};