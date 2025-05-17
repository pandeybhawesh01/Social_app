import React, { useState } from 'react';
import Sidebar from '../coponents/sidebar';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [account, setAccount] = useState('');

  return (
    <div className="min-h-screen bg-admin-pattern">
      <Sidebar />
      <div className="ml-64 p-8">
        <h2 className="text-center text-xl font-medium text-gray border-b pb-2">
          Create New Admin
        </h2>
        <p className="text-center text-lightgray mt-2 mb-4">
          Please fill in the details below.
        </p>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="mt-4">
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label className="block text-moderategray font-semibold mb-1">
              Accounts*
            </label>
            <select
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              required
              className="w-full px-4 py-2 border border-bordergray rounded-md pr-6 focus:outline-none focus:ring-2 focus:ring-focusblue"
            >
              <option value="account1">Account1</option>
              <option value="account2">Account2</option>
              <option value="account3">Account3</option>
              <option value="account4">Account4</option>
            </select>
          </div>
          <div className="flex justify-center items-center pt-4">
            <button
              type="submit"
              className="w-full bg-blue-green text-whitetext py-2 rounded-md font-semibold cursor-pointer 
             hover:bg-blue-green-hover transition-all duration-300 shadow-md"

            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Admin;
