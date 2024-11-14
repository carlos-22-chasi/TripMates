import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '@/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import Places from '../components/Places';
import Footer from '../components/Footer';

function ViewTrip() {
  const {tripId} = useParams();
  const [trip, setTrip] = useState();

  // Call GetTripData when webpage loads in 
  useEffect(()=>{
    tripId && GetTripData();
  }, []);

  // Used to get Trip Infomation from Firebase
  const GetTripData = async() => {
    const docRef = doc(db, 'AITrips', tripId);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      console.log("trip data:, ", docSnap.data());
      setTrip(docSnap.data());
    }
    else{
      console.log("no such doc");
      toast("no trip found")
    }
  }

  return (
    <div>
      <div className='p-10 md: px-20 lg:px-44 xl:px-56'>
        {/* Informatino Section */}
        <InfoSection tripInfo={trip}/>
        {/* Recommended Hotels */}
        <Hotels tripInfo={trip}/>
        {/* Daily Plan */}
        <Places tripInfo={trip}/>
      </div>
      {/* Footer */}
      <div>
       <Footer tripInfo={trip}/>
      </div>
    </div>
    
  )
}

export default ViewTrip