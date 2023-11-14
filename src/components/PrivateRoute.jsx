import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";  
import { selectIsAuthenticated, selectUserData } from "../store/slice/userSlice";
import { getUserRole } from "../utils/authUtils";
export default function PrivateRoute({children}) {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const userData = useSelector(selectUserData)
    console.log('is priate',isAuthenticated)
    if(getUserRole(userData) !== 'HOD') {
        console.log('running ------------> private route')
        return <Navigate to={"/NotFound"}/>
    }
    return children
}
