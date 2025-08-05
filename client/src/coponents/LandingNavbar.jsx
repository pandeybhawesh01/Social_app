// src/components/Navbar.jsx
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function Navbar() {
  const navigate = useNavigate()

  return (
    <nav className="
      fixed top-0 left-0 right-0 z-50 
      bg-purple-150 backdrop-blur-md 
      border-b border-gray-200
    ">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <img
              src={logo} // Use your actual logo here
              alt="CollegeVerse"
              className="w-10 h-10 rounded-full object-contain"
            />
            <h1 className="
              text-xl font-bold 
              bg-gradient-to-r from-purple-600 to-blue-500 
              bg-clip-text text-transparent
            ">
              College Verse
            </h1>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-3">
            <button
              className="text-black text-sm font-medium hover:underline"
              onClick={() => navigate('/about')}
            >
              About
            </button>
            <button
              className="text-black text-sm font-medium hover:underline"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
            <button
              className="text-white text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-500 px-4 py-2 rounded-md shadow hover:brightness-105 transition"
              onClick={() => navigate('/login')}
            >
              Join Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
