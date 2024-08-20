import { CreateBookingDto, Room } from "@/app/models/room";
import sanityClient from "./sanity";
import * as queries from "./sanityQueries";
import axios from "axios";
import { Booking } from "@/app/models/booking";
import { CreateReviewDto, Review, UpdateReviewDto } from "@/app/models/review";

export async function getFeaturedRoom() {
    const result = await sanityClient.fetch<Room>(
        queries.getFeaturedRoomQuery, 
        {}, 
        {cache: 'no-cache'}
    );

    return result;
};

export async function getRooms() {
    const result = await sanityClient.fetch<Room[]>(
        queries.getRoomsQuery, 
        {}, 
        {cache: 'no-cache'}
    );

    return result;
};

export async function getRoomData( slug:string ) {
    const result = await sanityClient.fetch<Room>(
        queries.getRoomDataQuery, 
        {slug},
        {cache:'no-cache'}
    )

    return result;
};

export const createBooking = async ({
    adults,
    checkInDate,
    checkOutDate,
    children,
    discount,
    hotelRoom,
    numberOfDays,
    totalPrice,
    user,
  }: CreateBookingDto) => {
    const mutation = {
      mutations: [
        {
          create: {
            _type: 'booking',
            user: { _type: 'reference', _ref: user },
            hotelRoom: { _type: 'reference', _ref: hotelRoom },
            checkInDate,
            checkOutDate,
            numberOfDays,
            adults,
            children,
            totalPrice,
            discount,
          },
        },
      ],
    };
  
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
    );
  
    return data;
};
  
export const updateHotelRoom = async (hotelRoomId: string) => {
    const mutation = {
      mutations: [
        {
          patch: {
            id: hotelRoomId,
            set: {
              isBooked: true,
            },
          },
        },
      ],
    };
  
    const { data } = await axios.post(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      mutation,
      { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
    );
  
    return data;
};

export async function getUserBookings(userId: string) {
  const result = await sanityClient.fetch<Booking[]> (
    queries.getUserBookingsQuery, 
    {userId},
    {cache: "no-cache"}
  );

  return result;
};

export async function getUserData(userId: string) {
  const result = await sanityClient.fetch (
    queries.getUserDataQuery, 
    {userId}, 
    {cache: "no-cache"}
  );

  return result;
};

export async function CheckIfReviewExists(userId: string, hotelRoomId: string): Promise<null | {_id: string}> {
  const params = {
    userId,
    hotelRoomId,
  };

  const result = await sanityClient.fetch(
    queries.checkReviewExistsQuery,
    params
  );

  return result ? result : null;
};

export const updateReview = async ({ reviewId, reviewText, ratingValue }: UpdateReviewDto) => {
  const mutation = {
    mutation : [
      {
        patch: {
          id: reviewId,
          set: {
            text: reviewText,
            userRating: ratingValue,
          }
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export const createReview = async ({hotelRoomId, reviewText, userId, userRating}: CreateReviewDto) => {
  const mutation = {
    mutations : [
      {
        create: {
          _type: 'review',
          user: {
            _type: 'reference',
            _ref: userId,
          },
          hotelRoom: {
            _type: 'reference',
            _ref: hotelRoomId,
          },
          userRating,
          text: reviewText,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}` } }
  );

  return data;
};

export async function getRoomReviews(roomId:string) {
  const result = await sanityClient.fetch<Review[]> (
    queries.getRoomReviewsQuery, 
    {roomId}, 
    {cache: "no-cache"}
  );

  return result;
};
