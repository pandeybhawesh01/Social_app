import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { to: '/dashboard', Icon: HomeIcon, label: 'Home' },
    { to: '/admin', Icon: PersonAddIcon, label: 'Create Admin' },
    { to: '/adminList', Icon: PersonIcon, label: 'Admins' },
    { to: '/post', Icon: PostAddIcon, label: 'New Post' },
    { to: '/postList', Icon: ArticleIcon, label: 'Posts' },
    { to: '/logout', Icon: LogoutIcon, label: 'Logout' },
  ];

  return (
    <div
      className={
        `fixed top-0 left-0 h-screen bg-blue-green text-whitetext flex flex-col shadow-2xl transition-all duration-300 ` +
        (isOpen ? 'w-64 p-4' : 'w-16 p-2')
      }
    >
      <div className="flex items-center justify-between mb-4">
        {isOpen && <h1 className="text-2xl font-extrabold">College Verse</h1>}
        <button onClick={toggleSidebar} className="p-2 rounded hover:bg-hover-bg-grayhover focus:outline-none">
          <MenuIcon />
        </button>
      </div>

      {/* Always render nav icons, show labels only when open */}
      <nav className="flex-1 flex flex-col space-y-2 overflow-y-auto">
        {menuItems.map(({ to, Icon, label }) => (
          <Link
            to={to}
            key={to}
            className="flex items-center p-3 rounded-md hover:bg-hover-bg-grayhover transition-colors duration-200"
          >
            <Icon className="text-xl" />
            {isOpen && <span className="ml-4 font-medium">{label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
