'use client';

import { User } from "@/app/models/user";
import { getUserBookings } from "@/libs/apis";
import LoadingSpinner from "../../loading";

import axios from "axios";
import useSWR from "swr";
import Image from "next/image";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import Table from "@/components/Table/Table";
import Chart from "@/components/Chart/Chart";
import RatingModal from "@/components/RatingModal/RatingModal";
import BackDrop from "@/components/BackDrop/BackDrop";
import toast from "react-hot-toast";


const userDetails = (props: {params: {id: string}}) => {

  const { params: {id: userId} } = props;

  const [currentNav, setCurrentNav] = useState<
    'bookings' | 'amount' | 'ratings'
  >('bookings');
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [ratingValue, setRatingValue] = useState(0);
  const [ratingText, setRatingText] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const toggleRatingModal = () => setIsRatingVisible(prevState => !prevState);

  const reviewSubmitHandler = async () => {
    if (!ratingText.trim().length || !ratingValue) {
      return toast.error('Please provide rating text and a rating value');
    }

    if (!roomId) toast.error('Room ID required');

    setIsSubmittingReview(true);

    try {
      const { data } = await axios.post("/api/users", {roomId, reviewText: ratingText, ratingValue});
      console.log(data);
      toast.success("Review Submitted Succesfully");
    } catch (error) {
      console.log(error);
      toast.error('review submission failed');
    } finally {
      setRatingText("");
      setRatingValue(0);
      setRoomId(null);
      setIsSubmittingReview(false);
      setIsRatingVisible(false);
    }
  };

  const fetchUserBooking = async () => getUserBookings(userId);
  const fetchUserData = async () => {
    const { data } = await axios.get<User>('/api/users');
    return data;
  };

  const {
    data: userBookings,
    error,
    isLoading,
  } = useSWR('/api/userbooking', fetchUserBooking);

  const {
    data: userData,
    isLoading: loadingUserData,
    error: errorGettingUserData,
  } = useSWR('/api/users', fetchUserData);

  if (error || errorGettingUserData) throw new Error('Cannot fetch data');
  if (typeof userBookings === 'undefined' && !isLoading)
    throw new Error('Cannot fetch data');
  if (typeof userData === 'undefined' && !loadingUserData)
    throw new Error('Cannot fetch data');


  if(loadingUserData || isLoading) return <LoadingSpinner />;
  if (!userData) throw new Error('Cannot fetch User data');


  return (
    <div className="container mx-auto px-2 md:px-4 py-10">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="hidden md:block md:col-span-4 lg:col-span-3 shadow-lg h-fit sticky top-10 bg-[#eff0f2] text-black rounded-lg px-6 py-4">
          <div className="md:w-[143px] w-38 h-28 md:h-[143px] mx-auto mb-5 rounded-full overflow-hidden">
            <Image 
              src={userData.image} 
              alt={userData.name} 
              width={143} 
              height={143} 
              className="img scale-animation rounded-full"
            />
          </div>
          <div className="font-normal py-4 text-left">
            <h6 className="text-xl font-bold pb-3">About</h6>
            <p className="text-sm">{userData.about ?? ''}</p>
          </div>
          <div className="font-normal text-left">
            <h6 className="text-xl font-bold pb-3">{userData.name}</h6>
          </div>
          <div className="flex items-center">
            <p className="mr-2">Sign Out</p>
            <FaSignOutAlt 
              className="text-3xl cursor-pointer" 
              onClick={() => signOut({ callbackUrl: '/' })}
            />
          </div>
        </div>

        <div className="md:col-span-8 lg:col-span-9">
          <div className="flex items-center">
            <h5 className="text-2xl font-bold mr-3">Hello, {userData.name}</h5>
          </div>
          <div className="md:hidden w-14 h-14 rounded-full overflow-hidden">
            <Image 
              className="img scale-animation rounded-full" 
              width={56} 
              height={56} 
              src={userData.image}
              alt="User Name"
            />
          </div>
          <p className="block w-fit md:hidden text-sm py-2">
            {userData.about ?? ""}
          </p>

          <p className="text-xs py-2 font-medium">
            Joined In {userData._createdAt.split('T')[0]}
          </p>

          <div className="md:hidden flex items-center my-2">
            <p className="mr-2">Sign-Out</p>
            <FaSignOutAlt 
              className="text-3xl cursor-pointer" 
              onClick={() => signOut({ callbackUrl: '/' })}
            />
          </div>

          <nav className="sticky top-0 px-2 w-fit mx-auto md:w-full md:px-5 py-3 mb-8 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mt-7">
            <ol 
              className=
                {`${currentNav === 'bookings' ? "text-blue-600" : "text-gray-700"}
                inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li 
                className="cursor-pointer inline-flex items-center" 
                onClick={() => setCurrentNav('bookings')}
              >
                <BsJournalBookmarkFill />
                <a className="inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium">
                  Current Bookings
                </a>
              </li>
            </ol>

            <ol 
              className=
                {`${currentNav === 'amount' ? "text-blue-600" : "text-gray-700"}
                inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li 
                className="cursor-pointer inline-flex items-center" 
                onClick={() => setCurrentNav('amount')}
              >
                <GiMoneyStack />
                <a className="inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium">
                  Amount Spent
                </a>
              </li>
            </ol>
          </nav>

          {currentNav === 'bookings' ? (
            userBookings && <Table bookingDetails={userBookings} setRoomId={setRoomId} toggleRatingModal={toggleRatingModal}/>
            ) : (
            <></>
            )
          }

          {currentNav === 'amount' ? (
            userBookings && <Chart userBookings={userBookings} />
            ) : (
              <></>
            )
          }
        </div>
      </div>

      <RatingModal 
        isOpen={isRatingVisible} 
        ratingValue={ratingValue} 
        setRatingValue={setRatingValue}
        ratingText={ratingText} 
        setRatingText={setRatingText}
        reviewSubmitHandler={reviewSubmitHandler}
        isSubmittingReview={isSubmittingReview}
        toggleRatingModal={toggleRatingModal}
      />
      <BackDrop isOpen={isRatingVisible}/>

    </div>
  )
};

export default userDetails;