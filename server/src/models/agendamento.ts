import { Sequelize, DataTypes, Model, Optional, ForeignKey } from 'sequelize';


class Agendamento extends Model {
    declare userId: ForeignKey<string>;
    declare petId: ForeignKey<string>;
    declare serviceId: ForeignKey<string>;
    declare clinicaId: ForeignKey<string>;
    declare dataAgendamento: Date;
    declare horaInicio: string;
    declare horaFim: string;
    declare status: string;
}

const agendamentoModel = (sequelize: Sequelize) => {
    Agendamento.init({
        userId: {
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
        clinicaId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'clinicas',
                key: 'id',
            },
            primaryKey: true
        },
        dataAgendamento: {
            type: DataTypes.DATE,
            allowNull: false,
            primaryKey: true
        },
        horaInicio: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        horaFim: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'agendamentos',
        timestamps: false,
    });

    return Agendamento;
};


export default agendamentoModel;
