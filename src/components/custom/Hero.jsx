import React from 'react'
import { Button } from '../ui/button'

function Hero() {
  return (
    <div className='flex flex-col items-center justify-center mx-56 gap-9'>
      <h1 className='font-extrabold md:text-[60px] text-[primary-500] text-center mt-10'>
        <span className='text-primary'>Your AI Travel Campanion: </span> 
        Effortless and Personalized Itineraries
      </h1>
      <p className='text-gray-500 text-center'>Your AI travel concierge curates personalized itineraries tailored to your interests and budget, ensuring a seamless and unforgettable adventure</p>
      <Button>Get Started</Button>

    </div>
  )
}

export default Hero