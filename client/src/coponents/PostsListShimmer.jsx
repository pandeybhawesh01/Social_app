// src/components/PostsListShimmer.jsx
import React from 'react';

export default function PostsListShimmer({ isSidebarOpen }) {
  const containerMargin = isSidebarOpen ? 'ml-64' : 'ml-16';

  return (
    <div className="flex">
      {/* Sidebar placeholder */}
      <div
        className={`hidden lg:block ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-background animate-pulse`}
      />

      <div
        className={`flex-1 min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${containerMargin}`}
      >
        {/* Title */}
        <div className="mb-16">
          <div className="h-12 w-3/4 mx-auto bg-admin-pattern rounded animate-pulse" />
          <div className="mt-4 h-6 w-1/2 mx-auto bg-admin-pattern rounded animate-pulse" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 px-32">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-containerwhite border border-bordergray animate-pulse h-24"
            />
          ))}
        </div>

        {/* Posts */}
        <div className="max-w-4xl mx-auto space-y-8">
          {[...Array(3)].map((_, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg bg-containerwhite border border-bordergray shadow-md animate-pulse space-y-4"
            >
              {/* header row */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-bordergray" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-bordergray rounded w-1/3" />
                  <div className="h-3 bg-bordergray rounded w-1/4" />
                </div>
                <div className="space-y-1 text-right">
                  <div className="h-3 bg-bordergray rounded w-1/4 mx-auto" />
                  <div className="h-3 bg-bordergray rounded w-1/5 mx-auto" />
                </div>
              </div>

              {/* content text */}
              <div className="space-y-2">
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-5/6" />
                <div className="h-4 bg-gray-100 rounded w-4/6" />
              </div>

              {/* image placeholder */}
              <div className="h-48 bg-gray-100 rounded" />

              {/* actions row */}
              <div className="flex justify-between items-center pt-3 border-t border-bordergray">
                <div className="h-6 w-16 bg-bordergray rounded" />
                <div className="h-6 w-16 bg-bordergray rounded" />
                <div className="h-6 w-16 bg-bordergray rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
