import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import db from "../config/sequelize";
import DonoPet from './DonoPet';
import Pet from './pet';
import Clinica from './clinica';
import TrabalhaClinica from './TrabalhaClinica';
import Atendimento from './atendimento';
import Service from './service';
import Agendamento from './agendamento';
import Avaliacoes from './avaliacoes';


class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<string>;
    declare email: string;
    declare nome: string;
    declare senha: string;
    declare telefone: string;
    declare uf: string;
    declare cidade: string;
    declare rua: string;
    declare bairro: string;
    declare num: string;
    declare tipo: 'Cliente' | 'Profissional';

    public getPets!: () => Promise<Pet[]>;
    public removePets!: (pets: Pet[]) => Promise<void>;
    public addPet!: (pet: Pet) => Promise<void>;
    public removeClinica!: (clinica: Clinica) => Promise<void>;
}

User.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    uf: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    rua: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    bairro: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    num: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    tipo: {
        type: DataTypes.ENUM('Cliente', 'Profissional'),
        allowNull: false,
    },
}, {
    sequelize: db,
    tableName: 'users',
});

User.belongsToMany(Pet, { 
    through: DonoPet,
    foreignKey: 'userId',
    otherKey: 'petId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

Pet.belongsToMany(User, { 
    through: DonoPet,
    foreignKey: 'petId',
    otherKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

User.belongsToMany(Clinica, {
    through: TrabalhaClinica,
    foreignKey: 'userId',
    otherKey: 'clinicaId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

Clinica.belongsToMany(User, {
    through: TrabalhaClinica,
    foreignKey: 'clinicaId',
    otherKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
})

User.hasMany(Atendimento, {
    foreignKey: 'profissionalId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Atendimento.belongsTo(User, {
    foreignKey: 'profissionalId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

User.belongsToMany(Service, { 
    through: Avaliacoes,
    foreignKey: 'userId',
    otherKey: 'serviceId'
});

Service.belongsToMany(User, { 
    through: Avaliacoes,
    foreignKey: 'serviceId',
    otherKey: 'userId'
});


export default User;