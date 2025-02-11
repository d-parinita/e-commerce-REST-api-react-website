import React from "react";
import { RxCross2 } from "react-icons/rx";

export default function MyCartPage() {
  const cartItems = [
    {
      id: 1,
      imgSrc: "https://images.pexels.com/photos/30658047/pexels-photo-30658047/free-photo-of-stylish-woman-posing-in-modern-fashion-studio.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Stylish T-Shirt",
      summary: "Trendy and comfortable everyday wear.",
      size: "M",
      quantity: 1,
      price: 49.99,
    },
    {
      id: 2,
      imgSrc: "https://images.pexels.com/photos/18182064/pexels-photo-18182064/free-photo-of-young-woman-posing-in-black-see-through-top-and-white-jeans.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Casual Hoodie",
      summary: "Perfect for chilly evenings.",
      size: "L",
      quantity: 2,
      price: 79.99,
    },
  ];

  const priceDetails = {
    totalMRP: 179.97,
    discount: 20.0,
    shippingFee: 10.0,
    totalPrice: 159.97,
  };

  return (
    <div className="min-h-screen text-white mx-12 px-8 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 p-4 flex items-center justify-between relative"
            >
              <RxCross2 className="w-6 h-6 text-gray-400 absolute top-3 right-3 cursor-pointer hover:text-red-500" />
              <img
                src={item.imgSrc}
                alt={item.title}
                className="w-32 h-41 object-cover"
              />
              <div className="ml-4 flex-grow space-y-2">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.summary}</p>
                <p className="text-sm text-gray-400">
                  Size: <span className="font-medium">{item.size}</span>
                </p>
                <p className="text-sm text-gray-400">
                  Quantity: <span className="font-medium">{item.quantity}</span>
                </p>
                <p className="text-lg font-bold text-lime-400">
                  ${item.price.toFixed(2)}
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
              John Doe, 123 Broadway Lane, Downtown, New York, NY - 10001
            </p>
            <button className="bg-lime-500 py-2 px-6 hover:bg-lime-600 font-semibold">
              Change Address
            </button>
          </div>

          <div className="space-y-6 mt-6">
            <h2 className="text-xl font-semibold">Price Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p>Total MRP</p>
                <p>${priceDetails.totalMRP.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Discount</p>
                <p className="text-lime-500">- ${priceDetails.discount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping Fee</p>
                <p>${priceDetails.shippingFee.toFixed(2)}</p>
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between text-lg font-bold">
                <p>Total Price</p>
                <p>${priceDetails.totalPrice.toFixed(2)}</p>
              </div>
            </div>

            <button className="bg-lime-500 w-full py-3 hover:bg-lime-600 font-semibold text-white">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
