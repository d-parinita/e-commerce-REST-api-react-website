'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { getAllProducts } from '../apiService'
import ProductCard from '../Components/ProductCard'
import Link from 'next/link'
import { routes } from '../utils/routes'
import { getPrice } from '../utils/commonFunc'

export default function Page() {

  const [products, setProducts] = useState(null)

  const getAllProductsPage = async () => {
    try {
      const response = await getAllProducts(1)
      console.log(response?.data?.products)
      setProducts(response?.data?.products)
    } catch (error) {
      toast.error('No product available')
    }
  }

  useEffect(() => {
    getAllProductsPage()
  }, [])

  return (
    <>
      <div>
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
      </div>
    </>
  )
}
