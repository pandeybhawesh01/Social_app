// src/components/ProfileShimmer.jsx
import React from 'react';

export default function ProfileShimmer({ isSidebarOpen }) {
  const sidebarWidth = isSidebarOpen ? 'w-64' : 'w-16';
  const contentMargin = isSidebarOpen ? 'ml-64' : 'ml-16';

  return (
    <div className="flex min-h-screen bg-admin-pattern">
      {/* Sidebar placeholder */}
      <div className={`fixed top-0 left-0 h-screen ${sidebarWidth} bg-purple-50 animate-pulse`} />

      {/* Main content */}
      <div className={`flex-1 ${contentMargin} py-8 px-4 sm:px-6 lg:px-8 transition-all duration-300`}>
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Banner & Avatar */}
          <div className="relative space-y-4">
            <div className="h-48 rounded-t-2xl bg-purple-100 animate-pulse" />
            <div className="absolute -bottom-16 left-6">
              <div className="w-32 h-32 rounded-full border-4 border-purple-50 bg-purple-100 animate-pulse" />
            </div>
          </div>

          {/* Name & Username */}
          <div className="pt-20 space-y-2">
            <div className="h-6 w-1/3 bg-purple-200 rounded animate-pulse" />
            <div className="h-4 w-1/4 bg-purple-100 rounded animate-pulse" />
          </div>

          {/* Bio lines */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-purple-50 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-purple-50 rounded animate-pulse" />
            <div className="h-4 w-4/6 bg-purple-50 rounded animate-pulse" />
          </div>

          {/* Details row */}
          <div className="flex flex-wrap gap-6 pt-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-4 h-4 bg-purple-100 rounded animate-pulse" />
                <div className="h-4 w-24 bg-purple-50 rounded animate-pulse" />
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-b border-purple-100">
            <div className="flex">
              {['posts','replies','media','likes'].map((_, i) => (
                <div key={i} className="flex-1 h-8 bg-purple-50 mx-1 rounded animate-pulse" />
              ))}
            </div>
          </div>

          {/* Content area */}
          <div className="space-y-8 bg-containerwhite rounded-b-2xl shadow-lg p-6">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="space-y-4">
                {/* Post header */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/4 bg-purple-200 rounded animate-pulse" />
                    <div className="h-3 w-1/6 bg-purple-100 rounded animate-pulse" />
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="h-3 w-1/6 bg-purple-100 rounded animate-pulse mx-auto" />
                    <div className="h-3 w-1/8 bg-purple-100 rounded animate-pulse mx-auto" />
                  </div>
                </div>

                {/* Post text */}
                <div className="space-y-2">
                  <div className="h-4 w-full bg-purple-50 rounded animate-pulse" />
                  <div className="h-4 w-5/6 bg-purple-50 rounded animate-pulse" />
                  <div className="h-4 w-2/3 bg-purple-50 rounded animate-pulse" />
                </div>

                {/* Post image */}
                <div className="h-48 bg-purple-50 rounded animate-pulse" />

                {/* Actions */}
                <div className="flex justify-between items-center pt-3 border-t border-purple-100">
                  <div className="h-6 w-16 bg-purple-100 rounded animate-pulse" />
                  <div className="h-6 w-16 bg-purple-100 rounded animate-pulse" />
                  <div className="h-6 w-16 bg-purple-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
