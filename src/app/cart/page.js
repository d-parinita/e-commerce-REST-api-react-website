'use client'
import React, { Fragment, useEffect, useState } from "react";
import { codPlaceOrder, createOrder, getCart, removeProduct, testValidatePayment, userProfile } from "../apiService";
import { toast } from "react-toastify";
import { routes } from "../utils/routes";
import { useRouter } from "next/navigation";
import CartProductCard from "../Components/CartProductCard";
import { useLoader } from "../context/LoaderContext";

export default function Page() {

  const router = useRouter()
  const { setLoading } = useLoader()

  const [cartItems, setCartItems] = useState([])
  const [profileData, setProfileData] = useState(null) 
  const [selectedPayment, setSelectedPayment] = useState("cod")

  const getCartData = async () => {
    setLoading(true)
    try {
      const response = await getCart()
      console.log(response.data);
      
      setCartItems(response?.data)
    } catch (error) {
      toast.error('Product not available')
    } finally {
      setLoading(false)
    }
  }

  const getProfileData = async () => {
    setLoading(true)
    try {
      const response = await userProfile()
      setProfileData(response.data.data.address.address)
    } catch (error) {
      toast.error('User not available')
    } finally {
      setLoading(false)
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
    setLoading(true)
    const item = [...cartItems]
    try {
      const response = await removeProduct(id)
      item.splice(i, 1)
      setCartItems(item)
    } catch (error) {
      toast.error('Unable to remove')
    } finally {
      setLoading(false)
    }
  }

  const placeOrder = async() => {
    setLoading(true)
    if (selectedPayment == 'cod') {
      try {
        const response = await codPlaceOrder({})
        router.push(routes.ORDERS)
      } catch (error) {
        toast.error('Order not placed')
      } finally {
        setLoading(false)
      }
    } else {
      try {
        const response = await createOrder({})
        displayRpay()
      } catch (error) {
        toast.error('Order not placed')
      } finally {
        setLoading(false)
      }
    }
  }

  const validatePayment = async() => {
    setLoading(true)
    try {
      const response = await testValidatePayment({})
      router.push(routes.ORDERS)
    } catch (error) {
      toast.error('Order not placed')
    } finally {
      setLoading(false)
    }
  } 

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const displayRpay = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error("SDK failed to load ! Check your internet connection");
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_PRODUCTION_KEY || process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY,
      amount: allTotal() * 100,
      currency: "INR",
      name: "HR",
      description: "Payment",

      handler: function (response) {
        const paymentIden = response.razorpay_payment_id;
        validatePayment()
      },
      theme: {
        color: "#111827",
      },
    };
    let rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      toast.error(response.error.reason);
    });
    rzp1.open();
  }

  useEffect(() => {
    getCartData()
    getProfileData()
  }, [])

  return (
    <div className="min-h-screen text-white mx-4 sm:mx-12 px-4 sm:px-8 py-10">
          
      {cartItems.length ? (<>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {cartItems?.map((item, i) => (
            <Fragment key={item._id}>
              <CartProductCard
                img={item.image}
                title={item.title}
                summary={item.summary}
                size={item.size}
                quantity={item.quantity}
                amount={item.amount}
                removeCartProduct={() => removeCartProduct(item._id, i)}
                isShowCancelBtn={false}
              />
            </Fragment>
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

            <button onClick={placeOrder} className="bg-lime-500 w-full py-3 hover:bg-lime-600 font-semibold text-white">
              Place Your Order
            </button>
          </div>
        </div>
      </div>
      </>) : (<>
        <h2 className="text-center text-lg mt-10">No products added!</h2>
      </>)}
    </div>
  );
}
