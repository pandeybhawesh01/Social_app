import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../contex/AppContex'
import { useNavigate } from 'react-router-dom'

function Header() {
const {userData} = useContext(AppContext)
const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center'>
        <img src={assets.header_img} alt="" className='w-36 h-36 rounded-full mb-6'></img>
        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey {userData ? userData.name :'User'} <img className='w-8 aspect-square' src={assets.hand_wave} alt ="" ></img></h1>
        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to INFOVERSE</h2>
        <p className='mb-8 max-w-md'></p>
        <button 
        className='border-2 border-bordergray rounded-full px-8 py-2 text-whitetext bg-blue-green hover:bg-blue-green-hover'
        onClick={() => {navigate('/login')}}>Get Started</button>
    </div>
  )
}

export default Header