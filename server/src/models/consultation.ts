import { DataTypes, Model, CreationOptional, ForeignKey } from "sequelize";
import db from "../config/sequelize";
import User from "./user";
import Pet from "./pet";
import Service from "./service";


class Consultation extends Model {
    declare professionalId: ForeignKey<string>;
    declare petId: ForeignKey<string>;
    declare serviceId: ForeignKey<string>;
    declare consultationDate: Date;
    declare notes: CreationOptional<string>;
}

Consultation.init({
    professionalId: {
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
    consultationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        primaryKey: true,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: db,
    tableName: 'consultations',
    timestamps: false
});

Consultation.belongsTo(User, {
    foreignKey: 'professionalId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Consultation.belongsTo(Pet, {
    foreignKey: 'petId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Consultation.belongsTo(Service, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

export default Consultation;
