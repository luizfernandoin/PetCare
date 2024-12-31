import { Router } from "express";
import userRouter from './users';
import petRouter from './pet';
import clinicaRouter from './clinica';
import serviceRouter from './service';


const router = Router();

router.use(userRouter);
router.use(petRouter);
router.use(clinicaRouter);
router.use(serviceRouter);

export default router;