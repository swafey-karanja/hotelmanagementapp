import axios from "axios";
import { FC } from "react";
import useSWR from "swr";

const RoomReviews: FC<{roomId : string}> = ({ roomId }) => {

    const fetchRoomReviews = async () => {
        const { data } = await axios.get(`/api/room-reviews/${roomId}`);
        return data;
    };

    const { 
        data: roomReviews, 
        error, 
        isLoading 
    } = useSWR("/api/room-reviews", fetchRoomReviews);

    if (error) throw new Error("Cannot fetch data.");
    if (typeof roomReviews === 'undefined' && !isLoading) 
      throw new Error("Cannot fetch data.");

    console.log(roomReviews);

  return (
    <div>RoomReviews</div>
  )
}

export default RoomReviews;