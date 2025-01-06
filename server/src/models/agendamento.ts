import { DataTypes, Model, ForeignKey } from 'sequelize';
import db from "../config/sequelize";
import User from './user';
import Pet from './pet';
import Service from './service';
import Clinica from './clinica';


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
    sequelize: db,
    tableName: 'agendamentos',
    timestamps: false,
});

Agendamento.belongsTo(User, { foreignKey: 'userId' });
Agendamento.belongsTo(Pet, { foreignKey: 'petId' });
Agendamento.belongsTo(Service, { foreignKey: 'serviceId' });
Agendamento.belongsTo(Clinica, { foreignKey: 'clinicaId' });

User.hasMany(Agendamento, { foreignKey: 'userId' });
Pet.hasMany(Agendamento, { foreignKey: 'petId' });
Service.hasMany(Agendamento, { foreignKey: 'serviceId' });
Clinica.hasMany(Agendamento, { foreignKey: 'clinicaId' });

export default Agendamento;
