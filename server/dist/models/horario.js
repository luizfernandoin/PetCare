"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const horario = (sequelize) => {
    const Horario = sequelize.define('Horario', {
        clinicaId: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'clinicas',
                key: 'id',
            },
            primaryKey: true,
        },
        dia: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            primaryKey: true,
        },
        horaInicio: {
            type: sequelize_1.DataTypes.TIME,
            allowNull: false,
        },
        horaFim: {
            type: sequelize_1.DataTypes.TIME,
            allowNull: false,
        },
    }, {
        tableName: 'horarios',
        timestamps: false,
    });
    return Horario;
};
exports.default = horario;
