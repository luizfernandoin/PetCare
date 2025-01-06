"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
const DonoPet_1 = __importDefault(require("./DonoPet"));
const pet_1 = __importDefault(require("./pet"));
const clinica_1 = __importDefault(require("./clinica"));
const TrabalhaClinica_1 = __importDefault(require("./TrabalhaClinica"));
const atendimento_1 = __importDefault(require("./atendimento"));
const service_1 = __importDefault(require("./service"));
const agendamento_1 = __importDefault(require("./agendamento"));
const avaliacoes_1 = __importDefault(require("./avaliacoes"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    nome: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    senha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
    },
    uf: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    cidade: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    rua: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    bairro: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    num: {
        type: sequelize_1.DataTypes.STRING(10),
        allowNull: false,
    },
    tipo: {
        type: sequelize_1.DataTypes.ENUM('Cliente', 'Profissional'),
        allowNull: false,
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'users',
});
User.belongsToMany(pet_1.default, {
    through: DonoPet_1.default,
    foreignKey: 'userId',
    otherKey: 'petId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
User.belongsToMany(clinica_1.default, {
    through: TrabalhaClinica_1.default,
    foreignKey: 'userId',
    otherKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
User.hasMany(atendimento_1.default, {
    foreignKey: 'profissionalId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
User.hasMany(agendamento_1.default, { foreignKey: 'userId' });
User.belongsToMany(service_1.default, {
    through: avaliacoes_1.default,
    foreignKey: 'userId',
    otherKey: 'serviceId'
});
exports.default = User;
