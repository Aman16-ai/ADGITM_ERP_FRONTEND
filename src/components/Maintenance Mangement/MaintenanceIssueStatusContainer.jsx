import React, { useEffect } from 'react'
import MaintenanceIssueStatusCard from './MaintenanceIssueStatusCard'
import { maintenanceStatusAndCountThunk } from '../../store/slice/MaintenanceSlice/maintenanceStatusAndCount'
import { selectMaintenanceStatusAndCountData } from '../../store/slice/MaintenanceSlice/maintenanceStatusAndCount'
import { useDispatch, useSelector } from 'react-redux'
export default function MaintenanceIssueStatusContainer() {
  const data = useSelector(selectMaintenanceStatusAndCountData)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(maintenanceStatusAndCountThunk())
  },[])
  return (
    <div className='w-auto h-auto flex flex-col mt-3 p-2 rounded-md'>
      <h3 className='ml-4 font-semibold text-xl'>Maintenance Status</h3>
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
