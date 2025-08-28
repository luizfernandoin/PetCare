"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.TrabalhaClinica = exports.service = exports.DonoPet = exports.clinica = exports.pet = exports.user = void 0;
const sequelize_1 = __importDefault(require("../config/sequelize"));
exports.sequelize = sequelize_1.default;
const user_1 = __importDefault(require("./user"));
const pet_1 = __importDefault(require("./pet"));
const clinica_1 = __importDefault(require("./clinica"));
const DonoPet_1 = __importDefault(require("./DonoPet"));
const TrabalhaClinica_1 = __importDefault(require("./TrabalhaClinica"));
const service_1 = __importDefault(require("./service"));
const horario_1 = __importDefault(require("./horario"));
const vacina_1 = __importDefault(require("./vacina"));
const atendimento_1 = __importDefault(require("./atendimento"));
const agendamento_1 = __importDefault(require("./agendamento"));
const avaliacoes_1 = __importDefault(require("./avaliacoes"));
const user = (0, user_1.default)(sequelize_1.default);
exports.user = user;
const pet = (0, pet_1.default)(sequelize_1.default);
exports.pet = pet;
const clinica = (0, clinica_1.default)(sequelize_1.default);
exports.clinica = clinica;
const DonoPet = (0, DonoPet_1.default)(sequelize_1.default);
exports.DonoPet = DonoPet;
const TrabalhaClinica = (0, TrabalhaClinica_1.default)(sequelize_1.default);
exports.TrabalhaClinica = TrabalhaClinica;
const service = (0, service_1.default)(sequelize_1.default);
exports.service = service;
const horariosAtendimento = (0, horario_1.default)(sequelize_1.default);
const vacina = (0, vacina_1.default)(sequelize_1.default);
const atendimento = (0, atendimento_1.default)(sequelize_1.default);
const agendamento = (0, agendamento_1.default)(sequelize_1.default);
const avaliacao = (0, avaliacoes_1.default)(sequelize_1.default);
user.belongsToMany(pet, {
    through: DonoPet,
    foreignKey: 'userId',
    otherKey: 'petId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
pet.belongsToMany(user, {
    through: DonoPet,
    foreignKey: 'petId',
    otherKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
user.belongsToMany(clinica, {
    through: TrabalhaClinica,
    foreignKey: 'userId',
    otherKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
clinica.belongsToMany(user, {
    through: TrabalhaClinica,
    foreignKey: 'clinicaId',
    otherKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
clinica.hasMany(service, {
    foreignKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
service.belongsTo(clinica, {
    foreignKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
clinica.hasMany(horariosAtendimento, {
    foreignKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
horariosAtendimento.belongsTo(clinica, {
    foreignKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
service.hasMany(vacina, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
vacina.belongsTo(service, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
user.hasMany(atendimento, {
    foreignKey: 'profissionalId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
atendimento.belongsTo(user, {
    foreignKey: 'profissionalId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
pet.hasMany(atendimento, {
    foreignKey: 'petId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
atendimento.belongsTo(pet, {
    foreignKey: 'petId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
service.hasMany(atendimento, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
atendimento.belongsTo(service, {
    foreignKey: 'serviceId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
user.hasMany(agendamento, { foreignKey: 'userId' });
pet.hasMany(agendamento, { foreignKey: 'petId' });
service.hasMany(agendamento, { foreignKey: 'serviceId' });
clinica.hasMany(agendamento, { foreignKey: 'clinicaId' });
agendamento.belongsTo(user, { foreignKey: 'userId' });
agendamento.belongsTo(pet, { foreignKey: 'petId' });
agendamento.belongsTo(service, { foreignKey: 'serviceId' });
agendamento.belongsTo(clinica, { foreignKey: 'clinicaId' });
user.belongsToMany(service, {
    through: avaliacao,
    foreignKey: 'userId',
    otherKey: 'serviceId'
});
service.belongsToMany(user, {
    through: avaliacao,
    foreignKey: 'serviceId',
    otherKey: 'userId'
});
