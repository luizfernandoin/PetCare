import { ModelStatic } from "sequelize";
import Review from "../models/review";
import HttpError from "../utils/errors/HttpError";
import Service from "../models/service";

class ReviewService {
    private reviewModel: ModelStatic<Review>;
    private serviceModel: ModelStatic<Service>;

    constructor(reviewModel: ModelStatic<Review>, placeModel: ModelStatic<Service>) {
        this.reviewModel = reviewModel;
        this.serviceModel = placeModel
    };

    async createReview(userID: string, serviceID: string, data: Partial<Review>) {
        console.log(userID, serviceID, data);

        const service = await this.serviceModel.findByPk(serviceID);
        if (!service) {
            throw new HttpError("Serviço não encontrado.", 404);
        }

        if (!data.rating || !data.comment) {
            throw new HttpError("Nota e comentário são obrigatórios.", 400);
        }

        const review = await Review.create({
            userId: userID,
            serviceId: serviceID,
            rating: data.rating,
            comment: data.comment,
        });

        return review;
    }

    async getReviewsForService(serviceID: string) {
        const reviews = await Review.findAll({
            where: { serviceId: serviceID },
            order: [["createdAt", "DESC"]],
        });

        if (!reviews || reviews.length === 0) {
            throw new HttpError("Nenhum review encontrado para este serviço.", 404);
        }

        return reviews;
    }

    async getReviewById(reviewID: string) {
        const review = await Review.findByPk(reviewID);

        if (!review) {
            throw new HttpError("Review não encontrado.", 404);
        }

        return review;
    }

    async deleteReview(serviceId: string, userID: string) {
        const review = await Review.findOne({
            where: {
                userId: userID,
                serviceId 
            }
        });

        if (!review) {
            throw new HttpError("Review não encontrado.", 404);
        }

        if (review.userId !== userID) {
            throw new HttpError("Você não tem permissão para deletar este review.", 403);
        }

        await review.destroy();
        return review;
    }
}


export default ReviewService;