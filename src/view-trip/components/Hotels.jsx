import React from 'react'
import { Link } from 'react-router-dom'
import HotelCard from './HotelCard'

function Hotels({ tripInfo }) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
        <div className='grid grid-cols-2 mt-3 md:grid-cols-3 xl:grid-cols-4 gap-5'>
          {tripInfo?.tripData?.hotels.map((item, index) => (
            <HotelCard hotel={item} key={index}/>
          ))}
        </div>
    
    </div>
  )
}

export default Hotels