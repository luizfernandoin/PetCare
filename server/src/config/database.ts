import dotenv from 'dotenv';
import { Dialect } from 'sequelize';
import { Options } from 'sequelize';


dotenv.config();

const dbConfig: Options = {
    database: process.env.DB_NAME as string,
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string, 10),
    dialect: 'postgres' as Dialect,
};

export default dbConfig;