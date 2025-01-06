import { DataTypes, Model, ForeignKey } from "sequelize";
import db from "../config/sequelize";


class TrabalhaClinica extends Model {
    declare userId: ForeignKey<string>;
    declare clinicaId: ForeignKey<string>;
}

TrabalhaClinica.init({
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id',
        },
        primaryKey: true,
    },
    clinicaId: {
        type: DataTypes.UUID,
        references: {
            model: 'clinicas',
            key: 'id',
        },
        primaryKey: true,
    }
}, {
    sequelize: db,
    tableName: 'TrabalhaClinica',
    timestamps: false
});


export default TrabalhaClinica;