import React, { useEffect } from "react";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
} from "../store/slice/userSlice";
import { selectAlertOptions } from "../store/slice/alertSlice";
export default function Layout() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const {open,severity,variant,message} = useSelector(selectAlertOptions)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  return (
    <div className="w-screen h-screen flex flex-col">
      <div className="w-auto h-auto">
        <NavBar />
      </div>
      <div className="w-full h-full flex">
        <div className="w-auto h-auto border-t-2">
          <SideNav />
        </div>
        <div className="w-full h-full p-5 overflow-y-scroll">
          <Outlet />
          <div className="w-auto h-auto absolute right-0 bottom-2 mr-2 fixed">
            {open ? <Alert variant={variant} severity={severity}>
                {message}
              </Alert>:null}
          </div>
        </div>
      </div>
    </div>
  );
}
