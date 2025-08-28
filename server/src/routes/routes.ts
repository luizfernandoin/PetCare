import { Router } from "express";
import userRouter from './users';
import petRouter from './pet';
import clinicRouter from './clinic';
import serviceRouter from './service';
import authRouter from "./authentication";
import reviewRouter from "./review";
import appointmentRouter from "./appointment";


const router = Router();

router.use("/users", userRouter, appointmentRouter);
router.use("/pets", petRouter);
router.use("/clinics", clinicRouter, appointmentRouter);
router.use("/services", serviceRouter, reviewRouter);
router.use("/auth", authRouter);


export default router;