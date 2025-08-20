import { DataTypes, Model, ForeignKey, CreationOptional } from 'sequelize';
import db from "../config/sequelize";
import User from './user';
import Pet from './pet';
import Service from './service';
import Clinic from './clinic';


class Appointment extends Model {
    declare id: CreationOptional<string>;
    declare userId: ForeignKey<string>;
    declare petId: ForeignKey<string>;
    declare serviceId: ForeignKey<string>;
    declare clinicId: ForeignKey<string>;
    declare appointmentDate: Date;
    declare startTime: string;
    declare endTime: string;
    declare status: "PENDING" | "CONFIRMED" | "CANCELED";
}

Appointment.init({
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
    clinicId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'clinics',
            key: 'id',
        },
    },
    appointmentDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db,
    tableName: 'appointments',
    timestamps: false,
});

Appointment.belongsTo(User, { foreignKey: 'userId' });
Appointment.belongsTo(Pet, { foreignKey: 'petId' });
Appointment.belongsTo(Service, { foreignKey: 'serviceId' });
Appointment.belongsTo(Clinic, { foreignKey: 'clinicId' });

User.hasMany(Appointment, { foreignKey: 'userId' });
Pet.hasMany(Appointment, { foreignKey: 'petId' });
Service.hasMany(Appointment, { foreignKey: 'serviceId' });
Clinic.hasMany(Appointment, { foreignKey: 'clinicId' });

export default Appointment;
