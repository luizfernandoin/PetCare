import { Sequelize, DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

class Vacina extends Model<InferAttributes<Vacina>, InferCreationAttributes<Vacina>> {
    declare id: string;
    declare nome: string;
    declare validade: Date;
    declare fabricante: string;
    declare lote: string;
    declare serviceId: string;
}

const vacinaModel = (sequelize: Sequelize) => {
    Vacina.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        validade: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isAfter: new Date().toISOString(),
            },
        },
        fabricante: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        lote: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        serviceId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'services',
                key: 'id',
            },
        },
    }, {
        sequelize,
        tableName: 'vacinas',
        timestamps: false,
    });

    return Vacina;
};

export default vacinaModel;