'use client'
import { getProductsByCategory } from '@/app/apiService'
import ProductCard from '@/app/Components/ProductCard'
import { getPrice } from '@/app/utils/commonFunc'
import { routes } from '@/app/utils/routes'
import Link from 'next/link'
import React, { Fragment, use, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Page({params}) {

  const { id } = use(params)  

  const [product, setProduct] = useState([])

  const getProductByCategory = async() => {
      try {
          const response = await getProductsByCategory(id)
          setProduct(response?.data?.products)
      } catch (error) {
          toast.error('Product not available')
      }
  }

  useEffect(() => {
    getProductByCategory()
  }, [])

  return (
    <>
      <div>
        <div className="mx-[10rem] py-6 my-10">
          <div className="grid grid-cols-5 gap-6">
            {product?.map((item, i) => (
              <Fragment key={item._id}>
                <Link href={routes.PRODUCT + '/' + item._id}>
                  <ProductCard
                    img={item.images[0]}
                    title={item.title}
                    price={getPrice(item.sizes)}
                    summary={item.summary}
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
