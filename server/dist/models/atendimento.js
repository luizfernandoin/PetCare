"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class Atendimento extends sequelize_1.Model {
}
Atendimento.init({
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
    sequelize: sequelize_2.default,
    tableName: 'atendimentos',
    timestamps: false
});
exports.default = Atendimento;
