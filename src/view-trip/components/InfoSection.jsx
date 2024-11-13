import { Button } from '@/components/ui/button'
import React from 'react'
import { FaShare } from "react-icons/fa";

function InfoSection({tripInfo}) {
  return (
    <div>
      <img src='/logo.png' className='h-[340px] w-full object-cover rounded-lg'/>
      <div className='flex items-center justify-between'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{tripInfo?.userSelection?.location?.label}</h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>{tripInfo?.userSelection?.numOfDays} Days</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>{tripInfo?.userSelection?.budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500'>{tripInfo?.userSelection?.numOfPeople}</h2>
          </div>
        </div>
        <Button><FaShare /></Button>
      </div>
    </div>
  )
}

export default InfoSection