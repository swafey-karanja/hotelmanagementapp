'use client';

import { User } from "@/app/models/user";
import { getUserBookings } from "@/libs/apis";

import axios from "axios";
import useSWR from "swr";

const userDetails = (props: {params: {id: string}}) => {

  const { params: {id: userId} } = props;

  const fetchUserBookings = async () => getUserBookings(userId);
  const fetchUserData = async () => {
    const {data} = await axios.get<User>('api/users');
    return data;
  };

  const { 
    data: userBookings, 
    error, 
    isLoading 
  } = useSWR('/api/userBooking', fetchUserBookings);

  const { 
    data: userData ,
    error: errorGettingUserData,
    isLoading: loadingUserData,
  } = useSWR('api/users', fetchUserData);

  if ( error || errorGettingUserData ) throw new Error(error);
  if (typeof userBookings === 'undefined' && !isLoading)
    throw new Error ('Cannot fetch data');

  console.log(userData);

  return (
    <div className="container flex">userDetails</div>
  )
}

export default userDetails;