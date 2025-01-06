"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("../config/sequelize"));
class DonoPet extends sequelize_1.Model {
}
;
DonoPet.init({
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
    sequelize: sequelize_2.default,
    tableName: 'DonoPet',
    timestamps: false
});
exports.default = DonoPet;
