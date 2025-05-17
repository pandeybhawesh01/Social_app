import React, { useState } from 'react';
import Sidebar from '../coponents/sidebar';
import { useNavigate } from 'react-router-dom';

function Post() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [caption, setCaption] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <div className="min-h-screen bg-admin-pattern bg-fixed">
      <Sidebar />
      <div className="ml-64 p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-xl font-semibold text-gray border-b pb-2">
          Schedule a Post
        </h2>
        <p className="text-center text-lightgray mt-2 mb-4">
          Choose your content type and schedule your post.
        </p>
        <div className="flex justify-between w-full gap-x-4 h-12">
          {/* Transparent radio labels */}
          <label className="flex items-center gap-3 bg-transparent p-2 rounded-lg cursor-pointer hover:bg-grayhover transition duration-300 w-1/3 shadow-md">
            <input 
              type="radio" 
              name="content-type" 
              value="post"
              checked={selectedOption === "post"}
              onChange={() => setSelectedOption("post")}
              className="w-5 h-5  border-bordergray"
            />
            <span className="font-medium text-gray">Post</span>
          </label>
          <label className="flex items-center gap-3 bg-transparent p-2 rounded-lg cursor-pointer hover:bg-grayhover transition duration-300 w-1/3 shadow-md">
            <input 
              type="radio" 
              name="content-type" 
              value="carousel"
              checked={selectedOption === "carousel"}
              onChange={() => setSelectedOption("carousel")}
              className="w-5 h-5  border-bordergray"
            />
            <span className="font-medium text-gray">Carousel</span>
          </label>
          <label className="flex items-center gap-3 bg-transparent p-2 rounded-lg cursor-pointer hover:bg-grayhover transition duration-300 w-1/3 shadow-md">
            <input 
              type="radio" 
              name="content-type" 
              value="reel"
              checked={selectedOption === "reel"}
              onChange={() => setSelectedOption("reel")}
              className="w-5 h-5  border-bordergray"
            />
            <span className="font-medium text-gray">Reel</span>
          </label>
        </div>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-2">
            <label 
              className="cursor-pointer flex flex-col items-center justify-center w-full h-10 bg-transparent rounded-lg hover:bg-grayhover transition shadow-md"
            >
              <input 
                type="file" 
                accept="image/*, video/*" 
                className="hidden" 
                onChange={handleFileChange} 
              />
              <span className="text-gray font-medium">
                Click to Upload Media
              </span>
            </label>
          </div>
          <div className="mb-1">
            <h3 className="text-moderategray font-medium">Caption:</h3>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full mt-2 p-3 border border-bordergray rounded-md focus:outline-none focus:ring-2 focus:ring-focusblue"
              placeholder="Write a caption..."
              rows="3"
              maxLength="150"
            ></textarea>
          </div>
          <div className="mb-2">
            <h3 className="text-moderategray font-medium">Select Time:</h3>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full mt-2 p-3 border border-bordergray rounded-md focus:outline-none focus:ring-2 focus:ring-focusblue"
            />
          </div>
          <div className="mb-2">
            <h3 className="text-moderategray font-medium">Select Date:</h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full mt-2 p-3 border border-bordergray rounded-md focus:outline-none focus:ring-2 focus:ring-focusblue"
            />
          </div>
          <div className="flex justify-center items-center pt-4">
            <button
              type="submit"
              className="w-full bg-blue-green text-whitetext py-2 rounded-md font-semibold cursor-pointer hover:bg-blue-green-hover transition duration-300 shadow-md"
            >
              Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Post;
