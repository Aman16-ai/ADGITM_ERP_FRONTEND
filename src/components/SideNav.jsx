import React, { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { Link, NavLink } from 'react-router-dom';
function SideNav() {
  const [isHovered, setIsHovered] = useState(false);

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div
      className={`sidenav transition-all duration-300 bg-white ${
        isHovered ? 'w-64 h-screen shadow-lg' : 'w-16 h-screen shadow-sm'
      }`}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      {/* <div className="profile">
        <img
          src="https://calyx-production-media.s3.amazonaws.com/thumbnails/avatars/ff36087c-2585-11ee-a7d7-0242ac110002.jpg.200x200_q85.png"
          alt="User Profile Image"
          className="w-24 h-24 rounded-full mx-auto"
        />
        <div className="text-center">
          <p className="text-gray-600">Admin</p>
          <p className="text-xl font-bold">John Doe</p>
        </div>
      </div> */}
      {/* <hr className="my-4 border-t border-gray-300" /> */}
      <ul className="menu-list flex flex-col items-center justify-center">
        <li>
        <NavLink className={({isActive}) => `${isActive ? " text-blue-700" : "text-black"}`} to={"/createMaintenance"}> <div className={`mt-10 flex items-center ${isHovered ? "w-[200px]" : "w-auto"}`}>
        <AddCircleOutlineOutlinedIcon  sx={{ stroke: "#ffffff", strokeWidth: 0.7 }} fontSize='medium' />
        <p className='ml-3 font-semibold'>{`${isHovered ? "Create Maintenance" : ""}`}</p>
        </div>
        </NavLink>
        </li>
        
        <li>
        <NavLink className={({isActive}) => `${isActive ? "text-blue-700" : "text-black"}`} to={"/allMaintenance"}> <div className={`mt-6 flex items-center  ${isHovered ? "w-[200px]" : "w-auto"}`}>
        <EngineeringOutlinedIcon  sx={{ stroke: "#ffffff", strokeWidth: 0.7 }} fontSize='medium' />
        <p className='ml-3 font-semibold'>{`${isHovered ? "All Maintenance" : ""}`}</p>
        </div>
        </NavLink>
        </li>

        <li>
        <NavLink className={({isActive}) => `${isActive ? "text-purple-700" : "text-black"}`} to={"/expenses"}> <div className={`mt-6 flex items-center  ${isHovered ? "w-[200px]" : "w-auto"}`}>
        <AccountBalanceWalletOutlinedIcon  sx={{ stroke: "#ffffff", strokeWidth: 0.7 }} fontSize='medium' />
        <p className='ml-3 font-semibold'>{`${isHovered ? "Maintenance Expenses" : ""}`}</p>
        </div>
        </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
