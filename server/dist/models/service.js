"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
const clinica_1 = __importDefault(require("./clinica"));
const vacina_1 = __importDefault(require("./vacina"));
const atendimento_1 = __importDefault(require("./atendimento"));
const agendamento_1 = __importDefault(require("./agendamento"));
const user_1 = __importDefault(require("./user"));
const avaliacoes_1 = __importDefault(require("./avaliacoes"));
class Service extends sequelize_1.Model {
    getOwnerId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const service = yield Service.findByPk(id, {
                include: clinica_1.default,
            });
            return service ? service.clinicaId : null;
        });
    }
}
Service.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    tipo: {
        type: sequelize_1.DataTypes.ENUM('Consulta', 'Vacinação', 'Exame', 'Outros'),
        allowNull: false,
    },
    observacoes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    clinicaId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'clinicas',
            key: 'id',
        },
    },
}, {
    sequelize: sequelize_2.default,
    tableName: 'services',
    timestamps: false
});
Service.belongsTo(clinica_1.default, {
    foreignKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Service.hasMany(vacina_1.default, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Service.hasMany(atendimento_1.default, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
Service.hasMany(agendamento_1.default, { foreignKey: 'serviceId' });
Service.belongsToMany(user_1.default, {
    through: avaliacoes_1.default,
    foreignKey: 'serviceId',
    otherKey: 'userId'
});
exports.default = Service;
