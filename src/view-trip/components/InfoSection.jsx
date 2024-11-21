import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { FaShare } from "react-icons/fa";

function InfoSection({tripInfo}) {
  // const[newPlace, setNewPlace] = useState();
  // const[formData, setFormData] = useState(tripInfo?.userSelection);
  
  const [photoUrl, setPhotoUrl] = useState();

  // call getPlacesPhoto every time tripInfo updates
  useEffect(() => {
    tripInfo && getPlacesPhoto();
  },[tripInfo])

  // Finds the location's photoUrl and sets it
  const getPlacesPhoto = async() => {
    const data = {
      "textQuery": tripInfo?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(resp => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[0].name);
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <div>
      {/* image */}
      <img src={photoUrl?photoUrl:'/logo.png'} className='h-[340px] w-full object-cover rounded-lg'/>
      {/* location info */}
      <div className='flex items-center justify-between'>
        <div className='my-5 flex flex-col gap-2'>
          {/* <div className='flex flex-row w-full gap-10'> */}
            <h2 className='font-bold text-2xl'>{tripInfo?.userSelection?.location?.label}</h2>
            {/* <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                newPlace,
                onChange:(v)=>{setNewPlace(v); handleInputChange('location', v);}
              }}
            />
            <Button>Submit</Button>
          </div> */}
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 font-bold'>{tripInfo?.userSelection?.numOfDays} Days</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 font-bold'>{tripInfo?.userSelection?.budget}</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 font-bold'>{tripInfo?.userSelection?.numOfPeople}</h2>
          </div>
        </div>
        {/* Share Button */}
        <Button><FaShare /></Button>
      </div>
    </div>
  )
}

export default InfoSection