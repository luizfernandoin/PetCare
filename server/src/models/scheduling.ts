import { DataTypes, Model, ForeignKey, CreationOptional } from 'sequelize';
import db from "../config/sequelize";
import User from './user';
import Pet from './pet';
import Service from './service';
import Clinic from './clinic';


class Scheduling extends Model {
    declare id: CreationOptional<string>;
    declare userId: ForeignKey<string>;
    declare petId: ForeignKey<string>;
    declare serviceId: ForeignKey<string>;
    declare clinicId: ForeignKey<string>;
    declare scheduledDate: Date;
    declare startTime: string;
    declare endTime: string;
    declare status: "PENDING" | "CONFIRMED" | "CANCELED";
}

Scheduling.init({
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
    scheduledDate: {
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
    tableName: 'schedules',
    timestamps: false,
});

Scheduling.belongsTo(User, { foreignKey: 'userId' });
Scheduling.belongsTo(Pet, { foreignKey: 'petId' });
Scheduling.belongsTo(Service, { foreignKey: 'serviceId' });
Scheduling.belongsTo(Clinic, { foreignKey: 'clinicId' });

User.hasMany(Scheduling, { foreignKey: 'userId' });
Pet.hasMany(Scheduling, { foreignKey: 'petId' });
Service.hasMany(Scheduling, { foreignKey: 'serviceId' });
Clinic.hasMany(Scheduling, { foreignKey: 'clinicId' });

export default Scheduling;
