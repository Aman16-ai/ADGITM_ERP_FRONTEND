import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import SideNav from '../components/SideNav'
import Layout from '../components/Layout'
import MaintenanceIssueStatusContainer from '../components/Maintenance Mangement/MaintenanceIssueStatusContainer'
import MaintenanceIssueTable from '../components/Maintenance Mangement/MaintenanceIssueTable'
import { getAllMaintenanceIssuesThunk, selectAllMaintenanceIssue } from '../store/slice/MaintenanceSlice/maintenanceSlice'
import { useDispatch, useSelector } from 'react-redux'
export default function Home() {
  const data = useSelector(selectAllMaintenanceIssue)
  const dispatch = useDispatch()

  useEffect(()=> {
    console.log('runnign huuuu')
    dispatch(getAllMaintenanceIssuesThunk())
  },[])
  return (
    <div className='w-full h-screen flex flex-col'>
      <MaintenanceIssueStatusContainer/>
      <div className='w-[98%] h-auto shadow-2xl p-5 mt-10 bg-white rounded-md'>
        <h4 className='text-xl font-semibold mb-5'>Recent Maintenance Issues</h4>
      <MaintenanceIssueTable data={data}/>
      </div>
    </div>
  )
}
