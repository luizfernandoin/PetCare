import { DataTypes, Model, ForeignKey } from "sequelize";
import db from "../config/sequelize";
import Clinica from "./clinica";
import sequelize from "sequelize";


class Horario extends Model {
    declare clinicaId: ForeignKey<string>; 
    declare dia: string;
    declare horaInicio: string;
    declare horaFim: string;
};

Horario.init({
    clinicaId: {
        type: sequelize.UUID,
        allowNull: false,
        references: {
            model: 'clinicas',
            key: 'id',
        },
        primaryKey: true,
    },
    dia: {
        type: sequelize.STRING,
        allowNull: false,
        primaryKey: true,
    },
    horaInicio: {
        type: sequelize.TIME,
        allowNull: false,
    },
    horaFim: {
        type: sequelize.TIME,
        allowNull: false,
    },
}, 
{
    tableName: 'horarios',
    sequelize: db,
    timestamps: false,
});


export default Horario;