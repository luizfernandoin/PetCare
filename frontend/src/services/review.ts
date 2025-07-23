import api from "@/config/api";
import { ApiResponse } from "@/types/api";
import { Review, ReviewCreate } from "@/types/Review";


export const createReview = async (serviceId: string, reviewDTO: ReviewCreate) => {
    const response = await api.post<Review>(`/services/${serviceId}/review`, reviewDTO);

    return response.data;
}

export const getReviewsByServiceId = async (serviceId: string): Promise<Review> => {
    const response = await api.get<ApiResponse<Review>>(`/services/${serviceId}/reviews`);

    return response.data.data!;
}

export const deleteReviewByServiceId = async (serviceId: string) => {
    const response = await api.delete(`/services/${serviceId}/reviews/`);

    return response.data;
}