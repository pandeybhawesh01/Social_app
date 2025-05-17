import React from 'react';
import Sidebar from '../coponents/sidebar';

function Dashboard() {
  return (
    <div>
      <Sidebar />
      <div className="ml-64 flex flex-col min-h-screen bg-admin-pattern p-8">
        <h2 className="text-3xl font-semibold text-gray mb-4">Dashboard</h2>
        <p className="text-lg text-moderategray">
          Welcome to your dashboard. Here you can manage your reels, posts, and much more.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
