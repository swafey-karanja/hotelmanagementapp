import { CheckIfReviewExists, createReview, getUserData, updateReview } from "@/libs/apis";
import { authOptions } from "@/libs/auth";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
    const session = await getServerSession(authOptions);

    if(!session) {
        return new NextResponse('Authentication Required', {status: 500});
    }

    const userId = session.user.id;

    try {
        const data = await getUserData(userId);
        return NextResponse.json(data, {status: 200, statusText: 'Succesful'})
    } catch (error) {
        return new NextResponse('Unable to fetch', {status: 400});
    }
}

export async function POST(req: Request, res: Response) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return new NextResponse('Authentication required', {status: 500});
    };

    const { roomId, reviewText, ratingValue } = await req.json();

    if (!roomId || !reviewText || !ratingValue) {
        return new NextResponse('All fields are required', {status: 400})
    };

    const userId = session.user.id;

    try {
        //check if a review from the user already exists
        const alreadyExists = await CheckIfReviewExists(userId, roomId);

        let data;

        if (alreadyExists) {
            data = await updateReview({
                reviewId: alreadyExists._id, 
                reviewText, 
                ratingValue
            });
        } else {
            data = await createReview({ 
                hotelRoomId: roomId, 
                reviewText, 
                userId, 
                userRating: ratingValue 
            });
        }

        return new NextResponse('Successful', {status: 200});

    } catch (error: any) {
        console.log('Error Updating', error);
        return new NextResponse('Unable to create review', {status: 400});
    }
}