import sequelize, { CreationOptional, ForeignKey } from "sequelize";
import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import petModel from "./pet";


class DonoPet extends Model {
    declare userId: ForeignKey<string>;
    declare petId: ForeignKey<string>;
};

const DonoPetModel = (sequelize: Sequelize) => {
    DonoPet.init({
        userId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            references: {
                model: 'users',
                key: 'id',
            },
            primaryKey: true,
        },
        petId: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            references: {
                model: 'pets',
                key: 'id',
            },
            primaryKey: true,
        }
    },
    {
        sequelize,
        tableName: 'DonoPet',
        timestamps: false
    });

    return DonoPet;
};

export default DonoPetModel;