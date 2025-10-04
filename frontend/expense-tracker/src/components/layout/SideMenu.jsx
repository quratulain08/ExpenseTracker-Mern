import React, { useContext, useState, useEffect } from 'react';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/userContext';
import { useNavigate, useLocation } from 'react-router-dom';
import CharAvatar from '../Cards/CharAvatar';

const SideMenu = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  // Track the currently active menu
  const [activeMenu, setActiveMenu] = useState("");

  // Update activeMenu when route changes (so it syncs on page refresh)
  useEffect(() => {
    const current = SIDE_MENU_DATA.find(item => item.path === location.pathname);
    if (current) setActiveMenu(current.label);
  }, [location.pathname]);

  const handleClick = (item) => {
    if (item.path === "logout") {
      handleLogout();
      return;
    }
    setActiveMenu(item.label); // highlight clicked item
    navigate(item.path);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20'>
      {/* User Info */}
      <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-5'>
       {user?.profileImageUrl ? (
  <img
    src={user.profileImageUrl}
    alt="Profile"
    className='w-20 h-20 bg-slate-400 rounded-full mx-auto mb-3'
  />
) : (
  <CharAvatar 
    fullName={user?.fullName || "User"}
    width="w-20"
    height="h-20"
    style="text-xl"
  />
)}




        <h5 className='text-gray-950 leading-6 font-medium'>{user?.fullName}</h5>
      </div>

      {/* Menu Items */}
      <div>
        {SIDE_MENU_DATA.map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-6 rounded-lg mb-3 transition
              ${activeMenu === item.label
                ? "text-white bg-teal-500"
                : "text-gray-700 hover:bg-teal-500 hover:text-white"}`}
            onClick={() => handleClick(item)}
          >
            <item.icon className='text-xl' />
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SideMenu;
