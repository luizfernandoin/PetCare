import { DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from "../config/sequelize";
import Service from './service';


class Vaccine extends Model<InferAttributes<Vaccine>, InferCreationAttributes<Vaccine>> {
    declare id: string;
    declare name: string;
    declare expirationDate: Date;
    declare manufacturer: string;
    declare batchNumber: string;
    declare serviceId: string;
}

Vaccine.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expirationDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isAfter: new Date().toISOString(),
        },
    },
    manufacturer: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    batchNumber: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    serviceId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        references: {
            model: 'services',
            key: 'id',
        },
    },
}, {
    sequelize: db,
    tableName: 'vaccines',
    timestamps: false,
});


export default Vaccine;