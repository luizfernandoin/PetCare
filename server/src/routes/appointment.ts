import { Router, Request, Response, NextFunction } from "express";
import Appointment from "../models/appointment";
import AppointmentService from "../service/appointmentService";
import authenticateToken from "../utils/middlewares/authenticateToken";
import UserService from "../service/userService";
import User from "../models/user";
import HttpError from "../utils/errors/HttpError";
import { validate, validateParams } from "../utils/middlewares/validate";
import { appointmentSchema, urlParamsSchema } from "@petcare/shared";


const router = Router();
const appointmentService = new AppointmentService(Appointment)
const userService = new UserService(User);


router.get("/:clinicId/appointments",
    validateParams(urlParamsSchema),
    async (request: Request, response: Response, next: NextFunction) => {
        const { clinicId } = request.params;

        try {
            const appointments = await appointmentService.getAppointmentsForClinicId(clinicId);

            response.status(201).json({
                message: `Appointments retrieved successfully!`,
                data: appointments,
            });
        } catch (error) {
            next(error);
        }
    })

router.post("/:clinicId/appointments",
    validateParams(urlParamsSchema), validate(appointmentSchema),
    authenticateToken, async (request: Request, response: Response, next: NextFunction) => {
        const { clinicId } = request.params;
        const { email } = request.user;
        const user = await userService.getUserByEmail(email);
        const appointmentData = {
            ...request.body,
            clinicId,
            userId: user.id
        };

        try {
            const available = await appointmentService.checkAvailability(appointmentData);
            if (!available) {
                throw new HttpError("Time slot unavailable for appointment.", 400);
            }

            const appointment = await appointmentService.createAppointment(appointmentData);

            response.status(201).json({
                message: `Appointment for pet ${appointment.petId} scheduled at clinic ${appointment.clinicId} successfully!`,
                data: appointment,
            });
        } catch (error) {
            next(error);
        }
    });

router.delete("/appointments/:appointmentId",
    validateParams(urlParamsSchema),
    authenticateToken, async (request: Request, response: Response, next: NextFunction) => {
        const { appointmentId } = request.params;
        const { email } = request.user;
        const user = await userService.getUserByEmail(email);
        
        try {
            const appointment = await appointmentService.getAppointmentById(appointmentId);

            if (appointment.userId !== user.id) {
                throw new HttpError("You are not authorized to cancel this appointment.", 403);
            }

            await appointmentService.deleteAppointment(appointmentId);

            response.status(200).json({
                message: `Appointment ${appointmentId} cancelled successfully!`,
            });
        } catch (error) {
            next(error);
        }
    });


export default router;