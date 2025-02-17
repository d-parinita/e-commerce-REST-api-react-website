'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { cancel, getOrders } from '../apiService'
import { toast } from 'react-toastify'
import CartProductCard from '../Components/CartProductCard'

export default function Page() {

  const [orderData, setOrderData] = useState([])
  const [hasNextPage, setHasNextPage] = useState(true)
  const [currentPageNo, setCurrentPageNo] = useState(1)

  const getAllOrders = async () => {
    // const preparePayload = `pageNumber=${currentPageNo}&limit=50`
    try {
      const response = await getOrders()
      console.log(response);
      
      setOrderData(response?.data)
      // setHasNextPage(response?.hasNextPage)
    } catch (error) {
      toast.error('No orders')
    }
  }

  const cancelOrder = async(id, i) => {
    try {
      const response = await cancel(id, {})
      getAllOrders()
    } catch (error) {
      toast.error('Error')
    }
  }

  useEffect(() => {
    getAllOrders()
  }, [])

  return (
    <>
    <div className="min-h-screen text-white mx-24 px-8 py-10">
      
      {orderData.length ? (<>
        <div className='space-y-8'>
          {orderData?.map((order, i) => (
            <Fragment key={order._id}>
            {order.products.map((item) => (
              <Fragment key={item._id}>
                <CartProductCard
                  img={item.image}
                  title={item.title}
                  summary={item.summary}
                  size={item.size}
                  quantity={item.quantity}
                  amount={item.amount}
                  cancelOrder={() => cancelOrder(order._id, i)}
                  isShowCancelBtn={true}
                  orderStatus={order.status}
                />
              </Fragment>
            ))}
            </Fragment>
          ))}
        </div>

        {/* <div className="flex justify-center space-x-2 py-12">
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
        </div> */}
      </>) : (<>
        <h2 className="text-center text-lg mt-10">No orders available!</h2>
      </>)}
    </div>
    </>
  )
}
