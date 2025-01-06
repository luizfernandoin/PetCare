import express, { request, response } from 'express';
import userRouter from './routes/users'
import cors from 'cors';
import sequelize from './config/sequelize';
import router from './routes/routes';
import errorMiddleware from './utils/middlewares/error';
//import { injectDb } from './middlewares/injectDb.mjs';


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
app.use(errorMiddleware)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})

sequelize.sync().then(() => {
  console.log('Conectado ao BD')
})