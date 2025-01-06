"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
const user_1 = __importDefault(require("./user"));
const DonoPet_1 = __importDefault(require("./DonoPet"));
const atendimento_1 = __importDefault(require("./atendimento"));
const agendamento_1 = __importDefault(require("./agendamento"));
class Pet extends sequelize_1.Model {
}
Pet.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    nome: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    raca: {
        type: sequelize_1.DataTypes.STRING(25),
        allowNull: true,
    },
    idade: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0,
        },
    },
    porte: {
        type: sequelize_1.DataTypes.ENUM('pequeno', 'medio', 'grande'),
        allowNull: false,
        validate: {
            isIn: [['pequeno', 'medio', 'grande']],
        },
    },
    foto: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    caracteristicas: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: sequelize_2.default,
    tableName: 'pets',
});
Pet.belongsToMany(user_1.default, {
    through: DonoPet_1.default,
    foreignKey: 'petId',
    otherKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Pet.hasMany(atendimento_1.default, {
    foreignKey: 'petId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Pet.hasMany(agendamento_1.default, { foreignKey: 'petId' });
exports.default = Pet;
