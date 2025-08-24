import { Router, Request, Response, NextFunction } from "express";
import PetService from "../service/petService";
import UserService from "../service/userService";
import dotenv from 'dotenv';
import authenticateToken from "../utils/middlewares/authenticateToken";
import User from "../models/user";
import Pet from "../models/pet";
import HttpError from "../utils/errors/HttpError";
import { validate, validateParams } from "../utils/middlewares/validate";
import { 
    userUpdateSchema, 
    urlParamsSchema 
} from "@petcare/shared";
import typeUser from "src/utils/middlewares/typeUser";
import { USER_ROLE } from "@petcare/shared/src/enums";
import AppointmentService from "src/service/appointmentService";
import Appointment from "src/models/appointment";


const router = Router();
const userService = new UserService(User);
const petService = new PetService(Pet);
const appointmentService = new AppointmentService(Appointment);

router.get("/", async (request: Request, response: Response) => {
    try {
        const users = await userService.get();
        response.status(200).json({
            message: "Users retrieved successfully.",
            data: users,
        });
    } catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ message: 'Error retrieving users.', error: error.message });
        }

        response.status(500).json({ message: 'Error retrieving users.', error: 'Unknown error occurred' });
    }
});

router.get("/profile", authenticateToken, async (request: Request, response: Response) => {
    try {
        const userAuth = request.user;

        if (!userAuth) {
            throw new HttpError("User not found", 404);
        }

        const user = await userService.getUserByEmail(userAuth.email);

        response.status(200).json({
            message: "User retrieved successfully.",
            data: user,
        });
    } catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ message: 'Error retrieving user.', error: error.message });
        }

        response.status(500).json({ message: 'Error retrieving users.', error: 'Unknown error occurred' });
    }
})

router.get("/appointments", authenticateToken, typeUser(USER_ROLE.CLIENT), async (request: Request, response: Response) => {
    try {
        const user = await userService.getUserByEmail(request.user.email);

        const appointments = await appointmentService.getAppointmentsByUserId(user.id);

        response.status(200).json({
            message: "Appointments retrieved successfully.",
            data: appointments,
        });
    } catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ message: '.', error: error.message });
        }

        response.status(500).json({ message: 'Error retrieving users.', error: 'Unknown error occurred' });
    }
})

router.get("/pets", authenticateToken, typeUser(USER_ROLE.CLIENT), async (request: Request, response: Response, next: NextFunction) => {
    console.log('AQUI NOS PETS');
    try {
        const user = await userService.getUserByEmail(request.user.email);
        const pets = await petService.getPetsByUserId(user.id);

        console.log(pets);

        response.status(200).json({
            message: "Pets retrieved successfully.",
            data: pets,
        });
    } catch (error) {
        next(error)
    }
});

router.get("/:id", validateParams(urlParamsSchema), async(request: Request, response: Response) => {
    try {
        const { id } = request.params;

        const user = await userService.getUserById(id);

        response.status(200).json({
            message: "User retrieved successfully.",
            data: user,
        });
    } catch (error) {
        if (error instanceof Error) {
            response.status(500).json({ message: 'Error retrieving user.', error: error.message });
        }

        response.status(500).json({ message: 'Error retrieving users.', error: 'Unknown error occurred' });
    }
})

router.delete('/', authenticateToken, async (request: Request, response: Response, next: Function) => {
    try {
        const userAuth = request.user;

        if (!userAuth) {
            throw new HttpError("User not found.", 404);
        }

        const user = await userService.getUserByEmail(userAuth.email);

        const petDeletionResult = await petService.deletePets(user);

        const result = await userService.deleteUser(userAuth);

        response.status(200).json({
            message: "User deleted successfully."
        });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', validateParams(urlParamsSchema), async(request: Request, response: Response, next: Function) => {
    try {
        const { id } = request.params;
        const result = await userService.deleteUserById(id);

        response.status(200).json({"message": "User deleted successfully."});
    } catch (error) {
        next(error)
    }
})

router.put('/profile', validate(userUpdateSchema), authenticateToken, async(request: Request, response: Response, next: NextFunction) => {
    const userAuth = request.user;
    const userDTO = request.body;
    
    try {
        const user = await userService.updateUser(userAuth, userDTO);
        
        response.status(200).json({
            message: "Profile updated successfully.",
            data: user,
        })
    } catch (error) {
        next(error);
    }
})

router.patch("/profile", validate(userUpdateSchema), authenticateToken, async (request: Request, response: Response, next: NextFunction) => {
    const userEmail = request.user.email;
    const updates = request.body;

    if (Object.keys(updates).length === 0) {
        next(new HttpError("No fields were provided for update.", 400));
    }

    try {
        const user = await userService.patchUser(userEmail, updates);

        
        response.status(200).json({
            message: "Profile partially updated successfully.",
            data: user,
        });
    } catch (error) {
        next(error);
    }
});


export default router;
