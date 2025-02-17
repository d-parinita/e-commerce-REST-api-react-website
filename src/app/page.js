'use client'
import HeroSec from "./Components/HeroSec"
import Banner from "./Components/Banner"
import CategoryCard from "./Components/CategoryCard"
import { Fragment, useEffect, useState } from "react"
import { getCategories, getProducts } from "./apiService"
import { toast } from "react-toastify"
import ProductCard from "./Components/ProductCard"
import { getPrice } from "./utils/commonFunc"
import Link from "next/link"
import { routes } from "./utils/routes"
import { useLoader } from "./context/LoaderContext"

export default function Home() {

  const { setLoading } = useLoader()

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])

  const getCategoriesData = async() => {
    setLoading(true)
    try {
      const response = await getCategories()
      setCategories(response?.data?.data)
    } catch (error) {
      toast.error('Category not available')
    } finally {
      setLoading(false)
    }
  }

  const getProductsData = async() => {
    setLoading(true)
    try {
      const response = await getProducts(15)
      setProducts(response?.data?.products)
    } catch (error) {
      toast.error('Product not available')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCategoriesData()
    getProductsData()
  }, [])

  return (
    <>
      <HeroSec/>
      <div id="category" className="text-center mt-12 text-4xl font-bold">Shop by Category</div>
      <div className="mx-[10rem] py-6 mt-10">
        <div className="grid grid-cols-7 gap-6">
          {categories?.map((category, i) => (
            <Fragment key={category._id}>
              <Link href={routes.PRODUCTBYCATEGORY + '/' + category._id}>
                <CategoryCard
                  imgUrl={category.imageUrl}
                  title={category.name}
                />
              </Link>
            </Fragment>
          ))}
        </div>
      </div>
      <Banner/>
      <div className="text-center mt-12 text-4xl font-bold">Explore our Products</div>
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
    </>
  )
}
