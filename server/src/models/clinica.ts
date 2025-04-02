import { CreationOptional, DataTypes, Model } from 'sequelize';
import db from "../config/sequelize";
import User from './user';
import TrabalhaClinica from './TrabalhaClinica';
import Service from './service';
import Horario from './horario';
import Agendamento from './agendamento';
import sequelize from 'sequelize';


class Clinica extends Model {
    declare id: string;
    declare nome: string;
    declare telefone: string;
    declare location: {
        type: string;
        coordinates: [number, number];
    };
    declare image: CreationOptional<string>;
};

Clinica.init({
    id: {
        type: sequelize.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nome: {
        type: sequelize.STRING(100),
        allowNull: false,
    },
    telefone: {
        type: sequelize.STRING(15),
        allowNull: false,
    },
    location: {
        type: DataTypes.GEOMETRY("POINT"),
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'clinicas',
    sequelize: db
});

Clinica.hasMany(Service, {
    foreignKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
  
Service.belongsTo(Clinica, {
foreignKey: 'clinicaId',
onDelete: 'CASCADE',
onUpdate: 'CASCADE',
});

Clinica.hasMany(Horario, {
    foreignKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});
  
Horario.belongsTo(Clinica, {
foreignKey: 'clinicaId',
onDelete: 'CASCADE',
onUpdate: 'CASCADE',
});


export default Clinica;