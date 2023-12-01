import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { applyFitler } from "../../store/slice/MaintenanceSlice/maintenanceSlice";

export default function Filter() {
  const [department, setDeparments] = useState();
  const dispatch = useDispatch()
  const [status, setStatus] = useState();
  const onApplyClick = () => {};
  const onDefaultClick = () => {};
  const handleInputChange = (e) => {
    if(e.target.name === 'department') {
        setDeparments(e.target.value)
    }
    else {
        setStatus(e.target.value)
    }
    dispatch(applyFitler({name:e.target.name,value:e.target.value}))
  }
  return (
    <div className="w-auto h-auto flex justify-center items-center mb-4">
      <div className="mr-2">
        
          <select
            id="department"
            name="department"
            value={department}
            onChange={handleInputChange}
            className="form-input h-8  block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-blue-300 focus:ring focus:outline-none focus:ring-blue-200 focus:ring-opacity-50 text-xs"
          >
            <option value="default">Department</option>
            <option value="CSE">CSE</option>
            <option value="AIML">AIML</option>
            {/* Add other role options if needed */}
          </select>
      </div>

      <div className=" mr-2">
          <select
            id="status"
            name="status"
            value={status}
            onChange={handleInputChange}
            className="form-input h-8 block w-full rounded-md border-gray-300 border-2 shadow-sm focus:border-blue-300 focus:ring focus:outline-none focus:ring-blue-200 focus:ring-opacity-50 text-xs"
          >
            <option value="default">Status</option>
            <option value="Pending">Pending</option>
            <option value="Progress">Progress</option>
            <option value="Verified">Verified</option>
            <option value="Completed">Completed</option>
            <option value="Approval Pending">Approval</option>
            
            {/* Add other role options if needed */}
          </select>
      </div>
      {/* <button
        onClick={onApplyClick}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline h-10  mr-2`}
      >
        Apply
      </button> */}
      <button
        onClick={onDefaultClick}
        className={`border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold text-xs px-4 rounded focus:outline-none focus:shadow-outline h-8 mr-4`}
      >
        Default
      </button>
    </div>
  );
}
