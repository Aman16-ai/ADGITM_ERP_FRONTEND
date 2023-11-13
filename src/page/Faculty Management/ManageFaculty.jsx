import React, { useEffect, useState } from "react";
import TabsComponent from "../../components/Global/TabsComponent";
import AllFaculty from "../../components/Faculty Management/Manage Faculty/AllFaculty";
import ApprovalRequests from "../../components/Faculty Management/Manage Faculty/ApprovalRequests";

export default function ManageFaculty() {
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
        {tabValue === 0 ? <AllFaculty/>:<ApprovalRequests/>}
    </div>
  </div>;
}
