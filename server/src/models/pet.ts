import { DataTypes, Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';
import db from "../config/sequelize";
import User from './user';
import OwnerPet from './owner-pet';
import Consultation from './consultation';
import Appointment from './appointment';


class Pet extends Model<InferAttributes<Pet>, InferCreationAttributes<Pet>> {
    declare id: CreationOptional<string>;
    declare name: string;
    declare breed: CreationOptional<string>;
    declare age: CreationOptional<number>;
    declare size: 'small' | 'medium' | 'large';
    declare photo: CreationOptional<string>;
    declare characteristics: CreationOptional<string>;
    declare image: CreationOptional<string>;

    public getPets!: () => Promise<Pet[]>;
}

Pet.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    breed: {
        type: DataTypes.STRING(25),
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
            min: 0,
        },
    },
    size: {
        type: DataTypes.ENUM('small', 'medium', 'large'),
        allowNull: false,
        validate: {
            isIn: [['small', 'medium', 'large']],
        },
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    characteristics: {
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

Pet.hasMany(Consultation, {
    foreignKey: 'petId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});

Consultation.belongsTo(Pet, {
    foreignKey: 'petId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
});


export default Pet;