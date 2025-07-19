import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContext } from '../contex/AppContex';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Facebook } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';

function Login() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [state, setState] = useState('Login');

  // loading state drives both spinner and disabling
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      axios.defaults.withCredentials = true;
      let res;

      if (state === 'Sign Up') {
        res = await axios.post(`${backendUrl}/api/auth/register`, { name, email, password });
      } else {
        res = await axios.post(`${backendUrl}/api/auth/login`, { email, password });
      }

      if (res.data.success) {
        setIsLoggedIn(true);
        await getUserData();
        navigate('/dashboard');
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-admin-pattern p-4">
      <div className="mb-8 text-center">
        <h2 className="text-5xl font-extrabold text-gray font-outfit">INFOVERSE</h2>
        <p className="mt-2 text-xl text-moderategray">Upload and share your best reels</p>
      </div>
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/3 bg-whitebg border border-bordergray shadow-2xl rounded-2xl p-8">
        <div className="mb-2 px-4">
          <h2 className="text-center text-2xl font-semibold text-gray border-b pb-2">
            {state === 'Sign Up' ? 'Create your account' : 'Login to Your Account'}
          </h2>
          <p className="text-center text-lightgray mt-2">Enter your credentials.</p>
        </div>

        <form onSubmit={handleSubmit} className="px-4 space-y-4">
          {state === 'Sign Up' && (
            <div className="flex items-center px-5 py-2 gap-3 bg-containerwhite border border-bordergray rounded-full focus-within:ring-1 focus-within:ring-focusblue">
              <img src={assets.person_icon} alt="" />
              <input
                placeholder="Full name"
                required
                disabled={loading}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent outline-none w-full"
              />
            </div>
          )}

          <div className="flex items-center px-5 py-2 gap-3 bg-containerwhite border border-bordergray rounded-full focus-within:ring-1 focus-within:ring-focusblue">
            <img src={assets.mail_icon} alt="" />
            <input
              type="email"
              placeholder="Email"
              required
              disabled={loading}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
          </div>

          <div className="flex items-center px-5 py-2 gap-3 bg-containerwhite border border-bordergray rounded-full focus-within:ring-1 focus-within:ring-focusblue">
            <img src={assets.lock_icon} alt="" />
            <input
              type="password"
              placeholder="Password"
              required
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
          </div>

          <p
            onClick={() => navigate('/reset-password')}
            className="mb-4 cursor-pointer text-gray text-sm"
          >
            Forgot password?
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center bg-blue-green text-whitetext py-3 rounded-full hover:bg-blue-green-hover transition duration-300 shadow-m font-bold"
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              state
            )}
          </button>
        </form>

        {state === 'Sign Up' ? (
          <p className="text-center text-sm mt-4">
            Already have an account?{' '}
            <span
              onClick={() => setState('Login')}
              className="text-gray cursor-pointer underline"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-center text-sm mt-4">
            Don&apos;t have an account?{' '}
            <span
              onClick={() => setState('Sign Up')}
              className="text-gray cursor-pointer underline"
            >
              Sign up
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
