import express from 'express';
import cors from 'cors';
import sequelize from './config/sequelize';
import router from './routes/routes';
import errorMiddleware from './utils/middlewares/error';
//import { injectDb } from './middlewares/injectDb.mjs';
import swaggerDocsSetup from './config/swagger';
import { requestLogger } from './utils/middlewares/chegouAqui';


const app = express();

app.use(cors());
app.use(express.json());
// app.use(requestLogger);
app.use("/api", router);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    swaggerDocsSetup(app, PORT);
})

sequelize.sync().then(() => {
  console.log('Connected to database')
})