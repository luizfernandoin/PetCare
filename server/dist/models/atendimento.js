"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const atendimento = (sequelize) => {
    const Atendimento = sequelize.define('Atendimento', {
        profissionalId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            primaryKey: true
        },
        petId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'pets',
                key: 'id',
            },
            primaryKey: true
        },
        serviceId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'services',
                key: 'id',
            },
            primaryKey: true
        },
        dataAtendimento: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            primaryKey: true,
        },
        observacao: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        tableName: 'atendimentos',
        timestamps: false,
    });
    return Atendimento;
};
exports.default = atendimento;
