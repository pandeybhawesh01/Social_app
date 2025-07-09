import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { cn } from "../lib/utils";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { to: '/dashboard', icon: HomeIcon, label: 'Home' },
    { to: '/admin', icon: PersonAddIcon, label: 'Create Admin' },
    { to: '/adminList', icon: PeopleIcon, label: 'Admins' },
    { to: '/post', icon: AddIcon, label: 'New Post' },
    { to: '/postList', icon: DescriptionIcon, label: 'Posts' },
    { to: '/bot', icon: AutoGraphIcon, label: 'Gyani' },
    { to: '/profile', icon: PersonIcon, label: 'Profile' },
    { to: '/logout', icon: LogoutIcon, label: 'Logout' },
  ];

  return (
    <div
      className={cn(
        "fixed top-0 left-0 h-screen bg-gradient-to-b from-purple-600 to-purple-800 text-white flex flex-col shadow-2xl transition-all duration-300 z-50",
        isOpen ? "w-64" : "w-16"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-500/30">
        {isOpen && (
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            CollegeVerse
          </h1>
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg hover:bg-purple-500/30 transition-colors duration-200"
        >
          <MenuIcon />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map(({ to, icon: Icon, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              to={to}
              key={to}
              className={cn(
                "flex items-center p-3 rounded-lg transition-all duration-200 group relative",
                isActive
                  ? "bg-white/20 text-white shadow-lg border border-white/20"
                  : "hover:bg-white/10 text-purple-100 hover:text-white"
              )}
            >
              <Icon className="flex-shrink-0" />
              {isOpen && <span className="ml-3 font-medium truncate">{label}</span>}
              {!isOpen && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                  {label}
                </div>
              )}
              {isActive && (
                <div className="absolute left-0 top-0 w-1 h-full bg-white rounded-r-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-purple-500/30">
        <div className={cn(
          "text-xs text-purple-200 text-center",
          !isOpen && "hidden"
        )}>
          © 2024 CollegeVerse
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import MenuIcon from '@mui/icons-material/Menu';
// import HomeIcon from '@mui/icons-material/Home';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import PersonIcon from '@mui/icons-material/Person';
// import PostAddIcon from '@mui/icons-material/PostAdd';
// import ArticleIcon from '@mui/icons-material/Article';
// import LogoutIcon from '@mui/icons-material/Logout';
// import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
// import Bot from "../screens/bot";

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const toggleSidebar = () => setIsOpen(!isOpen);

//   const menuItems = [
//     { to: '/dashboard', Icon: HomeIcon, label: 'Home' },
//     { to: '/admin', Icon: PersonAddIcon, label: 'Create Admin' },
//     { to: '/adminList', Icon: PersonIcon, label: 'Admins' },
//     { to: '/post', Icon: PostAddIcon, label: 'New Post' },
//     { to: '/postList', Icon: ArticleIcon, label: 'Posts' },
//     { to: '/logout', Icon: LogoutIcon, label: 'Logout' },
//     { to: '/bot', Icon: SmartToyOutlinedIcon, label: 'Gyani' },
//     { to: '/profile', Icon: SmartToyOutlinedIcon, label: 'Gay' },
//   ];

//   return (

//     <div
//       className={
//         `fixed top-0 left-0 h-screen bg-blue-green text-whitetext flex flex-col shadow-2xl transition-all duration-300 ` +
//         (isOpen ? 'w-64 p-4' : 'w-16 p-2')
//       }
//     >
//       <div className="flex items-center justify-between mb-4">
//         {isOpen && <h1 className="text-2xl font-extrabold">College Verse</h1>}
//         <button onClick={toggleSidebar} className="p-2 rounded hover:bg-hover-bg-grayhover focus:outline-none">
//           <MenuIcon />
//         </button>
//       </div>

//       {/* Always render nav icons, show labels only when open */}
//       <nav className="flex-1 flex flex-col space-y-2 overflow-y-auto">
//         {menuItems.map(({ to, Icon, label }) => (
//           <Link
//             to={to}
//             key={to}
//             className="flex items-center p-3 rounded-md hover:bg-hover-bg-grayhover transition-colors duration-200"
//           >
//             <Icon className="text-xl" />
//             {isOpen && <span className="ml-4 font-medium">{label}</span>}
//           </Link>
//         ))}

//       </nav>
//     </div>
//   );
// };

// export default Sidebar;
