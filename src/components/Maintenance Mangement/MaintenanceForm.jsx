import React, { useState } from 'react';
import { createMaintenanceIssue } from '../../services/Maintenance';

function MaintenanceForm() {
    const [payload,setPayload] = useState({
        "maintenanceType": "Civil",
        "description": "",
        "status": "Pending"
    })
    const onHandleChange = (e) => {
        setPayload({...payload,[e.target.name]:e.target.value})
    }
    const onSubmit = async() => {
        console.log('payload ----------> ',payload)
        try {
            const result = await createMaintenanceIssue(payload)
            console.log(result)
        }
        catch(err) {
            console.log(err)
        }
    }
  return (
    <div className="bg-white rounded-lg shadow-md p-8 mx-auto max-w-2xl">
      <h2 className="text-2xl font-bold text-center mb-6">Create Maintenance Issue</h2>
        <div className="mb-6">
          <label className="block text-gray-600 font-semibold text-lg mb-2" htmlFor="maintenance-type">
            Maintenance Type:
          </label>
          <select
            className="w-full p-3 border rounded-lg text-gray-700"
            id="maintenance-type"
            name="maintenanceType"
            value={payload.maintenanceType}
            onChange={onHandleChange}
          >
            <option value="Civil">Civil Maintenance</option>
            <option value="Electric">Electric Maintenance</option>
            <option value="Water">Water Maintenance</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 font-semibold text-lg mb-2" htmlFor="description">
            Description:
          </label>
          <textarea
            className="w-full p-3 border rounded-lg text-gray-700"
            id="description"
            name="description"
            rows="6"
            value={payload.description}
            onChange={onHandleChange}
          ></textarea>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 font-semibold text-lg mb-2" htmlFor="status">
            Status:
          </label>
          <select
            className="w-full p-3 border rounded-lg text-gray-700"
            id="status"
            name="status"
            value={payload.status}
            onChange={onHandleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Progress">Progress</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        <button
          onClick={onSubmit}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          Submit
        </button>
    </div>
  );
}

export default MaintenanceForm;
