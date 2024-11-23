import { Button } from '@/components/ui/button'
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { FaShare } from "react-icons/fa";
import { toast } from 'sonner';

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

  // Share functionality
  const handleShare = () => {
    const shareData = {
      title: 'Trip Info',
      text: `Check out my trip to ${tripInfo?.userSelection?.location?.label}!`,
      url: window.location.href,
    };

    if (navigator.share) {
      // Use the Web Share API
      navigator.share(shareData)
        .then(() => console.log('Content shared successfully!'))
        .catch(err => console.error('Error sharing content:', err));
    } else {
      // Fallback: Copy URL to clipboard
      navigator.clipboard.writeText(shareData.url)
        .then(() => toast('Trip link copied to clipboard!'))
        .catch(err => console.error('Error copying to clipboard:', err));
    }
  };

  return (
    <div>
      {/* image */}
      <img src={photoUrl?photoUrl:'/logo.png'} className='h-[340px] w-full object-cover rounded-lg'/>
      {/* location info */}
      <div className='flex items-center justify-center sm:justify-between'>
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
          <div className='flex flex-col sm:flex-row gap-2 sm:gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 font-bold text-center text-xs sm:text-base'>{tripInfo?.userSelection?.startDate} to {tripInfo?.userSelection?.endDate}</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 font-bold text-center text-xs sm:text-base'>{tripInfo?.userSelection?.budget}</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 font-bold text-center text-xs sm:text-base'>{tripInfo?.userSelection?.numOfPeople}</h2>
            <Button onClick={handleShare}><FaShare /></Button>

          </div>
        </div>
        {/* Share Button */}
      </div>
    </div>
  )
}

export default InfoSection