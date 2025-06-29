import React, { useContext, useState } from 'react';
import Sidebar from '../coponents/sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContext } from '../contex/AppContex';

const collegeList = [
  "IIT Bombay", "IIT Delhi", "IIT Kanpur", "IIT Kharagpur", "IIT Madras",
  "NIT Trichy", "NIT Surathkal", "BITS Pilani", "BIT Mesra", "VIT Vellore",
  "KIIT Bhubaneswar", "SRM University", "Manipal University", "Delhi University",
  "Jamia Millia Islamia", "AMU", "IIIT Hyderabad", "IIIT Delhi", "NSUT", "DTU",
  // Add more if needed
];


function Post() {
   const { userData, backendUrl } = useContext(AppContext);
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [caption, setCaption] = useState("");
  const [postType, setPostType] = useState("");
  const [otherType, setOtherType] = useState("");
  const [college, setCollege] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can use postType === 'others' ? otherType : postType
    navigate('/dashboard');
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const createPost = async (e) => {
  e.preventDefault(); // prevent form reload if used in a form
  try {
    const formData = new FormData();
    formData.append('content', caption); // corresponds to req.body.content
    formData.append('type', postType === 'others' ? otherType : postType);
    formData.append('college', college);

    if (file) {
      formData.append('image', file); // for req.files.image
    }

    const { data } = await axios.post(`${backendUrl}/api/post/createPost`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (data.success) {
      alert('Post created successfully');
      navigate('/dashboard');
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert('Something went wrong while creating post');
    console.log(err);
  }
};


  return (
    <div className="min-h-screen bg-admin-pattern bg-fixed">
      <Sidebar />
      <div className="ml-64 p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-xl font-semibold text-gray border-b pb-2">
          Create a Post
        </h2>
        <p className="text-center text-lightgray mt-2 mb-4">
          Share your update with the CollegeVerse community.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Post Type */}
          <div>
            <label className="block text-gray font-medium mb-1">Select Type:</label>
            <select
              value={postType}
              onChange={(e) => setPostType(e.target.value)}
              className="w-full p-2 border border-bordergray rounded-md focus:ring-2 focus:ring-focusblue"
              required
            >
              <option value="">Select type</option>
              <option value="club">Club</option>
              <option value="informative">Informative</option>
              <option value="internship">Internship</option>
              <option value="research">Research</option>
              <option value="event">Event</option>
              <option value="others">Others</option>
            </select>
            {postType === "others" && (
              <input
                type="text"
                value={otherType}
                onChange={(e) => setOtherType(e.target.value)}
                placeholder="Enter custom type"
                className="mt-2 w-full p-2 border border-bordergray rounded-md focus:ring-2 focus:ring-focusblue"
                required
              />
            )}
          </div>

          {/* College Dropdown */}
          <div>
            <label className="block text-gray font-medium mb-1">Select College:</label>
            <select
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              className="w-full p-2 border border-bordergray rounded-md focus:ring-2 focus:ring-focusblue"
              required
            >
              <option value="">Select college</option>
              {collegeList.map((col, i) => (
                <option key={i} value={col}>{col}</option>
              ))}
            </select>
          </div>


          {/* Caption */}
          <div>
            <label className="block text-gray font-medium mb-1">Content:</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full mt-2 p-3 border border-bordergray rounded-md focus:outline-none focus:ring-2 focus:ring-focusblue"
              placeholder="Write your post..."
              required
            ></textarea>
          </div>

          {/* Image Upload (Optional) */}
          <div>
            <label className="block text-gray font-medium mb-1">Upload Image (optional):</label>
            <label className="cursor-pointer flex items-center justify-center w-full h-10 bg-transparent rounded-lg hover:bg-grayhover transition shadow-md">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="text-gray font-medium">
                Click to Upload Image
              </span>
            </label>
            {preview && (
              <img src={preview} alt="Preview" className="mt-3 h-40 rounded-lg object-contain border border-bordergray" />
            )}
          </div>

          {/* Schedule (Optional) */}
          {/* <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-moderategray font-medium">Select Time:</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full mt-1 p-2 border border-bordergray rounded-md focus:ring-2 focus:ring-focusblue"
              />
            </div>
            <div className="flex-1">
              <label className="text-moderategray font-medium">Select Date:</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full mt-1 p-2 border border-bordergray rounded-md focus:ring-2 focus:ring-focusblue"
              />
            </div>
          </div> */}

          {/* Post Type Options (Visual) */}
          <div className="flex justify-between w-full gap-x-4 h-12 mt-4">
            <label className="flex items-center gap-3 bg-transparent p-2 rounded-lg cursor-pointer hover:bg-grayhover transition duration-300 w-1/2 shadow-md">
              <input
                type="radio"
                name="media-type"
                checked
                disabled
                className="w-5 h-5"
              />
              <span className="font-medium text-gray">Post</span>
            </label>
            <label className="flex items-center gap-3 bg-gray-100 p-2 rounded-lg cursor-not-allowed w-1/2 shadow-inner">
              <input
                type="radio"
                name="media-type"
                disabled
                className="w-5 h-5"
              />
              <span className="font-medium text-gray line-through">Reel (Coming Soon)</span>
            </label>
          </div>

          <button onClick={createPost}
            type="submit"
            className="w-full bg-blue-green text-whitetext py-2 rounded-md font-semibold cursor-pointer hover:bg-blue-green-hover transition duration-300 shadow-md"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default Post;

