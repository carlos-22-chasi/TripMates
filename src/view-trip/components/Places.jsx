import React from 'react'
import PlaceCard from './PlaceCard'

function Places({ tripInfo }) {
  return (
    <div>
        <h2 className='font-bold text-lg mt-10'>Suggested Places to visit</h2>
        <div>
          {tripInfo?.tripData?.itinerary.map((item, index) => (
            <div key={index} className='mt-5'>
              <h2 className='font-medium text-lg'>{item.date}</h2>
              <div className='grid md:grid-cols-2 gap-5'>
                {item.plan.map((place, index)=>(
                  <div key={index} className='my-1 h-full'>
                    <PlaceCard placeInfo={place}/>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Places