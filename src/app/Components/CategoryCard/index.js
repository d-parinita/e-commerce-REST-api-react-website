import React from 'react'

export default function CategoryCard({ title, imgUrl }) {
  return (
    <>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-32 h-32 bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform">
          <img
            src={imgUrl}
            alt='women top'
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-white font-semibold text-md">
          {title}
        </span>
      </div>
    </>
  )
}
