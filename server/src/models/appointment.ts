import { DataTypes, Model, ForeignKey, CreationOptional } from 'sequelize';
import db from "../config/sequelize";
import User from './user';
import Pet from './pet';
import Service from './service';
import Clinic from './clinic';
import { APPOINTMENT_STATUS } from '@petcare/shared/src/enums';

class Appointment extends Model {
    declare id: CreationOptional<string>;
    declare userId: ForeignKey<string>;
    declare petId: ForeignKey<string>;
    declare serviceId: ForeignKey<string>;
    declare clinicId: ForeignKey<string>;
    declare appointmentDate: Date;
    declare startTime: string;
    declare endTime: string;
    declare status: APPOINTMENT_STATUS;
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
        type: DataTypes.ENUM(...Object.values(APPOINTMENT_STATUS)),
        allowNull: false,
    },
}, {
    sequelize: db,
    tableName: 'appointments',
    timestamps: false,
});

Appointment.belongsTo(User, { foreignKey: 'userId', as : 'user' });
Appointment.belongsTo(Pet, { foreignKey: 'petId', as: 'pet' });
Appointment.belongsTo(Service, { foreignKey: 'serviceId', as: 'service' });
Appointment.belongsTo(Clinic, { foreignKey: 'clinicId', as: 'clinic' });

User.hasMany(Appointment, { foreignKey: 'userId' });
Pet.hasMany(Appointment, { foreignKey: 'petId' });
Service.hasMany(Appointment, { foreignKey: 'serviceId' });
Clinic.hasMany(Appointment, { foreignKey: 'clinicId' });

export default Appointment;
