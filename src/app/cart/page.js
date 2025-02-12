'use client'
import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { codPlaceOrder, getCart, removeProduct, userProfile } from "../apiService";
import { toast } from "react-toastify";
import { routes } from "../utils/routes";
import { useRouter } from "next/navigation";

export default function Page() {

  const router = useRouter()

  const [cartItems, setCartItems] = useState([])
  const [profileData, setProfileData] = useState(null) 
  const [selectedPayment, setSelectedPayment] = useState("cod");

  const getCartData = async () => {
    try {
      const response = await getCart()
      setCartItems(response?.data)
    } catch (error) {
      toast.error('Product not available')
    }
  }

  const getProfileData = async () => {
    try {
      const response = await userProfile()
      setProfileData(response.data.data.address.address)
    } catch (error) {
      toast.error('User not available')
    }
  }

  const changeAddress = () => {
    router.push(routes.UPDATEPROFILE)
  }

  const totalPrice = () => {
    let sum = 0
    for (let i = 0; i < cartItems.length; i++) {
      sum += cartItems[i].amount
    }
    return sum
  }

  const allTotal = () => {
    let discount = 0
    let shipping = 0
    let total = totalPrice() - discount + shipping
    return total
  }

  const priceDetails = {
    totalMRP: totalPrice(),
    totalPrice: allTotal()
  }

  const removeCartProduct = async(id, i) => {
    const item = [...cartItems]
    try {
      const response = await removeProduct(id)
      item.splice(i, 1)
      setCartItems(item)
    } catch (error) {
      toast.error('Unable to remove')
    }
  }

  const placeOrderByCod = async() => {
    if (selectedPayment == 'cod') {
      try {
        const response = await codPlaceOrder({})
        console.log(response)
        router.push(routes.ORDERS)
      } catch (error) {
        toast.error('Order not placed')
      }
    }
  }

  useEffect(() => {
    getCartData()
    getProfileData()
  }, [])

  return (
    <div className="min-h-screen text-white mx-12 px-8 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {cartItems.map((item, i) => (
            <div
              key={item._id}
              className="bg-gray-900 p-4 flex items-center justify-between relative"
            >
              <RxCross2 onClick={() => removeCartProduct(item._id, i)} className="w-6 h-6 text-gray-400 absolute top-3 right-3 cursor-pointer hover:text-red-500" />
              <img
                src="https://images.pexels.com/photos/18182064/pexels-photo-18182064/free-photo-of-young-woman-posing-in-black-see-through-top-and-white-jeans.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Casual Hoodie"
                className="w-32 h-41 object-cover"
              />
              <div className="ml-4 flex-grow space-y-2">
                <h3 className="text-xl font-semibold">Casual Hoodie</h3>
                <p className="text-sm text-gray-400">Perfect for chilly evenings.</p>
                <p className="text-sm text-gray-400">
                  Size: <span className="font-medium">M</span>
                </p>
                <p className="text-sm text-gray-400">
                  Quantity: <span className="font-medium">{item.quantity}</span>
                </p>
                <p className="text-lg font-bold text-lime-400">
                  Rs. {item.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-400">✔ 7 Days Easy Return</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 p-6 h-fit space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Delivery Address</h2>
            <p className="text-sm text-gray-300">
              {profileData}
            </p>
            <button onClick={changeAddress} className="bg-lime-500 py-2 px-6 hover:bg-lime-600 font-semibold">
              Change Address
            </button>
          </div>

          <div className="space-y-4 mt-6">
            <h2 className="text-lg font-semibold">Payment Methods</h2>
            <div className="space-y-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={selectedPayment === "cod"}
                  onChange={() => setSelectedPayment("cod")}
                  className="w-5 h-5 text-lime-500 accent-lime-500"
                />
                <span>Cash on Delivery</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={selectedPayment === "online"}
                  onChange={() => setSelectedPayment("online")}
                  className="w-5 h-5 text-lime-500 accent-lime-500"
                />
                <span>Online Payment</span>
              </label>
            </div>
          </div>

          <div className="space-y-6 mt-6">
            <h2 className="text-xl font-semibold">Price Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p>Total MRP</p>
                <p>Rs. {priceDetails.totalMRP.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount</p>
                <p className="text-lime-500">- Rs. 0.00</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>Rs. 0.00</p>
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between text-lg font-bold">
                <p>Total Price</p>
                <p>Rs. {priceDetails.totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <button onClick={placeOrderByCod} className="bg-lime-500 w-full py-3 hover:bg-lime-600 font-semibold text-white">
              Place Your Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
