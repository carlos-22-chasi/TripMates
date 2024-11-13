import React from 'react'
import { Link } from 'react-router-dom'

function Hotels({ tripInfo }) {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5'>
          {tripInfo?.tripData?.hotels.map((item, index) => (
            <Link to={'https://www.google.com/maps/search/?api=1&query='+item?.hotelName+","+item?.hotelAddress} target='blank'>
              <div key={index} className='hover:scale-105 transition-all cursor-pointer'>
                <img src= {`${item?.hotelImageUrl}`} className='rounded-xl h-4'/>
                <div className='mt-3 flex flex-col gap-2'>
                  <h2 className='font-medium'>{item?.hotelName}</h2>
                  <h2 className='text-xs text-gray-500'>📍 {item?.hotelAddress}</h2>
                  <h2 className='text-sm'>{item?.price}</h2>
                  <h2 className='text-sm'>{item?.rating} ⭐</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
    
    </div>
  )
}

export default Hotels