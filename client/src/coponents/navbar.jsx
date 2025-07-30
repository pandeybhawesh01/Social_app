import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../contex/AppContex';
import axios from 'axios';


function Navbar() {

  const navigate = useNavigate();

  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext)

  const sendVerificationOtp = async () =>{
    try{
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl +'/api/auth/send-verify-otp')

      if(data.success)
      {
        navigate('/email-verify')
        alert(data.message)
      }
      else{
        alert(data.message)
      }
    }
    catch(err){
      alert('Error sending verification OTP: ' + err.message);
    }
  }

  const logout = async () =>{
    try{
      axios.defaults.withCredentials=true;
      const {data} = await axios.post(backendUrl +'/api/auth/logout')
      data.success && setIsLoggedIn(false);
      data.success && setUserData(null)
      navigate('/')
    }
    catch(err){
      alert('Error logging out: ' + err.message);
    }
  }

  return (
    <div className='w-full flex justify-between itemns-center p-4 sm:px-12 absolute top-0'>
      <div className='w-28 sm:w-32'></div>
      {userData ?
        <div className='w-10 h-10 flex justify-center items-center rounded-full bg-blue-green relative group text-white font-bold'>
          {userData.image?
          (<img
          src={userData.image}
          alt="na"
          className="w-10 h-10 rounded-full object-cover"
          >
          </img>)
          :
          (userData.name[0].toUpperCase())}
          <div className='absolute hidden group-hover:block top-0 right-0 z-10 pt-10'>
            <ul className='list-none m-0 p-2 bg-blue-green text-sm rounded'>
              {!userData.isAccountVerified  &&
              <li onClick={sendVerificationOtp} className='py-1 px-2 hover:bg-blue-green-hover cursor-pointer'>Verify email</li>}
              <li onClick={logout} className='py-1 px-2 hover:bg-blue-green-hover cursor-pointer pr-10'>Logout</li>
            </ul>
          </div>

        </div> :
        <button onClick={() => navigate('/login')}
          className='flex items-center gap-2 border border-bordergray rounded-full px-6 py-2 text-whitetext bg-blue-green hover:bg-blue-green-hover'>Login <img src={assets.arrow_icon} alt=""></img></button>}
    </div>
  )
}

export default Navbar