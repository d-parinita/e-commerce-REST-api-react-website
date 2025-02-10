import React from 'react'

export default function Banner() {
  return (
    <>
    <section className="bg-gray-900 text-white my-10 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">Elevate Your Style</h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-6">
          Discover the latest trends in fashion. From chic casuals to elegant formals, we offer premium quality clothing tailored for comfort and style. 
          Shop now and redefine your wardrobe with timeless pieces.
        </p>

        <div className="flex justify-center space-x-4 mt-6">
          <a
            href="#shop-now"
            className="bg-white text-gray-900 font-semibold py-2 px-6 rounded-2xl hover:bg-gray-300 transition-all"
          >
            Shop Now
          </a>
          <a
            href="#learn-more"
            className="border border-white text-white font-semibold py-2 px-6 rounded-2xl hover:bg-gray-800 transition-all"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
    </>
  )
}
