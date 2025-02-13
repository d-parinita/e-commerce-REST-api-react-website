'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { getAllProducts } from '../apiService'
import ProductCard from '../Components/ProductCard'
import Link from 'next/link'
import { routes } from '../utils/routes'
import { getPrice } from '../utils/commonFunc'
import { BiSortAlt2 } from "react-icons/bi";

export default function Page() {

  const [products, setProducts] = useState(null)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [currentPageNo, setCurrentPageNo] = useState(1)

  const getAllProductsPage = async () => {
    const preparePayload = `pageNumber=${currentPageNo}&limit=1`
    try {
      const response = await getAllProducts(preparePayload)
      setProducts(response?.data?.products)
      setHasNextPage(response?.data?.hasNextPage)
    } catch (error) {
      toast.error('No product available')
    }
  }

  useEffect(() => {
    getAllProductsPage()
  }, [currentPageNo])

  return (
    <>
      <div>
        <div className="flex space-x-4 bg-gray-800 p-4 mx-36 mt-10">
          <div className="bg-gray-700 text-sm text-white px-2 py-2 focus:ring-2 focus:ring-lime-500">
            <span className="flex items-center space-x-2">
              <BiSortAlt2 className="w-5 h-5" />
              <span>Sort By Price</span>
            </span>
          </div>
          <select className="bg-gray-700 text-white text-sm px-2 py-2 focus:ring-2 focus:ring-lime-500">
            <option>Filter By Price</option>
            <option>Under Rs. 100</option>
            <option>Rs. 100 - Rs. 500</option>
            <option>Above Rs. 500</option>
          </select>
          <select className="bg-gray-700 text-white text-sm px-2 py-2 focus:ring-2 focus:ring-lime-500">
            <option>Filter By Size</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>XXL</option>
          </select>
        </div>

        <div className="mx-[10rem] py-6 my-10">
          <div className="grid grid-cols-5 gap-6">
            {products?.map((product, i) => (
              <Fragment key={product._id}>
                <Link href={routes.PRODUCT + '/' + product._id}>
                  <ProductCard
                    img={product.images[0]}
                    title={product.title}
                    price={getPrice(product.sizes)}
                    summary={product.summary}
                  />
                </Link>
              </Fragment>
            ))}
          </div>
        </div>
        <div className="flex justify-center space-x-2 py-12">
          {currentPageNo > 1 ? (
            <button onClick={() => setCurrentPageNo(currentPageNo-1)} className="px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-800 transition">
              &lt; Previous
            </button>
          ) : ''}         
          {hasNextPage ? (
            <button onClick={() => setCurrentPageNo(currentPageNo+1)} className="px-3 py-1 text-sm font-medium text-white bg-gray-700 rounded-md hover:bg-gray-800 transition">
              Next &gt;
            </button>
          ) : ''}
        </div>
        {currentPageNo}
      </div>
    </>
  )
}
