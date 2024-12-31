import { Sequelize, DataTypes, Model, Optional, CreationOptional, ForeignKey } from "sequelize";


class Atendimento extends Model {
    declare profissionalId: ForeignKey<string>;
    declare petId: ForeignKey<string>;
    declare serviceId: ForeignKey<string>;
    declare dataAtendimento: Date;
    declare observacao: CreationOptional<string>;
}

const atendimentoModel = (sequelize: Sequelize) => {
    Atendimento.init({
        profissionalId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            primaryKey: true
        },
        petId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'pets',
                key: 'id',
            },
            primaryKey: true
        },
        serviceId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'services',
                key: 'id',
            },
            primaryKey: true
        },
        dataAtendimento: {
            type: DataTypes.DATE,
            allowNull: false,
            primaryKey: true,
        },
        observacao: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        sequelize,
        tableName: 'atendimentos',
        timestamps: false
    });

    return Atendimento;
};

export default atendimentoModel;
