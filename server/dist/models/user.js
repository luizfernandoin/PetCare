"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const user = (sequelize) => {
    const User = sequelize.define('User', {
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
        tableName: 'users'
    });
    return User;
};
exports.default = user;
