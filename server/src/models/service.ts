import { Sequelize, DataTypes, Model, Optional, CreationOptional, ForeignKey } from "sequelize";


class Service extends Model {
    declare id: string;
    declare tipo: 'Consulta' | 'Vacinação' | 'Exame' | 'Outros';
    declare observacoes: CreationOptional<string>;
    declare clinicaId: ForeignKey<string>;
}

const serviceModel = (sequelize: Sequelize) => {
    Service.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.ENUM('Consulta', 'Vacinação', 'Exame', 'Outros'),
            allowNull: false,
        },
        observacoes: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        clinicaId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'clinicas',
                key: 'id',
            },
        },
    }, {
        sequelize,
        tableName: 'services',
        timestamps: false
    });

    return Service;
};

export default serviceModel;