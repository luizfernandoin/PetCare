import { DataTypes, Model, CreationOptional, ForeignKey, InferAttributes, InferCreationAttributes } from "sequelize";
import db from "../config/sequelize";
import Clinic from "./clinic";
import Vaccine from "./vaccine";
import Consultation from "./consultation";


class Service extends Model<InferAttributes<Service>, InferCreationAttributes<Service>> {
    declare id: CreationOptional<string>;
    declare type: 'Consultation' | 'Vaccination' | 'Exam' | 'Other';
    declare notes: CreationOptional<string>;
    declare clinicId: ForeignKey<string>;

    async getOwnerId(id: string): Promise<string | null> {
        const service = await Service.findByPk(id, {
            include: Clinic,
        });

        return service ? service.clinicId : null;
    }
}

Service.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('Consultation', 'Vaccination', 'Exam', 'Other'),
        allowNull: false,
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    clinicId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'clinics',
            key: 'id',
        },
    },
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


export default Service;