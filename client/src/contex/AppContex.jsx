import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Properly define the provider as a named function
export const AppContextProvider=(props)=>{

axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null); 
  const getAuthState = async ()=>{
    try{
      const {data  }= await axios.get(backendUrl+'/api/auth/is-auth')
      if(data.success)
      {
        setIsLoggedIn(true);
        await getUserData();
      }
    }
    catch(err)
    {
      alert('Error fetching authentication state: ' + err.message);
    }
  }

  const getUserData = async() =>{
    try{
        const {data} =await axios.get(backendUrl+'/api/user/data')
        data.success? setUserData(data.userData) : alert(data.message);
    }
    catch(error)
    {
        alert('Error fetching user data: ' + error.message);
    }
  }

  useEffect(()=>{
    getAuthState();
  },[])

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
}
