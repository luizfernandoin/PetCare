"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
const sequelize_3 = __importDefault(require("sequelize"));
class Horario extends sequelize_1.Model {
}
;
Horario.init({
    clinicaId: {
        type: sequelize_3.default.UUID,
        allowNull: false,
        references: {
            model: 'clinicas',
            key: 'id',
        },
        primaryKey: true,
    },
    dia: {
        type: sequelize_3.default.STRING,
        allowNull: false,
        primaryKey: true,
    },
    horaInicio: {
        type: sequelize_3.default.TIME,
        allowNull: false,
    },
    horaFim: {
        type: sequelize_3.default.TIME,
        allowNull: false,
    },
}, {
    tableName: 'horarios',
    sequelize: sequelize_2.default,
    timestamps: false,
});
exports.default = Horario;
