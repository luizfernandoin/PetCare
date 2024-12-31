import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/sequelize'
import { userModel } from './user';
import petModel from './pet';
import clinicaModel from './clinica';
import DonoPetModel from './DonoPet';
import TrabalhaClinicaModel from './TrabalhaClinica';
import serviceModel from './service';
import horarioAtendimentoModel from './horario';
import vacinaModel from './vacina';
import atendimentoModel from './atendimento';
import agendamentoModel from './agendamento';
import avaliacoesModel from './avaliacoes';


const user = userModel(sequelize);
const pet = petModel(sequelize);
const clinica = clinicaModel(sequelize);
const DonoPet = DonoPetModel(sequelize);
const TrabalhaClinica = TrabalhaClinicaModel(sequelize);
const service = serviceModel(sequelize);
const horariosAtendimento = horarioAtendimentoModel(sequelize);
const vacina = vacinaModel(sequelize);
const atendimento = atendimentoModel(sequelize);
const agendamento = agendamentoModel(sequelize);
const avaliacao = avaliacoesModel(sequelize);


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
})

clinica.belongsToMany(user, {
    through: TrabalhaClinica,
    foreignKey: 'clinicaId',
    otherKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

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

export {user, pet, clinica, DonoPet, service, TrabalhaClinica, sequelize};