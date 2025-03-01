import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import Loader from "./Components/Loader";
import { LoaderProvider, useLoader } from "./context/LoaderContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ecommerce",
  description: "Ecommerce frontend website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoaderProvider>
          <Loader/>
          <Navbar/>
          <ToastContainer 
            position="top-right"
            theme="dark"
          />
          <div className="pt-16">
            {children}
          </div>
          <Footer/>
        </LoaderProvider>
      </body>
    </html>
  );
}
