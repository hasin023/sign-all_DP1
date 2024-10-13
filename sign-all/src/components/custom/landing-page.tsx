import React from "react"
import ToastButton from "./toast-button"

const LandingPage = () => {
  return (
    <div>
      <h1 className='text-4xl font-bold text-gray-900'>Sign All</h1>
      <p className='text-lg text-gray-700 mt-4 mb-10'>
        Easy way to learn sign language online
      </p>
      <ToastButton />
    </div>
  )
}

export default LandingPage
