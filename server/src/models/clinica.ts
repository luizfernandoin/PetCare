import { Sequelize, DataTypes, Model, CreationOptional, ForeignKey } from 'sequelize';


class Clinica extends Model {
    declare id: string;
    declare nome: string;
    declare telefone: string;
};

const clinicaModel = (sequelize: Sequelize) => {
    Clinica.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'clinicas',
    });

    return Clinica;
};

export default clinicaModel;