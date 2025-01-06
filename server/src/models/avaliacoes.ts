import { DataTypes, Model, Optional, ForeignKey } from 'sequelize';
import db from "../config/sequelize";


class Avaliacoes extends Model {
    declare userId: ForeignKey<string>;
    declare serviceId: ForeignKey<string>;
    declare comentario: string;
    declare nota: number;
}

Avaliacoes.init({
    userId: {
        type: DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id',
        },
        primaryKey: true,
    },
    serviceId: {
        type: DataTypes.UUID,
        references: {
            model: 'services',
            key: 'id',
        },
        primaryKey: true,
    },
    comentario: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    nota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        },
    },
}, {
    sequelize: db,
    tableName: 'avaliacoes',
});


export default Avaliacoes;