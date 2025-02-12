import { ORDER_STATUS } from '@/app/utils/constVariables';
import React from 'react'
import { RxCross2 } from "react-icons/rx";

export default function CartProductCard({img, title, summary, size, quantity, amount, removeCartProduct, isShowCancelBtn, cancelOrder, orderStatus}) {
    return (
        <>
            <div className="bg-gray-900 p-4 flex items-center justify-between relative">
                {isShowCancelBtn ? 
                    (<>
                    {orderStatus == ORDER_STATUS.PROCESSING || orderStatus == ORDER_STATUS.RECEIVED ? (
                        <button onClick={cancelOrder} className="px-3 py-1 absolute top-8 right-5 text-sm font-medium text-white border-2 border-white rounded-md hover:bg-gray-700 transition">
                            Cancel Order
                        </button>
                    ) : '' }</>) : 
                    (<RxCross2 onClick={removeCartProduct} className="w-6 h-6 text-gray-400 absolute top-3 right-3 cursor-pointer hover:text-red-500" />)
                }
                <img
                    src={img}
                    alt='image'
                    className="w-32 h-41 object-cover"
                />
                <div className="ml-4 flex-grow space-y-2">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="text-sm text-gray-400">{summary}</p>
                    <p className="text-sm text-gray-400">
                        Size: <span className="font-medium">{size}</span>
                    </p>
                    <p className="text-sm text-gray-400">
                        Quantity: <span className="font-medium">{quantity}</span>
                    </p>
                    <p className="text-lg font-bold text-lime-400">
                        Rs. {amount.toFixed(2)}
                    </p>
                    {isShowCancelBtn ? 
                    (<> 
                        <p className="text-sm text-gray-400">
                            Order status: <span className="font-medium">{orderStatus}</span>
                        </p>
                    </>) : 
                    (<p className="text-sm text-gray-400">✔ 7 Days Easy Return</p>)}
                </div>
            </div>
        </>
    )
}
