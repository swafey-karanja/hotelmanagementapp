'use client';

import { Room } from "@/app/models/room";
import RoomCard from "@/components/RoomCard/RoomCard";
import Search from "@/components/Search/Search";
import { getRooms } from "@/libs/apis";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

const Rooms = () => {
  const [roomTypeFilter, setRoomTypeFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const searchQuery = searchParams.get('searchQuery');
    const roomType = searchParams.get('roomType');

    if (roomType) setRoomTypeFilter(roomType);
    if (searchQuery) setSearchQuery(searchQuery);
  }, []);

  async function fetchData() {
    return getRooms();
  }

  const { data, error, isLoading } = useSWR('get/hotelRooms', fetchData);

  if (error) throw new Error("Cannot fetch data.");
  if (typeof data === 'undefined' && !isLoading) 
    throw new Error("Cannot fetch data.");

  const filterRooms = (rooms: Room[]) => {
    return rooms.filter(room => {
      if (
        roomTypeFilter && typeof roomTypeFilter === "string" &&
        roomTypeFilter.toLowerCase() !== 'all' && 
        typeof room.type === "string" &&
        room.type.toLowerCase() !== roomTypeFilter.toLowerCase()
      ) {
        return false;
      }

      // Apply search query filter
      if (
        searchQuery &&
        !room.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      return true; // Keep the room if it passes all checks
    });
  };

  const filteredRooms = filterRooms(data || []);

  return (
    <div className="container mx-auto pt-10">
      <Search 
        roomTypeFilter={roomTypeFilter} 
        searchQuery={searchQuery} 
        setRoomTypeFilter={setRoomTypeFilter} 
        setSearchQuery={setSearchQuery} 
      />
      <div className="flex flex-wrap mt-20 justify-between">
        {filteredRooms.map(room => (
          <RoomCard key={room._id} room={room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
