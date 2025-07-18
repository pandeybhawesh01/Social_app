import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './screens/home'
import Dashboard from './screens/dashboard'
import Login from './screens/login'
import Admin from './screens/admin'
import Post from './screens/post'
import AdminList from './screens/adminList'
import EmailVerify from './screens/emailVerify'
import ResetPassword from './screens/resetPassword'
import Profile from './screens/Profile'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import PostList from './screens/postList'
import { ThemeProvider } from './themeSelector/ThemeContext'
import Bot from './screens/bot'

const App = () => {
  return (
    <ThemeProvider>
     
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/email-verify" element={<EmailVerify/>}/>
        <Route path="/reset-password" element={<ResetPassword/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/post" element={<Post/>}/>
        <Route path="/adminList" element={<AdminList/>}/>
        <Route path="/postList" element={<PostList/>}/>
        <Route path="/bot" element={<Bot/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      
    </ThemeProvider>
  )
}

export default App