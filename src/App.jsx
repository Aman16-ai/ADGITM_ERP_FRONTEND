import { useEffect, useState } from 'react'
import img from "./static/img1.jpeg"
import Login from './page/login'
import { useSelector } from 'react-redux';
import { selectUserData } from './store/slice/userSlice';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from './page/Home';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "login",
    element: <Login/>
  },
]);
function App() {
  
  const {userData} = useSelector(selectUserData)
  useEffect(()=> {
    console.log('user data -------> ',userData)
  },[userData])
  return (
  
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
