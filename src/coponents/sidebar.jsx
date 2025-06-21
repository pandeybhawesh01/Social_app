import React from "react";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-blue-green text-whitetext flex flex-col p-6 shadow-2xl">
      <h1 className="text-3xl font-extrabold mb-8 text-center">Reelify</h1>
      <nav className="flex flex-col space-y-2">
        <Link to="/" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-green-hover transition">
          <HomeIcon />
          <span className="text-lg font-semibold">Home</span>
        </Link>
        <Link to="/admin" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-green-hover transition">
          <PersonAddIcon />
          <span className="text-lg font-semibold">Create New Admin</span>
        </Link>
        <Link to="/adminList" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-green-hover transition">
          <PersonIcon />
          <span className="text-lg font-semibold">Admins</span>
        </Link>
        <Link to="/post" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-green-hover transition">
          <PostAddIcon />
          <span className="text-lg font-semibold">Schedule New Posts</span>
        </Link>
        <Link to="/postList" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-green-hover transition">
          <ArticleIcon />
          <span className="text-lg font-semibold">Posts</span>
        </Link>
        <Link to="/home" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-green-hover transition">
          <LogoutIcon />
          <span className="text-lg font-semibold">Logout</span>
        </Link>
        <Link to="/bot" className="flex items-center gap-3 p-3 rounded-md hover:bg-blue-green-hover transition">
          <span className="text-lg font-semibold">Gyani</span>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;

