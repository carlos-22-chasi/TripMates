import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import CreateTrip from './create-trip/CreateTrip.jsx'
import Header from './components/custom/Header';
import { Toaster } from './components/ui/sonner';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]/ViewTrip';
import MyTrips from './my-trips/MyTrips';
import NotFound from './components/custom/NotFound';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path:"/create-trip",
    element:<CreateTrip/>
  },
  {
    path:"/view-trip/:tripId",
    element:<ViewTrip/>
  },
  {
    path:"/my-trips",
    element:<MyTrips/>
  },
  {
    path:"/*",
    element:<NotFound/>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_ID}>
      <Header/>
      <Toaster/>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
)
