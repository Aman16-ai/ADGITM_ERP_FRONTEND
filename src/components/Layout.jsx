import React, { useEffect } from "react";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import { Navigate, Outlet } from "react-router-dom";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../store/slice/userSlice";
export default function Layout() {
  const isAuthenticate = useSelector(selectIsAuthenticated)
  console.log('isAuth-------->',isAuthenticate)
  return (
    <>
      <div className="w-screen h-screen flex flex-col">
        <div className="w-auto h-auto">
          <NavBar />
        </div>
        <div className="w-full h-full flex">
          <div className="w-auto h-auto border-t-2">
            <SideNav />
          </div>
          <div className="w-full h-full p-5">
            <Outlet />
            <div className="w-auto h-auto absolute right-0 bottom-2 mr-2 fixed">
              {/* <Alert variant="filled" severity="success">
                This is an error alert — check it out!
              </Alert> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
