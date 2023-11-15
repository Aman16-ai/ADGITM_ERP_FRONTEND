import React, { useEffect, useState } from "react";
import TabsComponent from "../../components/Global/TabsComponent";
import ApprovalRequests from "../../components/User_Management/Manage User/ApprovalRequests"
import AllMaintenanceManager from "../../components/User_Management/Manage User/AllMaintenanceManager";
import AllFaculty from "../../components/User_Management/Manage User/AllFaculty";
export default function ManageUsers() {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderTabValueComponent = () => {
    if(tabValue === 0) {
      return <AllFaculty/>
    }
    else if(tabValue === 1) {
      return <AllMaintenanceManager/>
    }
    else {
      return <ApprovalRequests/>
    }
  }
  const tabsData = [
    {value : 0,label:"All Faculty"},
    {value : 1,label:"All Maintenance Managers"},
    {value : 2,label:"Approval Requests"}
  ]
  return <div className="w-[99%] h-full flex flex-col">
    <TabsComponent tabsData={tabsData} value={tabValue} setValue={setTabValue} handleChange={handleChange}
    />
    <div className="w-full h-full mt-2 flex flex-col">
        {renderTabValueComponent()}
    </div>
  </div>;
}
