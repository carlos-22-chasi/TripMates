import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "../components/ui/input"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
import { chatSession } from '@/service/AIModel';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/service/FirebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';



function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();

  // Adjust Form data on selected input 
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }
  // Print form data every time it updates  
  useEffect(() => {
    console.log(formData)
  }, [formData])

  // Generate Itinerary using prompt with form data
  const onGenerateTrip = async () => {
    if (!formData?.location || !formData?.numOfPeople || !formData?.budget || !formData?.numOfDays) {
      toast("Please fill out all details")
      return;
    }
    if (formData?.numOfDays < 1 || formData?.numOfDays > 30) {
      toast("Please enter a number of days value in the range 1-30")
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{numOfDays}', formData?.numOfDays)
      .replace('{numOfPeople}', formData?.numOfPeople)
      .replace('{budget}', formData?.budget)
      .replace('{numOfDays}', formData?.numOfDays)

    const result = await chatSession.sendMessage(FINAL_PROMPT)

    // console.log(result?.response?.text());
    setLoading(false);
    SaveAITrip(result?.response?.text());
  }

  // Save Trip to Firebase database
  const SaveAITrip = async (TripData) => {
    setLoading(true);

    const docId = Date.now().toString();
    const user = JSON.parse(localStorage.getItem('user'))

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
      isSaved: false,
    });

    setLoading(false);

    navigation('/view-trip/' + docId);
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-100 px-5 mt-10 pb-10'>
      {/* Create Trip Introduction */}
      <h2 className='font-bold text-3xl'>Tell us your travel prefences</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information and our trip planner
        will generate a customized itinerary based on your preferences
      </p>

      {/* Form Section */}
      <div className='mt-10 flex flex-col gap-10'>

        {/* Destination Section */}
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v); }
            }}
          />
        </div>

        {/* NumOfDays Section */}
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning for the trip?</h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            min="1"
            max="30"
            onChange={(e) => handleInputChange("numOfDays", e.target.value)}
          />
        </div>
        
        {/* Budget Section */}
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your desired budget for the trip?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange("budget", item.range)}
                className={`p-4 border rounded-lg group flex flex-col justify-between
                hover:shadow-lg hover:bg-primary hover:text-white hover:border hover:border-green-400 
                //item selected
                ${formData?.budget == item.range && 'border-blue-800 border-2 bg-primary hover:border-2 hover:bg-[#ff3636e0] text-black'}`}
              >
                <h2 className="text-2xl ">{item.icon}</h2>
                <h2 className="font-bold text-lg group-hover:text-black">{item.title}</h2>
                <h2 className={`text-sm text-gray-500 group-hover:text-white ${formData?.budget == item.range ? 'text-white' : ''}`}>{item.description}</h2>
                <h2 className={`text-sm text-gray-500 group-hover:text-white ${formData?.budget == item.range ? 'text-white' : ''}`}>{item.range}</h2>
              </div>
            ))}
          </div>
        </div>

        {/* NumOfPoeple Section */}
        <div>
          <h2 className='text-xl my-3 font-medium'>How many people are plannig on going?</h2>
          <div className='grid grid-cols-4 gap-2 mt-5'>
            {/* Individual Cards */}
            {SelectTravelesList.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange("numOfPeople", item.people)}
                className={`p-4 border rounded-lg group flex flex-col justify-between
                hover:shadow-lg hover:bg-primary hover:border hover:border-green-400
                //item selected
                ${formData?.numOfPeople == item.people && 'border-blue-800 border-2 bg-primary hover:border-2 hover:bg-[#ff3636e0] text-black'}`}
              >
                <h2 className="text-2xl ">{item.icon}</h2>
                <h2 className="font-bold text-lg group-hover:text-black">{item.title}</h2>
                <h2 className={`text-sm text-gray-500 group-hover:text-white ${formData?.numOfPeople == item.people ? 'text-white' : ''}`}>{item.description}</h2>
                  <h2 className={`text-sm text-gray-500 group-hover:text-white ${formData?.numOfPeople == item.people ? 'text-white' : ''}`}>{item.people}</h2>
              </div>
            ))}
          </div>
        </div>

      </div>
      <div className='mt-10 flex justify-end'>
        <Button disabled={loading} onClick={onGenerateTrip} className='hover:bg-white hover:text-primary'>
          {loading ?
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" /> : 'Generate Trip'
          }
        </Button>
      </div>
    </div>
  )
}

export default CreateTrip