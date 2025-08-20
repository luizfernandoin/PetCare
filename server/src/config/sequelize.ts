import { Sequelize } from "sequelize";
import dbConfig from "./database";

const sequelize = new Sequelize(dbConfig)

async function testConnection() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true })
        console.log('Connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to database:', error);
    }
}

testConnection();

export default sequelize;