"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const vacina = (sequelize) => {
    const Vacina = sequelize.define('Vacina', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        validade: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            validate: {
                isAfter: new Date().toISOString(),
            },
        },
        fabricante: {
            type: sequelize_1.DataTypes.STRING(100),
            allowNull: false,
        },
        lote: {
            type: sequelize_1.DataTypes.STRING(50),
            allowNull: false,
        },
        serviceId: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'services',
                key: 'id',
            },
        },
    }, {
        tableName: 'vacinas',
        timestamps: false,
    });
    return Vacina;
};
exports.default = vacina;
