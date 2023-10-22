import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";  
import { selectIsAuthenticated } from "../store/slice/userSlice";
export default function PrivateRoute({children}) {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    console.log('is priate',isAuthenticated)
    if(!isAuthenticated) {
        console.log('running ------------> private route')
        return <Navigate to={"/login"}/>
    }
    return children
}
