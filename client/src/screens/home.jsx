// src/pages/Index.jsx
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card }   from '../components/ui/card'
// import FeatureCard from '../components/FeatureCard'
import FeatureCard from '../coponents/FeaturesCard'
import LandingNavbar from '../coponents/LandingNavbar'
import heroImage    from '../assets/hero-image.jpg'
// import waveIcon     from '../assets/wave-icon.png'

export default function Index() {
  const navigate = useNavigate()

  return (
  <div className="min-h-screen"
  style={{ backgroundColor: '#7C3AED' }}>
    <LandingNavbar />

    <section className="relative pt-20 pb-16 px-4 overflow-hidden bg-purple-100">
      <div className="absolute inset-0 bg-purple-100 opacity-30 rounded-3xl blur-3xl pointer-events-none" />

      <div className="max-w-full mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          <div className="text-center lg:text-left z-10 relative">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <h1 className="text-xl font-semibold text-black">Hey Student!</h1>
              <span role="img" aria-label="wave" className="text-2xl">🖐️</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Welcome to<br />
              College Verse
            </h2>

            <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto lg:mx-0">
              Connect with students across campuses. Share reels, posts, and experiences. 
              Build your college community today!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={() => navigate('/login')}
                className="text-base px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md rounded-md"
              >
                Login
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-purple-300 opacity-20 blur-3xl rounded-3xl pointer-events-none" />
            <img
              src={heroImage}
              alt="College students connecting"
              className="relative w-full h-auto rounded-3xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 px-4 bg-purple-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900">
            Why College Students Love Us
          </h3>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Everything you need to connect, share, and thrive in your college community
          </p>
        </div>
      </div>
    </section>


    <footer className="py-8 px-4 border-t border-gray-200 bg-purple-100">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-gray-500">
          © 2024 College Verse. Made with ❤️ for college students everywhere.
        </p>
      </div>
    </footer>
  </div>
)
}
