import React, { useState } from 'react';
import admindata from '../data/adminData';
import Sidebar from '../coponents/sidebar';
import SearchIcon from '@mui/icons-material/Search';

function AdminList() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAdmins = admindata.filter((admin) =>
    admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-admin-pattern bg-fixed p-4">
      {/* Inline style block for hiding scrollbar */}
      <style>{`
        .no-scroll::-webkit-scrollbar {
          display: none;
        }
        .no-scroll {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-4xl font-bold text-gray mb-2">Admins</h1>
        <p className="text-lg text-moderategray mb-6">List of Admins</p>

        {/* Search Bar with Icon */}
        <div className="relative mb-4 w-1/2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-bordergray rounded-md focus:outline-none focus:ring-2 focus:ring-focusblue"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lightgray" />
        </div>
        
        {/* Scrollable Container for Admins List without visible scrollbar */}
        <div
          className="bg-containerwhite backdrop-blur-md rounded-lg shadow-lg p-4 overflow-y-auto no-scroll"
          style={{ maxHeight: '60vh' }}
        >
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b border-bordergray font-semibold text-left text-gray">
                  Email
                </th>
                <th className="py-3 px-4 border-b border-bordergray font-semibold text-left text-gray">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-grayhover">
                  <td className="py-3 px-4 border-b border-bordergray text-gray">
                    {admin.email}
                  </td>
                  <td className="py-3 px-4 border-b border-bordergray text-gray">
                    {admin.name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default AdminList;


