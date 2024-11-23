import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    trip && getPlacesPhoto();
  }, [trip])

  // Get's the photo of the trip loaction
  const getPlacesPhoto = async () => {
    const data = {
      "textQuery": trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
      setPhotoUrl(PhotoUrl);
    })
  }
  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className='hover:scale-105 transition-all'>
        <img src={photoUrl ? photoUrl : '/logo..png'}  className='object-cover rounded-xl w-full h-[200px]'/>
        <div className='mt-2'>
          <h2 className='font-bold text-lg'>
            {trip?.userSelection?.location?.label} 
            <span className='font-medium text-white text-base'> ({trip?.userSelection?.startDate} - {trip?.userSelection?.endDate})</span>
          </h2>
          <div className='font-small text-primary flex flex-col'>
            <h2>Budget: {trip?.userSelection?.budget}</h2>
            <h2>Group Size: {trip?.userSelection?.numOfPeople}</h2>
            </div>

        </div>
      </div>
    </Link>
  )
}

export default UserTripCard