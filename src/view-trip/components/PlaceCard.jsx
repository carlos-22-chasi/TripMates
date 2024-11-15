import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCard({ placeInfo }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    placeInfo && getPlacesPhoto();
  }, [placeInfo])

  const getPlacesPhoto = async () => {
    const data = {
      "textQuery": placeInfo.placeName
    }
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <div className='border p-3 mt-2 h-full flex gap-5 hover:scale-105 transition-all hover-shadow'>
      <img src={photoUrl?photoUrl:'/logo.png'} className='w-[130px] h-[130px] rounded-xl'/>
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