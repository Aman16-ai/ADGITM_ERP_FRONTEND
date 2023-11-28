import React, { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import PersonAddOutlinedIcon from '@mui/icons-material/PersonAddOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';
import { useSelector } from 'react-redux';
import { selectUserData } from '../store/slice/userSlice';
import { getUserRole } from '../utils/authUtils';

function SideNav() {
  const user = useSelector(selectUserData)
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false);

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  const handleLogout = (e)=> {
    localStorage.removeItem("erp-token")
    navigate("/")
    window.location.reload()
  }
  return (
    <div
      className={`sidenav transition-all duration-300 bg-white flex flex-col items-center ${
        isHovered ? 'w-64 h-full shadow-lg' : 'w-16 h-full shadow-sm'
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
        {getUserRole(user) === 'Admin' ? <li className='mt-6 flex flex-col justify-center items-center'>
          {isHovered ? <Accordion sx={{width:"230px",boxShadow:"none"}}>
          <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <PermIdentityOutlinedIcon  sx={{ stroke: "#ffffff", strokeWidth: 0.7 }} fontSize='medium' />
          <Typography sx={{marginLeft:"5px"}}>Users</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <NavLink className={({isActive}) => `${isActive ? "text-blue-700" : "text-black"}`} to={"/AddUser"}>
        <div className='flex'>
        <PersonAddOutlinedIcon  sx={{ stroke: "#ffffff", strokeWidth: 0.7 }} fontSize='medium' />
        <Typography sx={{marginLeft:"5px"}}>Add User</Typography>
        </div>
        </NavLink>
        </AccordionDetails>
        <AccordionDetails>
        <NavLink className={({isActive}) => `${isActive ? "text-blue-700" : "text-black"}`} to={"/manageUsers"}>
        <div className='flex'>
        <ManageAccountsOutlinedIcon  sx={{ stroke: "#ffffff", strokeWidth: 0.7 }} fontSize='medium' />
        <Typography sx={{marginLeft:"5px"}}>Manage Users</Typography>
        </div>
        </NavLink>
        </AccordionDetails>
          </Accordion>:<PermIdentityOutlinedIcon  sx={{ stroke: "#ffffff", strokeWidth: 0.7 }} fontSize='medium' />}
        </li>:null}


        {getUserRole(user) !== 'MM' ?<><li className={`${isHovered?'mt-2':'mt-6'} flex flex-col justify-center items-center`}>
          {isHovered ? <Accordion sx={{width:"230px",boxShadow:"none"}}>
          <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <HomeWorkOutlinedIcon  sx={{ stroke: "#ffffff", strokeWidth: 0.7 }} fontSize='medium' />
          <Typography sx={{marginLeft:"5px"}}>Maintenance</Typography>
        </AccordionSummary>
        {getUserRole(user) !== 'MM' ? <><AccordionDetails>
        <NavLink className={({isActive}) => `${isActive ? "text-blue-700" : "text-black"}`} to={"/createMaintenance"}>
        <div className='flex'>
        <AddCircleOutlineOutlinedIcon  sx={{ stroke: "#ffffff", strokeWidth: 0.7 }} fontSize='medium' />
        <Typography sx={{marginLeft:"5px"}}>Create Maintenance</Typography>
        </div>
        </NavLink>
        </AccordionDetails>
        <AccordionDetails>
        <NavLink className={({isActive}) => `${isActive ? "text-blue-700" : "text-black"}`} to={"/manageFaculty"}>
        <div className='flex'>
        <ManageAccountsOutlinedIcon  sx={{ stroke: "#ffffff", strokeWidth: 0.7 }} fontSize='medium' />
        <Typography sx={{marginLeft:"5px"}}>Manage Maintenance</Typography>
        </div>
        </NavLink>
        </AccordionDetails></>:null}
          </Accordion>:<HomeWorkOutlinedIcon  sx={{ stroke: "#ffffff", strokeWidth: 0.7 }} fontSize='medium' />}
        </li></>:null}
      </ul>

      {isHovered ? <button onClick={handleLogout} className={`mt-auto mb-[15px] bg-blue-500 w-48 rounded-md text-white h-10 rounded-2xl}`}><LogoutIcon/> Logout</button> : <div className='mt-auto mb-[15px] shadow-md w-12 h-10 flex justify-center items-center rounded-md'><LogoutIcon/></div>}
    </div>
  );
}

export default SideNav;
