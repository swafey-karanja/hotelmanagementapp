'use client';

import { Dispatch, FC, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

type Props = {
    price: number;
    discount: number;
    specialNote: string;
    checkInDate: Date | null;
    setCheckInDate: Dispatch<SetStateAction<Date | null>>;
    checkOutDate: Date | null;
    setCheckOutDate: Dispatch<SetStateAction<Date | null>>;
    calcMinCheckoutDate: () => Date | null;
    adults: number;
    children: number;
    setAdults: Dispatch<SetStateAction<number>>;
    setChildren: Dispatch<SetStateAction<number>>;
    isBooked: boolean;
    handleBooking: () => void;
};

const BookRoomCta: FC<Props> = props => {

    const {
         price, 
         discount, 
         specialNote, 
         checkInDate, 
         setCheckInDate, 
         checkOutDate, 
         setCheckOutDate, 
         calcMinCheckoutDate, 
         adults, 
         children, 
         setAdults, 
         setChildren,
         isBooked,
         handleBooking
    } = props;

    const discountedPrice = price - (price / 100) * discount;

    const calcNoofDays = () => {
        if (!checkInDate || !checkOutDate) return 0;
        const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
        const noOfDays = Math.ceil(timeDiff / (24* 60 * 60 * 1000));
        return noOfDays;
    };

  return (
    <div className="px-7 py-6">
        <h3>
            <span className={`${discount ? 'text-gray-400' : ''} font-bold text-xl`}>
                $ {price}
            </span>

            {discount 
             ? <span className="font-bold text-xl">
                {' '} | discount {discount}%. Now <span className="text-tertiary-dark">$ {discountedPrice}</span> 
               </span> 
             : ''
            }
        </h3>

        <div className="w-full border-b-2 border-b-secondary my-2"/>

        <div className="my-8">{specialNote}</div>

        <div className="grid">
            <div className="w-full pr-2">
                <label htmlFor="check-in-date" className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                    Check In Date
                </label>

                <DatePicker
                    selected={checkInDate ?? undefined} // Convert null to undefined
                    onChange={date => setCheckInDate(date as Date | null)} // Type assertion
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    id="check-in-date"
                    className="w-full border rounded-lg text-black border-gray-300 p-2.5 focus:ring-primary focus:border-primary"
                />
            </div>

            <div className="w-full pr-2 mt-4">
                <label htmlFor="check-out-date" className="block text-sm font-medium text-gray-900 dark:text-gray-400 mb-2">
                    Check Out Date
                </label>

                <DatePicker
                    selected={checkOutDate ?? undefined} // Convert null to undefined
                    onChange={date => setCheckOutDate(date as Date | null)} // Type assertion
                    dateFormat="dd/MM/yyyy"
                    minDate={calcMinCheckoutDate() ?? undefined} // Convert null to undefined
                    disabled={!checkInDate}
                    id="check-out-date"
                    className="w-full border rounded-lg text-black border-gray-300 p-2.5 focus:ring-primary focus:border-primary"
                />
            </div>
        </div>

        <div className="flex mt-4">
            <div className="w-full pr-2">
                <label htmlFor="adults" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-400">
                    Adults
                </label>
                <input 
                  type="number" 
                  id="adults" 
                  value={adults} 
                  onChange={(e) => setAdults(+e.target.value)}
                  min={1}
                  max={5}
                  className="text-black w-full border border-gray-300 rounded-lg p-2.5"
                />
            </div>
        </div>

        <div className="flex mt-4">
            <div className="w-full pr-2">
                <label htmlFor="chidren" className="block text-sm font-medium mb-2 text-gray-900 dark:text-gray-400">
                    Children
                </label>
                <input 
                  type="number" 
                  id="children" 
                  value={children} 
                  onChange={(e) => setChildren(+e.target.value)}
                  min={0}
                  max={5}
                  className="text-black w-full border border-gray-300 rounded-lg p-2.5"
                />
            </div>
        </div>

        {calcNoofDays() > 0 
          ?( <p className="mt-3">Total Price: $ {calcNoofDays() * discountedPrice}</p> )
          : (<></>)
        }

        <button 
          className="btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed"
          disabled={isBooked}
          onClick={handleBooking}
        >
            {isBooked ? "Booked" : "Book Now"}
        </button>
    </div>
  )
}

export default BookRoomCta;