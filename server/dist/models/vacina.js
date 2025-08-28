"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class Vacina extends sequelize_1.Model {
}
Vacina.init({
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
    sequelize: sequelize_2.default,
    tableName: 'vacinas',
    timestamps: false,
});
exports.default = Vacina;
