import React from 'react'
import { IoIosReturnLeft } from "react-icons/io";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { TbTruckDelivery } from "react-icons/tb";

export default function HeroSec() {
  return (
    <>
          <div className='bg-[url(/image/bgImg.jpg)] bg-no-repeat bg-cover h-[60vh] relative opacity-50 bg-blend-multiply bg-gray-500 z-[-1] flex items-center justify-center'>
              <div className='text-center'>
                  <div className='text-4xl font-bold mb-4 text-white'>Lowest Prices Best Quality Shopping</div>
                  <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-2 sm:space-y-0">
                      <div className="flex items-center justify-center p-3 sm:p-[15px]">
                          <TbTruckDelivery aria-hidden="true" className="size-5" />
                          <span className="ml-2 text-sm sm:text-base">Free Delivery</span>
                      </div>

                      <div className="flex items-center justify-center p-3 sm:p-[15px]">
                          <HiOutlineBanknotes aria-hidden="true" className="size-5" />
                          <span className="ml-2 text-sm sm:text-base">Cash on Delivery</span>
                      </div>

                      <div className="flex items-center justify-center p-3 sm:p-[15px]">
                          <IoIosReturnLeft aria-hidden="true" className="size-5" />
                          <span className="ml-2 text-sm sm:text-base">Easy Return</span>
                      </div>
                  </div>
                  <div><button className='bg-lime-400 rounded px-[30px] py-[10px] text-gray-900'>Shop Now </button></div>
              </div>
          </div>  
    </>
  )
}
