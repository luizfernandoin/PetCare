"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class TrabalhaClinica extends sequelize_1.Model {
}
TrabalhaClinica.init({
    userId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: 'users',
            key: 'id',
        },
        primaryKey: true,
    },
    clinicaId: {
        type: sequelize_1.DataTypes.UUID,
        references: {
            model: 'clinicas',
            key: 'id',
        },
        primaryKey: true,
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'TrabalhaClinica',
    timestamps: false
});
exports.default = TrabalhaClinica;
