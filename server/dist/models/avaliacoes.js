"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const avaliacoes = (sequelize) => {
    const Avaliacoes = sequelize.define('Avaliacoes', {
        userId: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            references: {
                model: 'users',
                key: 'id',
            },
            primaryKey: true,
        },
        serviceId: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            references: {
                model: 'services',
                key: 'id',
            },
            primaryKey: true,
        },
        comentario: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: false,
        },
        nota: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1,
                max: 5,
            },
        },
    }, {
        tableName: 'avaliacoes',
    });
    return Avaliacoes;
};
exports.default = avaliacoes;
