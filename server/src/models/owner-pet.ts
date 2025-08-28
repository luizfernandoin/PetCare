import { DataTypes, Model, ForeignKey } from "sequelize";
import db from "../config/sequelize";

class OwnerPet extends Model {
    declare userId: ForeignKey<string>;
    declare petId: ForeignKey<string>;
};

OwnerPet.init({
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
    sequelize: db,
    tableName: 'ownerpet',
    timestamps: false
});


export default OwnerPet;