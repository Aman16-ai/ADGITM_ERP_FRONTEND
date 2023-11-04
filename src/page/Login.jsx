import React, { useState } from 'react'
import img from "../static/img1.jpeg"
import { loginUser } from '../services/User'
import { useNavigate } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
export default function Login() {
  const navigate = useNavigate()
    const [credentails,setCredentials] = useState({
        'username' : "",
        'password' : ""
    }) 
    const [isLoading,setIsLoading] = useState(false)
    const handleLogin = async() => {
        try {
            setIsLoading(true)
            const result = await loginUser(credentails)
            console.log('login result -------> ',result)
            localStorage.setItem('erp-token',result?.access)
            navigate("/")
            window.location.reload()
        }
        catch(err) {
            console.log(err)
        }
        finally {
          setIsLoading(false)
        }
    }
  return (
    <div className='w-screen h-screen flex'>
        <div className='relative overflow-hidden bg-no-repeat bg-cover bg-center w-[50%] h-screen' style={{backgroundImage : `url(${img})`}}>
          <div className='absolute w-full h-full bottom-0 top-0 right-0 overflow-hidden bg-fixed' style={{backgroundColor: "rgba(0,0,0,0.6)"}}>
            <div className='flex flex-col h-full z-1 items-center justify-center'>
            <h2 className='text-white text-5xl font-semibold'>Enterprise Resource Planning</h2>
            <h3 className='text-white text-xl mt-1'>Dr. Akhilesh Das Gupta Institute of Technology & Management</h3>
            </div>
          </div>
        </div>
        <div className='w-[50%] flex items-center justify-center h-screen'>
        <div className="bg-white rounded-lg shadow-2xl p-8 w-[50%] ">
        <h2 className="text-xl font-bold text-center">Login</h2>
        
          <div className="mb-4">
            <label htmlFor="username" className="block font-semibold">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              className="w-full px-3 py-2 border rounded-md"
              required
              value={credentails.username}
              onChange={(e) => setCredentials({...credentails,'username':e.target.value})}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md"
              required
              value={credentails.password}
              onChange={(e) => setCredentials({...credentails,'password':e.target.value})}
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-700 cursor-pointer"
            onClick={handleLogin}
          >
            
            {isLoading ? <CircularProgress sx={{color:"white"}}/> : "Login"}
          </button>
        
      </div>
        </div>
      </div>
  )
}
