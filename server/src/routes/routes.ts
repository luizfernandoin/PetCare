import { Router } from "express";
import userRouter from './users';
import petRouter from './pet';
import clinicaRouter from './clinic';
import serviceRouter from './service';
import authRouter from "./authentication";
import reviewRouter from "./review";
import agendamentoRouter from "./scheduling";


const router = Router();

router.use("/users", userRouter);
router.use("/pets", petRouter);
router.use("/clinicas", clinicaRouter, agendamentoRouter);
router.use("/services", serviceRouter, reviewRouter);
router.use("/auth", authRouter);


export default router;