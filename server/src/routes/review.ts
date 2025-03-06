import { NextFunction, Router, Request, Response } from "express";
import authenticateToken from "../utils/middlewares/authenticateToken";
import ReviewService from "../service/reviewService";
import Review from "../models/avaliacoes";
import TouristPlace from "../models/service";
import HttpError from "../utils/errors/HttpError";

const router = Router();
const reviewService = new ReviewService(Review, TouristPlace);



router.post("/:serviceId", authenticateToken, async(request: Request, response: Response, next: NextFunction) => {
    const { serviceId } = request.params;
    const data = request.body;

    if (!request.user) {
        throw new HttpError("Usuário não autenticado.", 401)
    }

    const userID = request.user.id;

    try {
        const review = await reviewService.createReview(userID, serviceId, data);
        response.status(201).json(review);
    } catch (error) {
        next(error);
    }
})

router.get("/:serviceId", async(request: Request, response: Response, next: NextFunction) => {
    const { serviceId } = request.params;

    try {
        const reviews = await reviewService.getReviewsForService(serviceId);
        response.status(200).json(reviews);
    } catch(error) {
        next(error);
    }
})

router.delete("/", authenticateToken, async(request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;

    if (!request.user) {
        throw new HttpError("Usuário não autenticado.", 401)
    }

    const userID = request.user?.id;

    try {
        const message = await reviewService.deleteReview(id, userID);
        response.status(200).json(message);
    } catch (error) {
        next(error);
    }
})


export default router;