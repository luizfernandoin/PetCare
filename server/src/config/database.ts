import dotenv from 'dotenv';
import { Dialect } from 'sequelize';

dotenv.config();

module.exports = {
    database: process.env.DB_NAME as string,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string, 10),
    dialect: 'postgres' as Dialect,
};
