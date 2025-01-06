"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
const user_1 = __importDefault(require("./user"));
const pet_1 = __importDefault(require("./pet"));
const service_1 = __importDefault(require("./service"));
const clinica_1 = __importDefault(require("./clinica"));
class Agendamento extends sequelize_1.Model {
}
Agendamento.init({
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
    sequelize: sequelize_2.default,
    tableName: 'agendamentos',
    timestamps: false,
});
Agendamento.belongsTo(user_1.default, { foreignKey: 'userId' });
Agendamento.belongsTo(pet_1.default, { foreignKey: 'petId' });
Agendamento.belongsTo(service_1.default, { foreignKey: 'serviceId' });
Agendamento.belongsTo(clinica_1.default, { foreignKey: 'clinicaId' });
exports.default = Agendamento;
