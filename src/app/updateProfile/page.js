'use client'
import React, { useEffect, useState } from 'react'
import { updateUser, userProfile } from '../apiService'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { routes } from '../utils/routes'

export default function Page() {

  const router = useRouter()

  const [updateData, setUpdateData] = useState({
    firstname: '',
    address: {
      city: '',
      houseNumber: '',
      lane: '',
      locality: '',
      address: '',
      state: '',
      pin: ''
    },
    phoneNumber: ''
  })

  const handleUpdate = async(e) => {
    e.preventDefault()
    console.log(updateData);
    try {
      const response = await updateUser(updateData)
      toast.success('Profile updated successfully')
      router.push(routes.HOME)
    } catch (error) {
      toast.error('Error in updating profile')
    }
  }

  const editProfile = async() => {
    try {
      const response = await userProfile()
      if (response?.data?.data) {
        setUpdateData(response?.data?.data)
      }
    } catch (error) {
      toast.error('Unable to edit')
    }
  }

  useEffect(() => {
    editProfile()
  }, [])

  return (
    <>
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Update Your Profile
        </h2>
        <form onSubmit={(e) => handleUpdate(e)} className="space-y-6">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label htmlFor="first-name" className="block text-sm text-gray-300">
                First Name
              </label>
              <input
                type="text"
                value={updateData.firstname}
                onChange={(e) => setUpdateData({...updateData, firstname: e.target.value})}
                id="first-name"
                required
                className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="Enter your first name"
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="last-name" className="block text-sm text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                id="last-name"
                className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              value={updateData.phoneNumber}
              onChange={(e) => setUpdateData({...updateData, phoneNumber: e.target.value})}
              id="phone"
              required
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
              placeholder="Enter your phone number"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300">Address</label>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <input
                type="text"
                value={updateData.address.city}
                onChange={(e) => setUpdateData({...updateData, address: {...updateData.address, city: e.target.value}})}
                placeholder="City"
                required
                className="bg-gray-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-lime-400"
              />
              <input
                type="text"
                value={updateData.address.houseNumber}
                onChange={(e) => setUpdateData({...updateData, address: {...updateData.address, houseNumber: e.target.value}})}
                placeholder="House Number"
                required
                className="bg-gray-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-lime-400"
              />
              <input
                type="text"
                value={updateData.address.state}
                onChange={(e) => setUpdateData({...updateData, address: {...updateData.address, state: e.target.value}})}
                placeholder="State"
                required
                className="bg-gray-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-lime-400"
              />
              <input
                type="text"
                value={updateData.address.locality}
                onChange={(e) => setUpdateData({...updateData, address: {...updateData.address, locality: e.target.value}})}
                placeholder="Locality"
                required
                className="bg-gray-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-lime-400"
              />
              <input
                type="text"
                value={updateData.address.pin}
                onChange={(e) => setUpdateData({...updateData, address: {...updateData.address, pin: e.target.value}})}
                placeholder="Pincode"
                required
                className="bg-gray-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-lime-400"
              />
              <input
                type="text"
                value={updateData.address.lane}
                onChange={(e) => setUpdateData({...updateData, address: {...updateData.address, lane: e.target.value}})}
                placeholder="Lane"
                required
                className="bg-gray-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-lime-400"
              />
            </div>
            <input
              type="text"
              value={updateData.address.address}
              onChange={(e) => setUpdateData({...updateData, address: {...updateData.address, address: e.target.value}})}
              placeholder="Address"
              required
              className="mt-4 w-full bg-gray-700 text-white rounded-md px-4 py-2 focus:ring-2 focus:ring-lime-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-lime-600 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
    </>
  )
}
