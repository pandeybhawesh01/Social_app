import React from 'react';

const ChatShimmer = () => {
  return (
    <div className='flex flex-row h-screen'>
      {/* Sidebar Shimmer */}
      <div className="w-[20%] bg-[#B794F6] p-6 hidden sm:flex flex-col gap-4">
        {/* New Chat Section Shimmer */}
        <div>
          <div className="flex items-center gap-2 p-2 rounded-lg">
            <div className="w-6 h-6 bg-[#9F7AEA] rounded animate-pulse"></div>
            <div className="h-4 bg-[#9F7AEA] rounded w-20 animate-pulse"></div>
          </div>
        </div>

        {/* Search Section Shimmer */}
        <div>
          <div className="flex items-center gap-2 p-2 rounded-lg">
            <div className="w-6 h-6 bg-[#9F7AEA] rounded animate-pulse"></div>
            <div className="h-4 bg-[#9F7AEA] rounded w-16 animate-pulse"></div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#9F7AEA] my-2"></div>

        {/* Chat List Section Shimmer */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#9F7AEA] rounded animate-pulse"></div>
            <div className="h-4 bg-[#9F7AEA] rounded w-12 animate-pulse"></div>
          </div>

          {/* Chat Items Shimmer */}
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="flex items-center justify-between p-2 rounded-lg">
              <div className="h-3 bg-[#9F7AEA] rounded w-24 animate-pulse"></div>
              <div className="w-5 h-5 bg-[#9F7AEA] rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area Shimmer */}
      <div className="w-[100%] sm:w-[80%] relative min-h-screen bg-[#F3F0FF] flex flex-col justify-between">
        {/* Mobile Menu Button Shimmer */}
        <div className="sm:hidden fixed top-4 left-4 z-50 p-2">
          <div className="w-6 h-6 bg-[#B794F6] rounded animate-pulse"></div>
        </div>

        {/* Chat Content Area Shimmer */}
        <div className="flex-1 flex justify-center items-center flex-col p-4">
          {/* Profile Image Shimmer */}
          <div className="w-36 h-36 bg-[#D6C7F7] rounded-full mb-6 animate-pulse"></div>
          
          {/* Welcome Text Shimmer */}
          <div className="flex items-center gap-2 mb-2">
            <div className="h-6 bg-[#D6C7F7] rounded w-32 animate-pulse"></div>
            <div className="w-8 h-8 bg-[#D6C7F7] rounded animate-pulse"></div>
          </div>
          
          <div className="h-8 bg-[#D6C7F7] rounded w-48 mb-4 animate-pulse"></div>
          
          {/* Chat Messages Shimmer */}
          <div className="w-full max-w-2xl space-y-4 mt-8">
            {[1, 2, 3].map((msg) => (
              <div key={msg} className="space-y-2">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-[#D6C7F7] rounded-lg p-3 max-w-xs animate-pulse">
                    <div className="h-4 bg-[#B794F6] rounded w-20 mb-2"></div>
                    <div className="h-3 bg-[#B794F6] rounded w-32"></div>
                  </div>
                </div>
                
                {/* Bot Message */}
                <div className="flex justify-start">
                  <div className="bg-white rounded-lg p-3 max-w-xs animate-pulse">
                    <div className="h-4 bg-[#E5E7EB] rounded w-16 mb-2"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-[#E5E7EB] rounded w-28"></div>
                      <div className="h-3 bg-[#E5E7EB] rounded w-24"></div>
                      <div className="h-3 bg-[#E5E7EB] rounded w-32"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input Bar Shimmer */}
        <div className="w-full px-4 py-3 border-t border-[#D6C7F7] flex items-center gap-4 bg-[#F3F0FF]">
          {/* Input Field Shimmer */}
          <div className="flex-1 h-10 bg-white border border-[#D6C7F7] rounded-xl animate-pulse"></div>
          
          {/* Send Button Shimmer */}
          <div className="w-10 h-10 bg-[#B794F6] rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatShimmer;