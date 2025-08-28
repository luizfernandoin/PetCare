"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class Avaliacoes extends sequelize_1.Model {
}
Avaliacoes.init({
    userId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id',
        },
        primaryKey: true,
    },
    serviceId: {
        type: sequelize_1.DataTypes.UUID,
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
    sequelize: sequelize_2.default,
    tableName: 'avaliacoes',
});
exports.default = Avaliacoes;
