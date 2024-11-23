import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "../components/ui/input"
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from "sonner"
import { chatSession } from '@/service/AIModel';
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
    // check that form is fully filled out 
    if (!formData?.location || !formData?.numOfPeople || !formData?.budget || !formData?.startDate || !formData?.endDate) {
      toast("Please fill out all details")
      return;
    }

    const startDate = new Date(formData?.startDate);
    const endDate = new Date(formData?.endDate);
    // ensure that start date is before end date
    if (endDate <= startDate) {
      toast("End date must be after the start date!");
      return;
    }

    // Calculate the number of days if the dates are valid
    const diffInMs = endDate - startDate;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24); // Convert ms to days
    if (diffInDays > 20) {
      toast("Please enter detes that are less that 20 days apart");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{startDate}', formData?.startDate)
      .replace('{endDate}', formData?.endDate)
      .replace('{numOfPeople}', formData?.numOfPeople)
      .replace('{budget}', formData?.budget)
      .replace('{startDate}', formData?.startDate)
      .replace('{endDate}', formData?.endDate)

    console.log("final prompt: ", FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT)

    console.log("response: ", result?.response?.text());
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
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              },
              styles: {
                control: (provided) => ({ // control section
                  ...provided,
                  backgroundColor: "#1a202c", 
                  color: "#fff", 
                  border: "1px solid #4A5568", 
                  borderRadius: "8px", 
                  padding: "5px",
                }),
                input: (provided) => ({ //input
                  ...provided,
                  color: "#fff", 
                }),
                placeholder: (provided) => ({ // placeholder
                  ...provided,
                  color: "#A0AEC0", 
                }),
                singleValue: (provided) => ({ // selected item
                  ...provided,
                  color: "#fff", 
                }),
                menu: (provided) => ({ // drop down menu 
                  ...provided,
                  backgroundColor: "#2D3748",
                  color: "#fff", 
                  borderRadius: "8px",
                }),
                option: (provided, state) => ({ // options from drop down menu 
                  ...provided,
                  backgroundColor: state.isFocused ? "#4A5568" : "#2D3748", 
                  color: "#fff",
                }),
              },
            }}
          />
        </div>


        {/* NumOfDays Section */}
        <div>
          <h2 className="text-xl my-3 font-medium">What are the start and end dates of your trip?</h2>
          <div className="flex flex-row gap-4 w-10">
            {/* Start Date Input */}
            <div>
              <label htmlFor="start-date" className="block text-sm font-semibold text-primary">
                Start Date
              </label>
              <Input
                id="start-date"
                type="date"
                onChange={(e) => handleInputChange('startDate', new Date(e.target.value).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }))}
                className='bg-slate-800 mt-1'
              />
            </div>

            {/* End Date Input */}
            <div>
              <label htmlFor="end-date" className="block text-sm font-semibold text-primary">
                End Date
              </label>
              <Input
                id="end-date"
                type="date"
                onChange={(e) => handleInputChange('endDate',new Date(e.target.value).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }))}
                className='bg-slate-800 mt-1'
              />
            </div>
          </div>
        </div>

        {/* Budget Section */}
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your desired budget for the trip?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index}
                onClick={() => handleInputChange("budget", item.range)}
                className={`p-2 sm:p-4 border rounded-lg group flex flex-col justify-between text-center sm:text-left
                hover:shadow-lg hover:bg-primary hover:text-white hover:border hover:border-green-400 
                //item selected
                ${formData?.budget == item.range && 'border-blue-800 border-2 bg-primary hover:border-2 hover:bg-[#ff3636e0] text-black'}`}
              >
                <h2 className="text-2xl ">{item.icon}</h2>
                <h2 className="font-bold text-base sm:text-lg group-hover:text-black">{item.title}</h2>
                <h2 className={`text-xs sm:text-sm text-primary group-hover:text-white ${formData?.budget == item.range ? 'text-white' : ''}`}>{item.description}</h2>
                <h2 className={`text-xs sm:text-sm font-semibold text-gray-500 group-hover:text-blue-950 ${formData?.budget == item.range ? 'text-blue-950' : ''}`}>{item.range}</h2>
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
                className={`p-2 sm:p-4 border rounded-lg group flex flex-col text-center sm:text-left justify-between 
                hover:shadow-lg hover:bg-primary hover:border hover:border-green-400
                //item selected
                ${formData?.numOfPeople == item.people && 'border-blue-800 border-2 bg-primary hover:border-2 hover:bg-[#ff3636e0] text-black'}`}
              >
                <h2 className="text-2xl ">{item.icon}</h2>
                <h2 className="font-bold text-lg group-hover:text-black">{item.title}</h2>
                <h2 className={`text-xs sm:text-sm text-primary group-hover:text-white ${formData?.numOfPeople == item.people ? 'text-white' : ''}`}>{item.description}</h2>
                <h2 className={`text-xs sm:text-sm font-bold text-gray-500 group-hover:text-blue-950 ${formData?.numOfPeople == item.people ? 'text-blue-950' : ''}`}>{item.people}</h2>
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