export type UpdateReviewDto = {
    reviewId: string; 
    reviewText: string; 
    ratingValue: number;
};

export type CreateReviewDto = {
    hotelRoomId: string;
    reviewText: string;
    userRating: number;
    userId: string;
};

export type Review = {
    text: string;
    user: { name: string };
    userRating: number;
    _createdAt: Date;
    _id: string;
};