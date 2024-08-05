'use client';

import { Dispatch, FC, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css"

type Props = {
    price: number;
    discount: number;
    specialNote: string;
    checkInDate: Date | null;
    setCheckInDate: Dispatch<SetStateAction<Date | null>>;
};

const BookRoomCta: FC<Props> = props => {

    const { price, discount, specialNote, checkInDate, setCheckInDate } = props;

    const discountPrice = price - (price / 100) * discount;

  return (
    <div className="px-7 py-6">
        <h3>
            <span className={`${discount ? 'text-gray-400' : ''} font-bold text-xl`}>
                $ {price}
            </span>

            {discount 
             ? <span className="font-bold text-xl">
                {' '} | discount {discount}%. Now <span className="text-tertiary-dark">$ {discountPrice}</span> 
               </span> 
             : ''
            }
        </h3>

        <div className="w-full border-b-2 border-b-secondary my-2"/>

        <div className="my-8">{specialNote}</div>

        <div className="flex">
            <div className="w-1/2 pr-2">
                <label htmlFor="check-in-date" className="block text-sm font-medium text-gray-900 dark:text-gray-400">
                    Check In Date
                </label>

                <DatePicker 
                  selected={checkInDate} 
                  onChange={date => setCheckInDate(date)} 
                  dateFormat="dd/MM/yyyy" 
                  minDate={new Date()} 
                  id="check-in-date"
                  className="w-full border rounded-lg text-black border-gray-300 p-2.5 focus:ring-primary focus:border-primary"
                />
            </div>
        </div>
    </div>
  )
}

export default BookRoomCta