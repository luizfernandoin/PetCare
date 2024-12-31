"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const clinica = (sequelize) => {
    const Clinica = sequelize.define('Clinica', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        telefone: {
            type: sequelize_1.DataTypes.STRING(15),
            allowNull: false,
        },
    }, {
        tableName: 'clinicas',
    });
    return Clinica;
};
exports.default = clinica;
