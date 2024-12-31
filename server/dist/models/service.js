"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const service = (sequelize) => {
    const Service = sequelize.define('Service', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        tipo: {
            type: sequelize_1.DataTypes.ENUM('Consulta', 'Vacinação', 'Exame', 'Outros'),
            allowNull: false,
        },
        observacoes: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
        clinicaId: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            allowNull: false,
            references: {
                model: 'clinicas',
                key: 'id',
            },
        },
    }, {
        tableName: 'services',
        timestamps: false,
    });
    return Service;
};
exports.default = service;
