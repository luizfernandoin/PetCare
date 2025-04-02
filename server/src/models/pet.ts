import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from "../config/sequelize";
import User from './user';
import DonoPet from './DonoPet';
import Atendimento from './atendimento';
import Agendamento from './agendamento';


class Pet extends Model<InferAttributes<Pet>, InferCreationAttributes<Pet>> {
    declare id: CreationOptional<string>;
    declare nome: string;
    declare raca: CreationOptional<string>;
    declare idade: CreationOptional<number>;
    declare porte: 'pequeno' | 'medio' | 'grande';
    declare foto: CreationOptional<string>;
    declare caracteristicas: CreationOptional<string>;
    declare image: CreationOptional<string>;

    public getPets!: () => Promise<Pet[]>;
}

Pet.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    raca: {
        type: DataTypes.STRING(25),
        allowNull: true,
    },
    idade: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0,
        },
    },
    porte: {
        type: DataTypes.ENUM('pequeno', 'medio', 'grande'),
        allowNull: false,
        validate: {
            isIn: [['pequeno', 'medio', 'grande']],
        },
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    caracteristicas: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
{
    sequelize: db,
    tableName: 'pets',
});

Pet.hasMany(Atendimento, {
    foreignKey: 'petId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Atendimento.belongsTo(Pet, {
    foreignKey: 'petId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});


export default Pet;