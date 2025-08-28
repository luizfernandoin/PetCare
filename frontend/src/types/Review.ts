type Review = {
    userId: string;
    serviceId: string;
    comentario: string;
    nota: number;
}

type ReviewCreate = Omit<Review, 'userId' | 'serviceId'>;

type ReviewUpdate = Partial<ReviewCreate>;


export {
    Review,
    ReviewCreate,
    ReviewUpdate,
}