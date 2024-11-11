import React from 'react';
import { Button } from '../ui/button';

function Header() {
  return (
    <div className='p-2 shadow-sm flex justify-between items-center mx-5'>
      <div className='flex items-center py-3'>
        <img src='/logo.png' alt='Logo' className='w-8 h-8 mr-2' />
        <p className='text-lg font-semibold'>Trip Mates</p>
      </div>
      <div>
       <Button>Sign In</Button>
      </div>
    </div>
  );
}

export default Header;
