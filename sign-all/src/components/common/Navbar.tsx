import React from "react";
import Image from "next/image";


const Header = () => {
  return (
    <header className="text-black shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center py-4">
        <div className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={150}
            height={150}
            className="mr-2"
          />
        </div>

        <nav className="hidden md:flex space-x-8">
          <a
            href="#sign-detection"
            className="hover:text-gray-400 transition duration-300"
          >
            Sign Detection
          </a>
          <a
            href="#dictionary"
            className="hover:text-gray-400 transition duration-300"
          >
            Dictionary
          </a>
          <a
            href="#quiz"
            className="hover:text-gray-400 transition duration-300"
          >
            Quiz
          </a>
          <a
            href="#login"
            className="text-red-600 font-semibold hover:text-gray-400 transition duration-300 "
          >
            Login
          </a>
        </nav>

        <div className="md:hidden">
          <button className="text-gray-300 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;