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
    async(request: Request, response: Response, next: NextFunction) => {
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

    if (!appointmentData.petId || !appointmentData.serviceId || !appointmentData.appointmentDate ||
        !appointmentData.startTime || !appointmentData.endTime || !appointmentData.status) {
        next(new HttpError("All required fields must be provided.", 400));
    }

    try {
        const available = await appointmentService.checkAvailability(appointmentData);
        if (!available) {
            return next(new HttpError("Time slot unavailable for appointment.", 400));
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


export default router;