import { Review } from "@/app/models/review";
import axios from "axios";
import { FC } from "react";
import useSWR from "swr";
import Rating from "../Rating/Rating";

const RoomReviews: FC<{roomId: string}> = ({ roomId }) => {

    // Fetch reviews based on roomId
    const fetchRoomReviews = async () => {
        const { data } = await axios.get<Review[]>(`/api/room-reviews/${roomId}`);
        return data;
    };

    const { 
        data: roomReviews, 
        error, 
        isLoading 
    } = useSWR(`/api/room-reviews/${roomId}`, fetchRoomReviews);

    // Error handling
    if (error) return <div>Error loading reviews.</div>;
    if (isLoading) return <div>Loading reviews...</div>;

    // Check if roomReviews is an array before mapping
    if (!Array.isArray(roomReviews)) {
        return <div>No reviews available.</div>;
    }

    return (
        <>
            {roomReviews.map(review => (
                <div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg" key={review._id}>
                    <div className="font-semibold mb-2 flex">
                        <p>{review.user.name}</p>
                        <div className="ml-4 flex items-center text-tertiary-light text-lg">
                            <Rating rating={review.userRating} />
                        </div>
                    </div>
                    <p>{review.text}</p>
                </div>
            ))}
        </>
    );
};

export default RoomReviews;
