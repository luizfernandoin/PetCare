"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
const service_1 = __importDefault(require("./service"));
const horario_1 = __importDefault(require("./horario"));
const sequelize_3 = __importDefault(require("sequelize"));
class Clinica extends sequelize_1.Model {
}
;
Clinica.init({
    id: {
        type: sequelize_3.default.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    nome: {
        type: sequelize_3.default.STRING(100),
        allowNull: false,
    },
    telefone: {
        type: sequelize_3.default.STRING(15),
        allowNull: false,
    },
}, {
    tableName: 'clinicas',
    sequelize: sequelize_2.default
});
Clinica.hasMany(service_1.default, {
    foreignKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
service_1.default.belongsTo(Clinica, {
    foreignKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Clinica.hasMany(horario_1.default, {
    foreignKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
horario_1.default.belongsTo(Clinica, {
    foreignKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
exports.default = Clinica;
