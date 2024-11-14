import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

function PlaceCard({ placeInfo }) {
  return (
    <div className='border p-3 mt-2 h-full flex gap-5 hover:scale-105 transition-all hover-shadow'>
      <img src='/logo.png' className='w-[130px] h-[130px]'/>
      <div>
        <h2 className='font-bold text-lg'>{placeInfo.placeName}</h2>
        <p className='text-xs md:text-sm text-gray-500'>{placeInfo.placeDetails}</p>
        <h2 className='text-primary font-medium text-sm'>Best Time to Visit: {placeInfo.bestTime}</h2>
        <h2>{placeInfo.timeTravel}</h2>
        <Link to={'https://www.google.com/maps/search/?api=1&query='+placeInfo.placeName} target='blank'>
         <Button className='h-5'>🗺️</Button>
        </Link>
      </div>
    </div>
  )
}

export default PlaceCard