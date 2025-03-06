import { ModelStatic } from "sequelize";
import Avaliacoes from "../models/avaliacoes";
import HttpError from "../utils/errors/HttpError";
import Service from "../models/service";

class ReviewService {
    private reviewModel: ModelStatic<Avaliacoes>;
    private serviceModel: ModelStatic<Service>;

    constructor(reviewModel: ModelStatic<Avaliacoes>, placeModel: ModelStatic<Service>) {
        this.reviewModel = reviewModel;
        this.serviceModel = placeModel
    };

    async createReview(userID: string, serviceID: string, data: Partial<Avaliacoes>) {
        const service = await this.serviceModel.findByPk(serviceID);
        if (!service) {
            throw new HttpError("Serviço não encontrado.", 404);
        }

        if (!data.nota || !data.comentario) {
            throw new HttpError("Nota e comentário são obrigatórios.", 400);
        }

        const review = await Avaliacoes.create({
            userId: userID,
            serviceId: serviceID,
            nota: data.nota,
            comentario: data.comentario,
        });

        return review;
    }

    async getReviewsForService(serviceID: string) {
        const reviews = await Avaliacoes.findAll({
            where: { serviceID },
            order: [["createdAt", "DESC"]],
        });

        if (!reviews || reviews.length === 0) {
            throw new HttpError("Nenhum review encontrado para este serviço.", 404);
        }

        return reviews;
    }

    async getReviewById(reviewID: string) {
        const review = await Avaliacoes.findByPk(reviewID);

        if (!review) {
            throw new HttpError("Review não encontrado.", 404);
        }

        return review;
    }

    async deleteReview(reviewID: string, userID: string) {
        const review = await Avaliacoes.findByPk(reviewID);

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