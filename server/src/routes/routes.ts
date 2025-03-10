import { Router } from "express";
import userRouter from './users';
import petRouter from './pet';
import clinicaRouter from './clinica';
import serviceRouter from './service';
import authRouter from "./authentication";
import reviewRouter from "./review";
import agendamentoRouter from "./agendamento";


const router = Router();

router.use("/users", userRouter);
router.use("/pets", petRouter);
router.use("/clinicas", clinicaRouter, agendamentoRouter);
router.use("/services", serviceRouter, reviewRouter);
router.use("/auth", authRouter);


export default router;