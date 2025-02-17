'use client'
import React, { useEffect, useState } from 'react'
import { userProfile } from '../apiService'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { routes } from '../utils/routes'
import { useLoader } from '../context/LoaderContext'

export default function Page() {

  const router = useRouter()
  const { setLoading } = useLoader()
  
  const [profileData, setProfileData] = useState(null)  

  const getProfileData = async () => {
    setLoading(true)
    try {
        const response = await userProfile()
        setProfileData(response.data.data)
    } catch (error) {
        toast.error('User not available')
    } finally {
      setLoading(false)
    }
  }

  const editUserData = () => {
    router.push(routes.UPDATEPROFILE)
  }

  useEffect(() => {
    getProfileData()
  }, [])

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-6">
      <div className="bg-gray-800 p-10 rounded-2xl shadow-2xl w-full max-w-2xl">
        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Your Profile
        </h2>

        <div className="space-y-8">
          <div className="flex justify-between bg-gray-700 p-4 rounded-lg">
            <div>
              <p className="text-gray-400 text-sm">First Name</p>
              <p className="text-white font-semibold text-lg">{profileData?.firstname}</p>
            </div>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-sm">Phone Number</p>
            <p className="text-white font-semibold text-lg">{profileData?.phoneNumber}</p>
          </div>

          <div className="bg-gray-700 p-4 rounded-lg">
            <p className="text-gray-400 text-sm mb-2">Address</p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm">City</p>
                <p className="text-white font-semibold">{profileData?.address.city}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">House Number</p>
                <p className="text-white font-semibold">{profileData?.address.houseNumber}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">State</p>
                <p className="text-white font-semibold">{profileData?.address.state}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Locality</p>
                <p className="text-white font-semibold">{profileData?.address.locality}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Pincode</p>
                <p className="text-white font-semibold">{profileData?.address.pin}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Address Lane</p>
                <p className="text-white font-semibold">{profileData?.address.address}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button onClick={editUserData} className="bg-lime-400 text-white py-2 px-6 rounded-lg font-semibold hover:bg-lime-600 transition">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div> 
    </>
  )
}
