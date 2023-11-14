import { useEffect, useState } from 'react'
import img from "./static/img1.jpeg"
import Login from './page/login'
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserData, setIsAuthenticated, userDetailsThunk } from './store/slice/userSlice';
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  BrowserRouter,
  Route,
  Link,
} from "react-router-dom";
import Home from './page/Home';
import { getUserDetails } from './services/User';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import CreateMaintenance from './page/Maintenance Mangement/CreateMaintenance';
import AllMaintenance from './page/Maintenance Mangement/AllMaintenance';
import { Create } from '@mui/icons-material';
import GlobalModal from './components/Global/GlobalModal';
import AddUser from './page/Faculty Management/AddUser';
import NotFound from './page/NotFound';
import ManageUsers from './page/Faculty Management/ManageUsers';


function App() {
  const dispatch = useDispatch()
  const userData = useSelector(selectUserData)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children:[
        {
          index : true,
          element : <Home/>
        },
        {
          path : "/createMaintenance",
          element : <CreateMaintenance/>
        },
        {
          path : "/allMaintenance",
          element : <AllMaintenance/>
        },
        {
          path:"/manageUsers",
          element : <PrivateRoute><ManageUsers/></PrivateRoute>
        },
        {
          path:"/AddUser",
          element:<AddUser/>
        }
      ]
    },
    {
      path: "login",
      element: <Login/>
    },
    {
      path:"NotFound",
      element:<NotFound/>
    }
  ]);
  const fun = async () => {
    return await getUserDetails()
  }
  useEffect(() => {
    const token = localStorage.getItem("erp-token")
    if(token === undefined || token === null || token === "" || token === " ") {
      dispatch(setIsAuthenticated(false))
    }
    else {
      dispatch(userDetailsThunk())
    }
    fun()
  },[])
  useEffect(()=> {
    console.log('user data -------> ',userData)
    console.log('isAuthenticated',isAuthenticated)
    if(isAuthenticated) {
      dispatch(userDetailsThunk())
    }
  },[isAuthenticated])
  return (
  
    <>
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<PrivateRoute><Home/></PrivateRoute>}/>
            <Route path="/createMaintenance" element={<PrivateRoute><CreateMaintenance/></PrivateRoute>} />
            <Route path='/allMaintenance' element={<PrivateRoute><AllMaintenance/></PrivateRoute>}/>
          </Route>
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter> */}
    </>
  )
}

export default App
