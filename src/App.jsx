import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Home from './screens/home'
import Dashboard from './screens/dashboard'
import Login from './screens/login'
import Admin from './screens/admin'
import Post from './screens/post'
import AdminList from './screens/adminList'

import PostList from './screens/postList'
import { ThemeProvider } from './themeSelector/ThemeContext'

const App = () => {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/post" element={<Post/>}/>
       
        <Route path="/adminList" element={<AdminList/>}/>
        <Route path="/postList" element={<PostList/>}/>
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App