'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { getAllProducts } from '../apiService'
import ProductCard from '../Components/ProductCard'
import Link from 'next/link'
import { routes } from '../utils/routes'
import { getPrice } from '../utils/commonFunc'
import { BiSortAlt2 } from "react-icons/bi";
import { FILTER_BY_PRICE, FILTER_BY_SIZE } from '../utils/constVariables'
import { toast } from 'react-toastify'
import { useLoader } from '../context/LoaderContext'

export default function Page() {

  const { setLoading } = useLoader()

  const [products, setProducts] = useState(null)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [currentPageNo, setCurrentPageNo] = useState(1)
  const [params, setParams] = useState('')
  const [filters, setFilters] = useState({
    sortBy: '',
    price: '',
    size: ''
  })

  const getAllProductsPage = async () => {
    setLoading(true)
    const preparePayload = `pageNumber=${currentPageNo}&limit=50&${params}`
    try {
      const response = await getAllProducts(preparePayload)
      setProducts(response?.data?.products)
      setHasNextPage(response?.data?.hasNextPage)
    } catch (error) {
      toast.error('No product available')
    } finally {
      setLoading(false)
    }
  }

  const getParams = () => {
    if (filters.sortBy == '') {
      const addParams = filters.price + filters.size  
      setParams(addParams)
    } else if (filters.price == '') {
      const addParams = filters.sortBy + filters.size  
      setParams(addParams)
    } else if (filters.size == '') {
      const addParams = filters.sortBy + filters.price  
      setParams(addParams)
    } else {
      const addParams = filters.sortBy + filters.price + filters.size  
      setParams(addParams)
    }
  }

  const handleClearFilters = () => {
    setFilters({
      sortBy: '',
      price: '',
      size: ''
    })
    setParams('')
  }

  useEffect(() => {
    getParams()
  }, [filters])

  useEffect(() => {
    getAllProductsPage()
  }, [currentPageNo, params])

  return (
    <>
      <div>
        <div className="flex space-x-4 bg-gray-800 p-4 mx-36 mt-10">
          <div className="bg-gray-700 text-sm text-white px-2 py-2 focus:ring-2 focus:ring-lime-500">
            <span className="flex cursor-pointer items-center space-x-2">
              <BiSortAlt2 className="w-5 h-5" />
              <span onClick={() => setFilters({...filters, sortBy: 'sortBy=amount'})}>Sort By Price</span>
            </span>
          </div>
          <select
            className="bg-gray-700 text-white text-sm px-2 py-2 focus:ring-2 focus:ring-lime-500"
            onChange={(e) => {
              const selectedIndex = e.target.selectedIndex;
              const selectedPrice = FILTER_BY_PRICE[selectedIndex];
              if (selectedPrice) {
                setFilters({...filters, price: `&minPrice=${selectedPrice.minPrice}&maxPrice=${selectedPrice.maxPrice}`});
              }
            }}
          >
            {FILTER_BY_PRICE.map((price, i) => (
              <Fragment key={i}>
                <option>{price.label}</option>
              </Fragment>
            ))}
          </select>
          <select 
            className="bg-gray-700 text-white text-sm px-2 py-2 focus:ring-2 focus:ring-lime-500"
            onChange={(e) => {
              const selectedIndex = e.target.selectedIndex;
              const selectedSize = FILTER_BY_SIZE[selectedIndex];
              if (selectedSize) {
                setFilters({...filters, size: `&size=${selectedSize.size}`})
              }
            }}
          >
            {FILTER_BY_SIZE.map((size, i) => (
              <Fragment key={i}>
                <option>{size.size}</option>
              </Fragment>
            ))}
          </select>
          <button
            className="border-2 border-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm"
            onClick={handleClearFilters}
          >
            Clear All Filters
          </button>
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
      </div>
    </>
  )
}
