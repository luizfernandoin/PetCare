import { DataTypes, Model, CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes } from "sequelize";
import db from "../config/sequelize";
import Vaccine from "./vaccine";
import Consultation from "./consultation";
import { SERVICE_TYPE } from "@petcare/shared/src/enums";


class Service extends Model<InferAttributes<Service>, InferCreationAttributes<Service>> {
    declare id: CreationOptional<string>;
    declare type: SERVICE_TYPE;
    declare name: string;
    declare description: CreationOptional<string>;

    // async getOwnerId(id: string): Promise<string | null> {
    //     const service = await Service.findByPk(id, {
    //         include: Clinic,
    //     });

    //     return service ? service.clinicId : null;
    // }
}

Service.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM(...Object.values(SERVICE_TYPE)),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    sequelize: db,
    tableName: 'services',
    timestamps: false
});

Service.hasMany(Vaccine, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
  
Vaccine.belongsTo(Service, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Service.hasMany(Consultation, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Consultation.belongsTo(Service, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

// Service.belongsToMany(Clinic, {
//     through: 'clinic_services',
//     foreignKey: 'serviceId',
//     otherKey: 'clinicId',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
// });

// Clinic.belongsToMany(Service, {
//     through: 'clinic_services',
//     foreignKey: 'clinicId',
//     otherKey: 'serviceId',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE'
// });



export default Service;