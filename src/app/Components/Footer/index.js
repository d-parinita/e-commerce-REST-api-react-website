import React from 'react';
import { FaSquareFacebook, FaSquareXTwitter, FaSquareInstagram } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between mb-8 space-y-6 md:space-y-0">
          {/* About Section */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-3">About Us</h2>
            <p className="text-gray-400">
              We are committed to delivering the best quality products at unbeatable prices, ensuring customer satisfaction at every step.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-3">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Home</a></li>
              <li><a href="#" className="hover:text-gray-300">Shop</a></li>
              <li><a href="#" className="hover:text-gray-300">Contact</a></li>
              <li><a href="#" className="hover:text-gray-300">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-3">Contact Us</h2>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@example.com</li>
              <li>Phone: +123 456 7890</li>
              <li>Address: 123 Shopping St, Commerce City</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-4"></div>

        {/* Social Media Icons */}
        <div className="flex justify-between items-center">
          <p className="text-gray-500">© 2025 Your Company. All rights reserved.</p>

          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              <FaSquareFacebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaSquareXTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaSquareInstagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
