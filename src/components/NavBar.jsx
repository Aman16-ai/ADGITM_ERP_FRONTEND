import React from 'react'
import logo from "../static/adgitmLogo.jpeg"
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import profileImg from "../static/profilePic.jpg"
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../store/slice/userSlice';
export default function NavBar() {
  const userData = useSelector(selectUserData)
  const navigate = useNavigate()
  const getUserFullName = () => {
    if('faculty_user' in userData) {
      console.log('user data inside if')
      return userData.faculty_user.first_name +" " + userData.faculty_user.last_name
    }
    return userData.first_name + " "+ userData.last_name
  }
  return (
    <div className='w-screen bg-white h-16 shadow-lg flex justify-evenly items-center'>
        <div className='w-auto flex h-full cursor-pointer' onClick={(e) => navigate("/")}>
        <img src={logo} alt="" className='w-[65px] ml-5' />
        <h4 className='w-[250px] mt-2 font-semibold'>Dr. Akhilesh Das Gupta Institute of Technology & Management</h4>
        </div>
        <input className='w-[350px] h-12 bg-slate-100 rounded-xl p-5 focus:outline-none' type="text" name="" placeholder='search' id="" />
        <div className='w-[400px] h-full  border-black flex items-center justify-evenly'>
            <div>
            <Link className='mr-1' to={"/"}><HomeOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 0.7 }} fontSize='large'/></Link>
            <Link className="ml-2" to={"/notifications"}><NotificationsActiveOutlinedIcon sx={{ stroke: "#ffffff", strokeWidth: 0.7 }} fontSize='large'/></Link>
            </div>
            <div className="w-[200px] h-[55px] 
            border-slate-200
            text-black
            text-lg
            border-2
            rounded-full font-semibold
            flex items-center
            "
            >
              <img className="w-[48px] ml-1 border-2 border-slate-200 rounded-full h-[48px]" src={profileImg}/>
              <p className="border-black ml-2 text-black cursor-pointer">{getUserFullName()}</p>
              </div>
        </div>
    </div>
  )
}
