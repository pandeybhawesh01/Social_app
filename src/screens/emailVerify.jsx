import React, { useContext } from 'react';
import { AppContext } from '../contex/AppContex';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const {backendUrl,isLoggedin,userData,getUserData}= useContext(AppContext);
  const navigate = useNavigate()
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
  const onSubmitHandler = async(e)=>{
    try{
      e.preventDefault();
      const otpArray = inputRefs.current.map(e => e.value);
      const otp = otpArray.join('');
      const {data} = await axios.post(backendUrl + '/api/auth/verify-account',{otp});
      if(data.success){
        alert(data.message);
        getUserData();
        navigate('/')
      }
      else{
        alert(data.message)
      }
    }
    catch(err){
      alert(err.message)
    }
  }

  useEffect(()=>{
    isLoggedin && userData && userData.isAccountVerified && navigate('/');
  },[isLoggedin,userData])

  return (
   <div className="min-h-screen flex flex-col justify-center items-center bg-admin-pattern p-4">
  <form className="p-8 rounded-lg shadow-lg w-96 text-sm bg-whitebg" onSubmit={onSubmitHandler}>
    <h1 className="text-2xl font-semibold text-center mb-4">Email Verification OTP</h1>
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
      className="w-full bg-blue-green text-whitetext py-3 rounded-full text-lg hover:bg-blue-green-hover transition duration-300 shadow-m font-bold cursor-pointer"
    >
      Verify
    </button>
  </form>
</div>

  );
};

export default EmailVerify;
