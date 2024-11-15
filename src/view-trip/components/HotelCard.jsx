import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function HotelCard({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    hotel && getPlacesPhoto();
  }, [hotel])

  const getPlacesPhoto = async () => {
    const data = {
      "textQuery": hotel.hotelName
    }
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel.hotelName + "," + hotel?.hotelAddress} target='blank'>
      <div className='hover:scale-105 transition-all cursor-pointer'>
        <img src={photoUrl?photoUrl:'/logo.png'} className='rounded-xl h-[200px] w-full' />
        <div className='mt-3 flex flex-col gap-2'>
          <h2 className='font-medium'>{hotel?.hotelName}</h2>
          <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
          <h2 className='text-sm'>{hotel?.price}</h2>
          <h2 className='text-sm'>{hotel?.rating} ⭐</h2>
        </div>
      </div>
    </Link>
  )
}

export default HotelCard