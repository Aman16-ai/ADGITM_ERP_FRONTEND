import React, { useEffect, useState } from 'react';
import { createMaintenanceIssue, getAllMaintenanceTypes } from '../../services/Maintenance';
import { CircularProgress } from '@mui/material';
import { getAllDeparments } from '../../services/Department';
import { useDispatch } from 'react-redux';
import { updateAlert } from '../../store/slice/alertSlice';

function MaintenanceForm() {
    const dispatch = useDispatch()
    const [payload,setPayload] = useState({
        "maintenanceType": null,
        "department":null,
        "description": "",
        "status": "Pending"
    })

    const [departments,setDeparments] = useState([])
    const [maintenanceTypes,setMaintenanceTypes] = useState([])

    const [isLoading,setIsLoading] = useState(false)

    const getDeparments = async() => {
      try {
        const departmentList = await getAllDeparments()
        setDeparments(departmentList)
        console.log('deparmtent service',departmentList[0].id)
        setPayload({...payload,department:departmentList[0].id})
      }
      catch(err) {
        alert(err)
      }
    }

    const getMaintenanceTypes = async() => {
      try {
        const maintenanceTypeList = await getAllMaintenanceTypes()
        setMaintenanceTypes(maintenanceTypeList)
        setPayload({...payload,maintenanceType:maintenanceTypeList[0].id})
      } 
      catch(err) {
        alert(err)
      }
    }
    const onHandleChange = (e) => {
        setPayload({...payload,[e.target.name]:e.target.value})
    }
    const onSubmit = async() => {
        console.log('payload ----------> ',payload)
        try {
            if(payload.description === '' || payload.department === null || payload.maintenanceType === null) {
              dispatch(updateAlert({'open':true,message:"Please enter all fields",severity:'error'}))
            }
            else {
              setIsLoading(true)
              const result = await createMaintenanceIssue(payload)
              console.log(result)
              dispatch(updateAlert({'open':true,message:'Successfully created',severity:'success'}))
            }
        }
        catch(err) {
            dispatch(updateAlert({'open':true,message:err.toString(),severity:'error'}))
        }
        finally {
          setIsLoading(false)
          setTimeout(()=> {
            dispatch(updateAlert({open:false}))
            
          },2000)
        }
    }

    useEffect(() => {
      getDeparments()
      getMaintenanceTypes()
    },[])
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
            {maintenanceTypes.map((m) => {
              return <option value={m.id}>{m.name} Maintenace</option>
            })}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 font-semibold text-lg mb-2" htmlFor="maintenance-type">
            Department:
          </label>
          <select
            className="w-full p-3 border rounded-lg text-gray-700"
            id="maintenance-type"
            name="department"
            value={payload.department}
            onChange={onHandleChange}
          >
            {departments.map((d) => {
              return <option value={d.id}>{d.name}</option>
            })}
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

        {/* <div className="mb-6">
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
        </div> */}

        <button
          onClick={onSubmit}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
        >
          {isLoading ? <CircularProgress sx={{color:"white"}}/> : "Submit"}
        </button>
    </div>
  );
}

export default MaintenanceForm;
