import React from 'react'
import { IoIosHeartEmpty } from "react-icons/io";

export default function ProductCard({ title, summary, price, img }) {
  return (
    <>
    <div className="bg-gray-800 shadow-lg w-[215px] h-[350px] hover:shadow-2xl">
      <div className="w-full h-[240px] overflow-hidden mb-4">
        <img
          src={img}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>
      <div className='px-4 pb-4'>
        <div className='flex justify-between'>
          <h3 className="text-md font-bold text-white mb-1">{title}</h3>
          {/* <IoIosHeartEmpty className="w-6 h-6 text-gray-400 right-3 cursor-pointer"/> */}
        </div>
        <p className="text-sm text-gray-400 mb-2">
            {summary}
        </p>
        <p className="text-md font-semibold text-lime-400">Rs. {price}</p>
      </div>
    </div>
    </>
  )
}
