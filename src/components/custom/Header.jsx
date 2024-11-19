import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
import axios from 'axios';

function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "Application/json"
        }
      }
    ).then((resp) => {
      console.log(resp);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    });
  };

  return (
    <div className='p-2 shadow-sm flex justify-between items-center mx-5'>
      <div className='flex items-center py-3 cursor-pointer'>
        <a href='/' className='text-black flex items-center hover:text-primary'>
          <img src='/logo.png' alt='Logo' className='w-8 h-8 mr-2' />
          <p className='text-lg font-semibold'>Trip Mates</p>
        </a>
      </div>
      <div>
        {user ? (
          <div className='flex items-center gap-5'>
            <a href='/create-trip'>
              <Button className='rounded-full'>+ Create Trip</Button>
            </a>
            <a href='/my-trips'>
              <Button className='rounded-full'>My Trips</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture || '/default-avatar.png'}
                  alt="User Avatar"
                  className='h-[40px] w-[40px] rounded-full'
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  className='cursor-pointer'
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Log Out
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle></DialogTitle>
            <DialogDescription>
              <div className='flex items-center'>
                <img src='/logo.png' alt='Logo' className='w-8 h-8 mr-2' />
                <p className='text-lg font-semibold'>Trip Mates</p>
              </div>
              <div>
                <h2 className='font-bold text-lg mt-5'>Sign in with Google</h2>
                <p>Sign in to the App with Google Authentication securely</p>
                <Button onClick={login} className="w-full mt-5">Sign In With Google</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
