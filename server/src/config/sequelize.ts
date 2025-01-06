import { Sequelize } from "sequelize";
import dbConfig from "./database";

const sequelize = new Sequelize(dbConfig)

async function testConnection() {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true })
        console.log('Cenexão estabelecida com sucesso.');
    } catch (error) {
        console.error('Não é possível conectar ao banco de dados:', error);
    }
}

testConnection();

export default sequelize;