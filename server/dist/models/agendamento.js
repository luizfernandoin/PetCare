"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const agendamento = (sequelize) => {
    const Agendamento = sequelize.define('Agendamento', {
        userId: {
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
        clinicaId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'clinicas',
                key: 'id',
            },
            primaryKey: true
        },
        dataAgendamento: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: false,
            primaryKey: true
        },
        horaInicio: {
            type: sequelize_1.DataTypes.TIME,
            allowNull: false,
        },
        horaFim: {
            type: sequelize_1.DataTypes.TIME,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'agendamentos',
        timestamps: false,
    });
    return Agendamento;
};
exports.default = agendamento;
