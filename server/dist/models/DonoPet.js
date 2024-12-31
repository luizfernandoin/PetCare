"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const DonoPet = (sequelize) => {
    const DonoPet = sequelize.define('DonoPet', {
        userId: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            references: {
                model: 'users',
                key: 'id',
            },
            primaryKey: true,
        },
        petId: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            references: {
                model: 'pets',
                key: 'id',
            },
            primaryKey: true,
        }
    }, {
        tableName: 'DonoPet',
        timestamps: false
    });
    return DonoPet;
};
exports.default = DonoPet;
