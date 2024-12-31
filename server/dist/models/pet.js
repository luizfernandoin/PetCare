"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const pet = (sequelize) => {
    const Pet = sequelize.define('Pet', {
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
        tableName: 'pets',
    });
    return Pet;
};
exports.default = pet;
