'use client'
import React, { Fragment, use, useEffect, useState } from 'react'
import { IoIosHeartEmpty } from "react-icons/io";
import { HiOutlineShoppingBag, HiMinus } from "react-icons/hi2";
import { addToCart, getProductById } from '@/app/apiService';
import { toast } from 'react-toastify';
import { AiOutlinePlus } from "react-icons/ai";

export default function Page({ params }) {

  const { id } = use(params);

  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedQty, setSelectedQty] = useState(1)

  const increase = () => setSelectedQty((prev) => Math.min(prev + 1, product?.quantity));
  const decrease = () => setSelectedQty((prev) => Math.max(prev - 1, 1));

  const getProduct = async() => {
    try {
        const response = await getProductById(id)
        console.log(response);
        setProduct(response?.data?.data)
        console.log(response?.data?.data);

    } catch (error) {
        toast.error('Product not available')
    }
  }

  const addToMyCart = async() => {
    const payload = {
      productId: product?._id,
      quantity: selectedQty,
      size: selectedSize
    }
    try {
        const response = await addToCart(payload)
        toast.success('Product added successfully')
        console.log(response);
    } catch (error) {
        toast.error('Product not available')
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  useEffect(() => {
    console.log(product);
    
  }, [product])

  return (
    <>
    <div className=" min-h-screen text-white px-8 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-12">

        <div className="space-y-4">
          <div className="rounded-lg grid grid-cols-2 overflow-hidden gap-4">
            <img
              src={product?.images[0]}
              alt="Product Main"
              className="w-full h-auto rounded-lg object-cover"
            />
            {product?.images[1] ? (<><img
              src={product?.images[1]}
              alt="Product Main"
              className="w-full h-auto rounded-lg object-cover"
            />
            </>) : ''} 
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product?.images?.map((img, i) => (
                <Fragment key={i}>
                    {i >= 2 && 
                    <img
                    src={img}
                    alt="Product Thumbnail"
                    className="rounded-lg w-full h-auto object-cover"
                    />}
                </Fragment>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product?.title}</h1>
          <p className="text-gray-400">
            {product?.summary}
          </p>
          <p className="text-2xl font-semibold text-lime-400">Rs. {product?.sizes[0]?.price}</p>

          <div className="flex items-center space-x-4">
            <label className="text-gray-300 text-lg">Quantity:</label>
            <div className="flex items-center border border-gray-600 rounded-lg bg-gray-800">
              <button
                onClick={decrease}
                className="px-3 py-2 hover:bg-gray-700 rounded-l-lg"
              >
                <HiMinus className="w-5 h-5 text-white" />
              </button>
              <input
                type="number"
                className="w-12 text-center bg-gray-800 text-white outline-none"
                value={selectedQty}
                onChange={(e) => {
                  const value = Math.max(1, Math.min(product?.quantity, e.target.value));
                  setSelectedQty(value || 1);
                }}
              />
              <button
                onClick={increase}
                className="px-3 py-2 hover:bg-gray-700 rounded-r-lg"
              >
                <AiOutlinePlus className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-4 text-gray-300 text-lg">Select Size</label>
            <div className="flex space-x-4">
                {product?.sizes?.map((size) => (
                    <button
                        key={size.name}
                        onClick={() => setSelectedSize(size.name)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full border-2 ${selectedSize === size.name
                            ? "bg-lime-500 text-white border-lime-500"
                            : "text-gray-300 border-gray-600"
                            } hover:bg-lime-400 hover:text-white transition`}
                    >
                        {size.name}
                    </button>
                ))}
            </div>
          </div>
          <div className="flex space-x-4 mt-4">
            <button onClick={addToMyCart} className="flex items-center space-x-2 bg-lime-500 text-white px-6 py-3 rounded-lg hover:bg-lime-600 transition">
              <HiOutlineShoppingBag className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
            <button className="flex items-center space-x-2 bg-gray-700 text-white px-4 py-3 rounded-lg hover:outline-gray-500 hover:outline transition">
              <IoIosHeartEmpty className="w-5 h-5" />
              <span>Wishlist</span>
            </button>
          </div>
          <div className="space-y-1 mt-4">
            <p className="text-gray-400">✔ 100% Original Products</p>
            <p className="text-gray-400">✔ Pay on delivery might be available</p>
            <p className="text-gray-400">✔ Easy 14 days returns and exchanges</p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-gray-400">
              {product?.desc}
            </p>
          </div>
        </div>
      </div>
    </div>  
    </>
  )
}
