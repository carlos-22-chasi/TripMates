import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center justify-center mx-10 sm:mx-56 gap-9 pb-20'>
      {/* Introduction Text */}
      <h1 className='font-extrabold md:text-[60px] text-[primary-500] text-center mt-10'>
        <span className='text-primary'>Your AI Travel Campanion: </span>
        Effortless and Personalized Itineraries
      </h1>
      <p className='text-gray-500 text-center'>Your AI travel concierge curates personalized itineraries tailored to your interests and budget, ensuring a seamless and unforgettable adventure</p>

      {/* Get Started Button */}
      <Link to={'/create-trip'}>
        <Button className='hover:bg-white hover:text-primary'>Get Started</Button>
      </Link>

      {/* Plane Animation */}
      <div className="absolute top-100 md:top-52 left-0 w-full h-10 z-0">
        <img
          src="/plane2.png"
          alt="Flying Plane"
          className="w-24 animate-fly-plane"
        />
      </div>

      {/* Front Image */}
      <img src='/front.png' className='mt-4 md:mt-20 w-full'></img>

    </div>
  )
}

export default Hero