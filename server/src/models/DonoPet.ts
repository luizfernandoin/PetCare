import { DataTypes, Model, ForeignKey } from "sequelize";
import db from "../config/sequelize";


class DonoPet extends Model {
    declare userId: ForeignKey<string>;
    declare petId: ForeignKey<string>;
};

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
    sequelize: db,
    tableName: 'DonoPet',
    timestamps: false
});


export default DonoPet;