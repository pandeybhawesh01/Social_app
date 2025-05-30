import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../themeSelector/ThemeSwitcher';
import Navbar from '../coponents/navbar';
import Header from '../coponents/header';

function Home() {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-admin-pattern p-4">
      <Navbar/>
      <Header/>
      
    </div>
  );
}
{/* <div className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-gray">Reelify</h1>
        <p className="mt-2 text-xl text-moderategray">Upload and share your best reels</p>
      </div>
      <div className="flex flex-col items-center w-full sm:w-3/4 md:w-2/3 lg:w-1/3 bg-whitebg border border-bordergray shadow-2xl rounded-2xl p-8">
        <div className="w-full px-4">
          <h2 className="text-center text-2xl font-semibold text-gray border-b border-bordergray pb-2">
            Login to Your Account
          </h2>
          <p className="text-center text-lightgray mt-2">
            Please select your login option below
          </p>
        </div>
        
        <ThemeSwitcher />
        <div
          className="w-full flex justify-center items-center bg-blue-green text-whitetext py-3 rounded-lg font-medium text-lg mt-6 cursor-pointer hover:bg-blue-green-hover transition duration-300 shadow-md"
          onClick={handleSubmit}
        >
          Login Super Admin
        </div>
        <div
          className="w-full flex justify-center items-center bg-blue-green text-whitetext py-3 rounded-lg font-medium text-lg mt-4 cursor-pointer hover:bg-blue-green-hover transition duration-300 shadow-md"
          onClick={handleSubmit}
        >
          Login Admin
        </div>
      </div> */}

export default Home;