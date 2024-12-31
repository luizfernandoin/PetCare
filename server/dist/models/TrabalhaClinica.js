"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const TrabalhaClinica = (sequelize) => {
    const TrabalhaClinica = sequelize.define('TrabalhaClinica', {
        userId: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            references: {
                model: 'users',
                key: 'id',
            },
            primaryKey: true,
        },
        clinicaId: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            references: {
                model: 'clinicas',
                key: 'id',
            },
            primaryKey: true,
        }
    }, {
        tableName: 'TrabalhaClinica',
        timestamps: false
    });
    return TrabalhaClinica;
};
exports.default = TrabalhaClinica;
