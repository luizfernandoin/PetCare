import { DataTypes, Model, ForeignKey, CreationOptional } from 'sequelize';
import db from "../config/sequelize";
import User from './user';
import Pet from './pet';
import Service from './service';
import Clinica from './clinica';


class Agendamento extends Model {
    declare id: CreationOptional<string>;
    declare userId: ForeignKey<string>;
    declare petId: ForeignKey<string>;
    declare serviceId: ForeignKey<string>;
    declare clinicaId: ForeignKey<string>;
    declare dataAgendamento: Date;
    declare horaInicio: string;
    declare horaFim: string;
    declare status: "pendente" | "confirmado" | "cancelado";
}

Agendamento.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    petId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'pets',
            key: 'id',
        },
    },
    serviceId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'services',
            key: 'id',
        },
    },
    clinicaId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'clinicas',
            key: 'id',
        },
    },
    dataAgendamento: {
        type: DataTypes.DATE,
        allowNull: false,
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
