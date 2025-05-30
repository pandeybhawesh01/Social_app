import React, { use, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { AppContext } from '../contex/AppContex'

const ResetPassword = () => {

  const {backendUrl} = useContext(AppContext)
  axios.defaults.withCredentials=true;
  const inputRefs = React.useRef([]);
  
    const handleInput = (e, index) => {
      const value = e.target.value;
      if (value.length === 1 && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    };
  
    const handleKeyDown = (e, index) => {
      if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  
    const handlePaste = (e) => {
      const paste = e.clipboardData.getData('text');
      const pasteArray = paste.split('');
      pasteArray.forEach((char, index) => {
  
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char;
        }
      })
    }
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [newPassword,setNewPassword] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp,setOtp]=useState(0);
  const[isOtpSubmitted,setIsOtpSubmitted]=useState(false);

  const onSubmitEmail = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email });
    alert(data.message);
    if (data.success) {
      setIsEmailSent(true);
    }
  } catch (err) {
    alert(err.message);
  }
};

const onSubmitOtp =async(e) =>{
  e.preventDefault();
  const otpArray= inputRefs.current.map(e=>e.value)
  setOtp(otpArray.join(''))
  setIsOtpSubmitted(true);
}

const onSubmitNewPassword = async(e) =>{
  e.preventDefault();
  try{
    const {data} = await axios.post(backendUrl+ "/api/auth/reset-password",{email,otp,newPassword});
    data.success ? alert(data.message) : alert(data.message);
    data.success && navigate('/login');
  }
  catch(err){
    alert(err.message)
  }
}

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-admin-pattern p-4">
      <div className="mb-8 text-center">
        <h2 className="text-5xl font-extrabold text-gray font-outfit">INFOVERSE</h2>
        
      </div>
      <div className="flex flex-col items-center w-full sm:w-3/4 md:w-2/3 lg:w-1/3 bg-whitebg border border-bordergray shadow-2xl rounded-2xl p-8">
      {!isEmailSent &&
        <form onSubmit={onSubmitEmail} className="w-full px-4" >
          <h2 className="text-center text-2xl font-semibold text-gray border-b border-bordergray pb-2">
            Reset Password
          </h2>
          <p className="text-center text-lightgray mt-2">
            Enter your email.
          </p>
          <input
            type="email"
            placeholder="Email"
            className="w-full mt-4 py-2 px-5 border border-bordergray rounded-full"
            value={email}
            onChange ={e => setEmail(e.target.value)}
            required
          />
          {/* <input
            type="password"
            placeholder="New Password"
            className="w-full mt-4 py-2 px-5 border border-bordergray rounded-full"
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full mt-4 py-2 px-5 border border-bordergray rounded-full"
            required
          /> */}
          <button
            type="submit"
            className="w-full bg-blue-green text-whitetext py-2 rounded-full font-bold text-lg mt-6 cursor-pointer hover:bg-blue-green-hover transition duration-300 shadow-md"
           
          >
            Get OTP
          </button>
        </form>}
{/* verify otp form */}
{!isOtpSubmitted && isEmailSent &&
        <form onSubmit={onSubmitOtp} className="p-8 rounded-lg shadow-lg w-96 text-sm bg-whitebg" >
    <h1 className="text-2xl font-semibold text-center mb-4">Reset password OTP</h1>
    <p className="text-center mb-6 text-moderategray">Enter the 6-digit code sent to your email id.</p>
    
    <div className="flex justify-between mb-8" onPaste={handlePaste}>
      {Array(6).fill(0).map((_, index) => (
        <input
          type="text"
          key={index}
          maxLength="1"
          required
          className="w-12 h-12 text-center text-xl rounded-md bg-containerwhite"
          ref={(el) => (inputRefs.current[index] = el)}
          onInput={(e) => handleInput(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
    <button
      type="submit"
      className="w-full bg-blue-green text-whitetext py-2 rounded-full text-lg hover:bg-blue-green-hover transition duration-300 shadow-m font-bold cursor-pointer"
    >
      Submit
    </button>
  </form>
}

  {/* enter new password */}
  {isOtpSubmitted && isEmailSent &&
  <form onSubmit={onSubmitNewPassword} className="w-full px-4" >
          <h2 className="text-center text-2xl font-semibold text-gray border-b border-bordergray pb-2">
            Reset Password
          </h2>
          <p className="text-center text-lightgray mt-2">
            Enter new password
          </p>
          
          <input
            type="password"
            placeholder="password"
            className="w-full mt-4 py-2 px-5 border border-bordergray rounded-full"
            value={newPassword}
            onChange ={e => setNewPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-green text-whitetext py-2 rounded-full font-bold text-lg mt-6 cursor-pointer hover:bg-blue-green-hover transition duration-300 shadow-md"
            onClick={() => navigate('/login')}
          >
            Submit
          </button>
        </form>
}
      </div>
    </div>
  )
}

export default ResetPassword