import React from 'react'
import { IoIosReturnLeft } from "react-icons/io";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { TbTruckDelivery } from "react-icons/tb";
import Link from 'next/link';
import { routes } from '@/app/utils/routes';

export default function HeroSec() {
  return (
    <>
        <section className="relative w-full py-12 px-6 md:px-12 lg:px-24 flex flex-col-reverse lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-4 text-center sm:pl-16 lg:text-left">
                <h1 className="text-4xl md:text-5xl font-bold">Discover Your Style</h1>
                <p className="mt-4 text-lg text-gray-400">Find the latest trends and best deals on our store. Shop now and redefine your wardrobe. Elevate your look with premium quality apparel and accessories, handpicked just for you.</p>
                <div className="mt-6">
                    <Link href={routes.ALLPRODUCTS} className="px-6 py-3 bg-lime-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-lime-700 transition-all">Shop Now</Link>
                </div>
            </div>

            <div className="lg:w-1/2 flex justify-center">
                <img src="/image/bgImg2.jpg" alt="Hero Image" className="rounded-lg shadow-lg w-3/4 h-85 object-cover" />
            </div>
        </section>
    </>
  )
}
