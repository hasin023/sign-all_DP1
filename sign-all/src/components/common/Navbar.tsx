import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

const Navbar = () => {
  const { user, isLoading } = useUser();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check session status
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  const handleLogout = () => {
    window.location.href = "/api/auth/logout";
  };

  return (
    <header className='text-black shadow-md'>
      <div className='container mx-auto px-4 flex justify-between items-center py-3'>
        <div className='flex items-center'>
          <Link href='/'>
            <Image
              src='/logo.png'
              alt='Logo'
              width={150}
              height={150}
              className='mr-2'
            />
          </Link>
        </div>

        <nav className='hidden md:flex space-x-8'>
          <Link
            href='/detection'
            className='hover:text-rose-500 transition duration-300'
          >
            Sign Detection
          </Link>
          <Link
            href='/dictionary'
            className='hover:text-rose-500 transition duration-300'
          >
            Dictionary
          </Link>
          <Link
            href='/quiz'
            className='hover:text-rose-500 transition duration-300'
          >
            Quiz
          </Link>
          {!isLoggedIn && !isLoading ? (
            <Link
              href='/login'
              className='text-rose-600 font-semibold hover:text-gray-400 transition duration-300'
            >
              Login
            </Link>
          ) : (
            <div className='relative'>
              <button
                className='flex items-center space-x-2'
                onClick={() => (window.location.href = "/profile")}
              >
                <Image
                  src={ "/default-avatar.png"}
                  alt='Avatar'
                  width={40}
                  height={40}
                  className='rounded-full'
                />
                <span className='hidden md:inline-block font-semibold'>
                  {/* {user.name} */}
                </span>
              </button>
              <button
                onClick={handleLogout}
                className='ml-4 text-red-600 font-semibold hover:text-gray-400 transition duration-300'
              >
                Logout
              </button>
            </div>
          )}
        </nav>

        <div className='md:hidden'>
          <button className='text-gray-300 focus:outline-none'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16m-7 6h7'
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
