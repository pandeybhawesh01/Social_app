import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-admin-pattern p-4">
      <div className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold text-gray">Reelify</h1>
        <p className="mt-2 text-xl text-moderategray">
          Upload and share your best reels
        </p>
      </div>
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/3 bg-whitebg border border-bordergray shadow-2xl rounded-2xl p-8">
        <div className="mb-2 px-4">
          <h2 className="text-center text-2xl font-semibold text-gray border-b pb-2">
            Login to Your Account
          </h2>
          <p className="text-center text-lightgray mt-2">
            Enter your credentials.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="px-4">
          <div className="mb-4">
            <label className="block text-moderategray font-semibold mb-1">
              Email*
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-bordergray rounded-md focus:outline-none focus:ring-2 focus:ring-focusblue"
            />
          </div>
          <div className="mb-6">
            <label className="block text-moderategray font-semibold mb-1">
              Password*
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-bordergray rounded-md focus:outline-none focus:ring-2 focus:ring-focusblue"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-green text-whitetext py-3 rounded-lg font-medium hover:bg-blue-green-hover transition duration-300 shadow-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
