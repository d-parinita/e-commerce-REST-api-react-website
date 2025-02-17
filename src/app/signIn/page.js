'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { signIn } from '../apiService'
import { routes } from '../utils/routes'
import { useLoader } from '../context/LoaderContext'

export default function Page() {

  const router = useRouter()
  const { setLoading } = useLoader()

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const handleSignIn = async(e) => {
    setLoading(true)
    e.preventDefault()
    try {
      const response = await signIn(userData)
      toast.success('Signed in successfully')
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.data))
      router.push(routes.HOME)
    } catch (error) {
      toast.error(error.response?.data?.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-6">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-white text-3xl font-bold text-center mb-6">
          Welcome Back
        </h2>
        <form onSubmit={(e) => handleSignIn(e)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300">
              Email Address
            </label>
            <input
              onChange={(e) => setUserData({...userData, email: e.target.value})}
              type="email"
              id="email"
              required
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-gray-300">
              Password
            </label>
            <input
              onChange={(e) => setUserData({...userData, password: e.target.value})}
              type="password"
              id="password"
              required
              className="w-full px-4 py-2 mt-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-lime-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-400 text-white py-2 px-4 rounded-lg font-semibold hover:bg-lime-600 transition"
          >
            Sign In
          </button>
        </form>

        <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
          <Link href="#" className="hover:text-lime-400">
            Forgot Password?
          </Link>
          <Link href={routes.SIGNUP} className="hover:text-lime-400">
            Create Account
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}