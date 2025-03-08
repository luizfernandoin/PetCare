import { NextFunction, Router, Request, Response } from "express";
import authenticateToken from "../utils/middlewares/authenticateToken";
import ReviewService from "../service/reviewService";
import Review from "../models/avaliacoes";
import TouristPlace from "../models/service";
import HttpError from "../utils/errors/HttpError";
import UserService from "../service/userService";
import User from "../models/user";

const router = Router();
const reviewService = new ReviewService(Review, TouristPlace);
const userService = new UserService(User);



router.post("/:serviceId/review", authenticateToken, async(request: Request, response: Response, next: NextFunction) => {
    const { serviceId } = request.params;
    const data = request.body;

    if (!request.user) {
        throw new HttpError("Usuário não autenticado.", 401)
    }

    const user = await userService.getUserByEmail(request.user.email);

    try {
        const review = await reviewService.createReview(user.id, serviceId, data);
        response.status(201).json(review);
    } catch (error) {
        next(error);
    }
})

router.get("/:serviceId/reviews", async(request: Request, response: Response, next: NextFunction) => {
    const { serviceId } = request.params;

    try {
        const reviews = await reviewService.getReviewsForService(serviceId);

        response.status(200).json({
            message: "Reviews encontrados com sucesso!",
            data: reviews,
        });
    } catch(error) {
        next(error);
    }
})

router.delete("/:serviceId/reviews/", authenticateToken, async(request: Request, response: Response, next: NextFunction) => {
    const { serviceId } = request.params;

    if (!request.user) {
        throw new HttpError("Usuário não autenticado.", 401)
    }

    const user = await userService.getUserByEmail(request.user.email);

    try {
        const message = await reviewService.deleteReview(serviceId, user.id);
        response.status(200).json(message);
    } catch (error) {
        next(error);
    }
})


export default router;