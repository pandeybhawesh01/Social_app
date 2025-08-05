import React, { useState } from 'react';
import Sidebar from '../coponents/sidebar';
import reels from '../data/reeldata';
import SearchIcon from '@mui/icons-material/Search';

function PostList() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReels = reels.filter((reel) =>
    reel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reel.admin.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-admin-pattern bg-fixed p-4">
      {/* Inline styles to hide the scrollbar */}
      <style>{`
        .no-scroll::-webkit-scrollbar {
          display: none;
        }
        .no-scroll {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
      
      <Sidebar />
      <div className="ml-64 p-8">
        <h1 className="text-4xl font-bold text-gray mb-2">Posts</h1>
        <p className="text-lg text-moderategray mb-6">List of Posts</p>

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

        {/* Scrollable Table Container with hidden scrollbar */}
        <div
          className="bg-containerwhite backdrop-blur-md rounded-lg shadow-lg p-4 overflow-y-auto no-scroll"
          style={{ maxHeight: '60vh' }}
        >
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-3 px-4 border-b font-semibold text-left">Title</th>
                <th className="py-3 px-4 border-b font-semibold text-left">Admin</th>
                <th className="py-3 px-4 border-b font-semibold text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredReels.map((reel) => (
                <tr key={reel.id} className="hover:bg-grayhover">
                  <td className="py-3 px-4 border-b border-bordergray text-gray">{reel.title}</td>
                  <td className="py-3 px-4 border-b border-bordergray text-gray">{reel.admin}</td>
                  <td className="py-3 px-4 border-b border-bordergray text-gray">{reel.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}

export default PostList;
