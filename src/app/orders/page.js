'use client'
import React, { Fragment, useEffect, useState } from 'react'
import { cancel, getOrders } from '../apiService'
import { toast } from 'react-toastify'
import CartProductCard from '../Components/CartProductCard'

export default function Page() {

  const [orderData, setOrderData] = useState([])

  const getAllOrders = async () => {
    try {
      const response = await getOrders()
      setOrderData(response?.data)
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
    </div>
    </>
  )
}
