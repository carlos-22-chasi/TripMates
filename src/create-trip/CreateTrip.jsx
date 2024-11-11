import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "../components/ui/input"
import { SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { Button } from '@/components/ui/button';

function CreateTrip() {
  const [place, setPlace] = useState();
  const[formData, setFormData] = useState([]);
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData, 
      [name]:value
    })
  }

  useEffect(()=>{
    console.log(formData)
  }, [formData])

  const onGenerateTrip = () => {
    console.log(formData)
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel prefences</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information and our trip planner 
        will generate a customized itinerary based on your preferences
      </p>

      <div className='mt-20 flex flex-col gap-10'>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange:(v)=>{setPlace(v); handleInputChange('location', v);}
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning for the trip?</h2>
          <Input placeholder={"Ex.3"} type="number"
            onChange={(e)=>handleInputChange("numOfDays", e.target.value)}
          />
        </div>
        
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your desired budget for the trip?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item,index)=>(
              <div key={index} 
              onClick={()=>handleInputChange("budget", item.title)}
              className={`p-4 border rounded-lg 
                hover:shadow-lg hover:bg-primary hover:text-white hover:border hover:border-black 
                ${formData?.budget==item.title&&'border-black border-2 bg-[#ff3636e0] text-white hover:border-black hover:border-2 hover:bg-[#ff3636e0]'}`}             
              >
                <h2 className='text-2xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.description}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many people are plannig on going?</h2>
          <div className='grid grid-cols-4 gap-2 mt-5'>
            {SelectTravelesList.map((item,index)=>(
              <div key={index} 
              onClick={()=>handleInputChange("numOfPeople", item.title)}
              className={`p-4 border rounded-lg 
                hover:shadow-lg hover:bg-primary hover:border hover:border-black
                ${formData?.numOfPeople==item.title&&'border-black border-2 bg-[#ff3636e0] text-white hover:border-2 hover:bg-[#ff3636e0]'}`}             
              >
                <h2 className="text-2xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.description}</h2>
                <h2 className="text-sm text-gray-500">{item.people}</h2>
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className='my-10 pb-10 flex justify-end'>
        <Button onClick={onGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  )
}

export default CreateTrip