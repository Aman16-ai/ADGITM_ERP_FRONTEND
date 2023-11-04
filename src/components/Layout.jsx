import React from "react";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import { Outlet } from "react-router-dom";
import { Alert } from "@mui/material";
export default function Layout() {
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
