import React, { useEffect } from 'react'
import NavBar from '../components/NavBar'
import SideNav from '../components/SideNav'
import Layout from '../components/Layout'
import MaintenanceIssueStatusContainer from '../components/Maintenance Mangement/MaintenanceIssueStatusContainer'
import MaintenanceIssueTable from '../components/Maintenance Mangement/MaintenanceIssueTable'
import { getAllMaintenanceIssuesThunk, selectAllMaintenanceIssue } from '../store/slice/MaintenanceSlice/maintenanceSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectBarChartOptions, updateYAxisData } from '../store/slice/MaintenanceSlice/maintenanceBarChart'
import BarChart from '../components/charts/BarChart'
import LineChart from '../components/charts/LineChart'
import { getMaintenanceStatusAndCount } from '../services/Maintenance'
import { maintenanceStatusAndCountThunk, selectMaintenanceStatusAndCountData } from '../store/slice/MaintenanceSlice/maintenanceStatusAndCount'
export default function Home() {
  const data = useSelector(selectAllMaintenanceIssue)
  const statusAndCountData = useSelector(selectMaintenanceStatusAndCountData)
  const barChartOptions = useSelector(selectBarChartOptions)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('chatg -----------> ',statusAndCountData)
    dispatch(updateYAxisData(statusAndCountData))
  },[statusAndCountData])
  useEffect(()=> {
    console.log('runnign huuuu')
    dispatch(getAllMaintenanceIssuesThunk())
    dispatch(maintenanceStatusAndCountThunk())
  },[])
  return (
    <div className='w-[98%] h-full flex flex-col'>
      <MaintenanceIssueStatusContainer/>
      <div className='w-full flex h-auto shadow-2xl p-5 mt-10 bg-white rounded-md'>
        <div className='w-[50%] h-auto flex-col'>
        <h4 className='text-xl font-semibold ml-10'>Status vs Count</h4>
        <BarChart key={'bar'} data={barChartOptions}/>
        </div>
        <div className='w-[50%] h-auto'>
        <h4 className='text-xl font-semibold ml-10'>Year vs Maintenace</h4>
        <LineChart key={'line'}/>
        </div>
      </div>
      <div className='w-full h-auto shadow-2xl p-5 mt-10 bg-white rounded-md'>
        <h4 className='text-xl font-semibold mb-5'>Recent Maintenance Issues</h4>
      <MaintenanceIssueTable data={data}/>
      </div>
    </div>
  )
}
