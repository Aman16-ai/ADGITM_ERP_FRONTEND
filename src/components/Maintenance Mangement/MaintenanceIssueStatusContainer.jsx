import React, { useEffect, useState } from 'react'
import MaintenanceIssueStatusCard from './MaintenanceIssueStatusCard'
import { maintenanceStatusAndCountThunk } from '../../store/slice/MaintenanceSlice/maintenanceStatusAndCount'
import { selectMaintenanceStatusAndCountData } from '../../store/slice/MaintenanceSlice/maintenanceStatusAndCount'
import { useDispatch, useSelector } from 'react-redux'
import { formateDateInputStringWithFullYearMonthAndDateOnly } from '../../utils/DateFormatter'
import DateRangeFilter from '../Global/DateRangeFilter'
import { getAllMaintenanceIssuesThunk } from '../../store/slice/MaintenanceSlice/maintenanceSlice'
export default function MaintenanceIssueStatusContainer() {
  const data = useSelector(selectMaintenanceStatusAndCountData)
  const [startDate,setStartDate] = useState(null)
  const [endDate,setEndDate] = useState(null)
  const onApplyClick = (e) => {
    if(startDate !== null && endDate != null) {
      const formattedStartDate = formateDateInputStringWithFullYearMonthAndDateOnly(startDate)
      const formattedEndDate = formateDateInputStringWithFullYearMonthAndDateOnly(endDate)
      const query = `?start_date=${formattedStartDate}&end_date=${formattedEndDate}`
      dispatch(maintenanceStatusAndCountThunk(query)) 
      dispatch(getAllMaintenanceIssuesThunk(query))
    }
    else {
      //TODO : alert message date must be choosen
    }
  }
  const onDefaultClick = (e) => {
    setStartDate(null)
    setEndDate(null)
    dispatch(maintenanceStatusAndCountThunk())
    dispatch(getAllMaintenanceIssuesThunk())
  }
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(maintenanceStatusAndCountThunk())
  // },[])
  return (
    <div className='w-auto h-auto flex flex-col mt-3 p-5 shadow-2xl rounded-md'>
      <div className='w-full h-auto flex justify-between items-center'>
      <h3 className='ml-4 font-semibold text-xl'>Maintenance Status</h3>
      <DateRangeFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={(setEndDate)} onApplyClick={onApplyClick} onDefaultClick={onDefaultClick}/>
      </div>
      <div className='w-full h-auto flex'>

        {
          data?.map((d,i) => {
            return <MaintenanceIssueStatusCard key={i} status={d.status.toLowerCase()} count={d.count}/>
          })
        }
    </div>
    </div>
  )
}
