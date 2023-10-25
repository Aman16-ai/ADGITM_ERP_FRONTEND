import React, { useEffect } from 'react'
import MaintenanceIssueStatusCard from './MaintenanceIssueStatusCard'
import { maintenanceStatusAndCountThunk } from '../../store/slice/MaintenanceSlice/maintenanceStatusAndCount'
import { selectMaintenanceStatusAndCountData } from '../../store/slice/MaintenanceSlice/maintenanceStatusAndCount'
import { useDispatch, useSelector } from 'react-redux'
import DatePickerComponent from '../Global/DatePickerComponent'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Button } from '@mui/material'
export default function MaintenanceIssueStatusContainer() {
  const data = useSelector(selectMaintenanceStatusAndCountData)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(maintenanceStatusAndCountThunk())
  },[])
  return (
    <div className='w-auto h-auto flex flex-col mt-3 p-5 shadow-2xl rounded-md'>
      <div className='w-full h-auto flex justify-between items-center'>
      <h3 className='ml-4 font-semibold text-xl'>Maintenance Status</h3>
      <div className='flex justify-center mr-4'>
      <DatePickerComponent key={1} placeholder={'Start Date'}/>
      <DatePickerComponent key={2} placeholder={'End Date'}/>
      </div>
      </div>
      <div className='w-full h-auto flex'>

        {
          data?.map((d) => {
            return <MaintenanceIssueStatusCard status={d.status.toLowerCase()} count={d.count}/>
          })
        }
    </div>
    </div>
  )
}
