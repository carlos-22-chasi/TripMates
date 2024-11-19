import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { FaStar } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdRemoveCircle } from "react-icons/io";
import { db } from '@/service/FirebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'sonner';

function SaveTripButton({ tripInfo }) {
  const [loading, setLoading] = useState(false);
  const [trip, setTrip] = useState(tripInfo);

  // Sync trip state if tripInfo changes
  useEffect(() => {
    if (tripInfo) {
      setTrip(tripInfo);
    }
  }, [tripInfo]);

  const SaveAITrip = async () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) {
        toast("Please sign in to save trip");
        return;
      }
      setLoading(true);
      const docRef = doc(db, "AITrips", trip.id);
      await updateDoc(docRef, { isSaved: true });

      setTrip((prevTrip) => ({ ...prevTrip, isSaved: true }));
      toast.success("Trip saved successfully!");
    } catch (error) {
      console.error("Error updating field:", error);
      toast.error("Failed to save the trip.");
    } finally {
      setLoading(false);
    }
  };

  const UnsaveAITrip = async () => {
    try {
      const user = localStorage.getItem('user');
      if (!user) {
        toast("Please sign in to unsave trip");
        return;
      }
      setLoading(true);
      const docRef = doc(db, "AITrips", trip.id);
      await updateDoc(docRef, { isSaved: false });

      setTrip((prevTrip) => ({ ...prevTrip, isSaved: false }));
      toast.success("Trip unsaved!");
    } catch (error) {
      console.error("Error updating field:", error);
      toast.error("Failed to unsave the trip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {trip?.isSaved ? (
        <Button
          disabled={loading}
          onClick={UnsaveAITrip}
          className='group rounded-3xl'
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            <div className='flex items-center gap-2'>
              <IoMdRemoveCircle className='group-hover:text-black' />
              <h2>Unsave Trip</h2>
            </div>
          )}
        </Button>
      ) : (
        <Button
          disabled={loading}
          onClick={SaveAITrip}
          className='group rounded-3xl'
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            <div className='flex flex-row items-center gap-2'>
              <FaStar className='group-hover:text-black' />
              <h2>Save Trip</h2>
            </div>
          )}
        </Button>
      )}
    </div>
  );
}

export default SaveTripButton;
