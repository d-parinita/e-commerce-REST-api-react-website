'use client'
import React, { useEffect } from 'react'
import { getAllProducts } from '../apiService'
import ProductCard from '../Components/ProductCard'

export default function Page() {

  const getAllProductsPage = async() => {
    try {
      const response = await getAllProducts(50)
      console.log(response?.data?.products)
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
          <ProductCard/>
        </div>
    </>
  )
}
