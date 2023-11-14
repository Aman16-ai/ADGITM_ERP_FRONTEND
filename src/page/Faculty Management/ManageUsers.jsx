import React, { useEffect, useState } from "react";
import TabsComponent from "../../components/Global/TabsComponent";
import Allfaculty from "../../components/User_Management/Manage User/AllFaculty"
import ApprovalRequests from "../../components/User_Management/Manage User/ApprovalRequests"
export default function ManageUsers() {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const tabsData = [
    {value : 0,label:"All Faculty"},
    {value : 1,label:"Approval Requests"}
  ]
  return <div className="w-[99%] h-full flex flex-col">
    <TabsComponent tabsData={tabsData} value={tabValue} setValue={setTabValue} handleChange={handleChange}
    />
    <div className="w-full h-full mt-2 flex flex-col">
        {tabValue === 0 ? <Allfaculty/>:<ApprovalRequests/>}
    </div>
  </div>;
}
