import { Sequelize, DataTypes, Model, CreationOptional, ForeignKey } from 'sequelize';
import { pet } from '.';


class Pet extends Model {
    declare id: string;
    declare nome: string;
    declare raca: string;
    declare idade: number;
    declare porte: 'pequeno' | 'medio' | 'grande';
    declare foto: string;
    declare caracteristicas: string;
}

const petModel = (sequelize: Sequelize) => {
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
        }
    },
    {
        sequelize,
        tableName: 'pets',
    });

    return Pet;
};


export default petModel;