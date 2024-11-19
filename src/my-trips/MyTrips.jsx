import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '@/service/FirebaseConfig';
import UserTripCard from './components/UserTripCard';

function MyTrips() {
  const navigation = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, [])

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigation('/');
      return;
    }
    const q = query(
      collection(db, 'AITrips'),
      where('userEmail', '==', user?.email),
      where('isSaved', '==', true)
    );
    const querySnapshot = await getDocs(q);
    setUserTrips([]);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips(preVal => [...preVal, doc.data()]);
    });
  }

  useEffect(() => {
    console.log('Updated userTrips:', userTrips);
  }, [userTrips]);



  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-100 px-5 mt-10 pb-10'>
      <h2 className='font-bold text-3xl'>My Trips</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
        {userTrips?.length > 0 ?
          userTrips.map((trip, index) => (
            <UserTripCard trip={trip} key={index} />
          ))
          :
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div key={index} className='h-[200px] w-full bg-slate-200 animate-pulse rounded-xl flex items-center justify-center'>
              <h2>No Trips Found</h2>
            </div>
          ))

        }
      </div>
    </div>
  )
}

export default MyTrips