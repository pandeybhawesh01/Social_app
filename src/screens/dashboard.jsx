import React, { useContext } from 'react';
import Sidebar from '../coponents/sidebar';
import { AppContext } from '../contex/AppContex';
import Navbar from '../coponents/navbar';

function Dashboard() {
  const { userData } = useContext(AppContext);

  return (
    <div>
      <Sidebar />
{/* Make Navbar take full width of content area */}
        <div className="w-[60%] pr-96">
          <Navbar />
        </div>
      <div className="ml-64 flex flex-col min-h-screen bg-admin-pattern p-8">
        

        <h2 className="text-3xl font-semibold text-gray mb-4">Dashboard</h2>
        <p className="text-lg text-moderategray">
          Welcome to your dashboard. Here you can manage your reels, posts, and much more.
        </p>
        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>
          Hey {userData ? userData.name : 'User'}
        </h1>
      </div>
    </div>
  );
}

export default Dashboard;

