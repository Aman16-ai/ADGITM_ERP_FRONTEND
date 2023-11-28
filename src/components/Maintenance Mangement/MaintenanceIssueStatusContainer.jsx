import React, { useEffect, useState } from 'react'
import MaintenanceIssueStatusCard from './MaintenanceIssueStatusCard'
import { maintenanceStatusAndCountThunk } from '../../store/slice/MaintenanceSlice/maintenanceStatusAndCount'
import { selectMaintenanceStatusAndCountData } from '../../store/slice/MaintenanceSlice/maintenanceStatusAndCount'
import { useDispatch, useSelector } from 'react-redux'
import { formateDateInputStringWithFullYearMonthAndDateOnly } from '../../utils/DateFormatter'
import DateRangeFilter from '../Global/DateRangeFilter'
import { getAllMaintenanceIssuesThunk } from '../../store/slice/MaintenanceSlice/maintenanceSlice'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
export default function MaintenanceIssueStatusContainer() {
  const data = useSelector(selectMaintenanceStatusAndCountData)
  const [startDate,setStartDate] = useState(null)
  const [endDate,setEndDate] = useState(null)
  const [applied,setApplied] = useState(false)
  const onApplyClick = (e) => {
    if(startDate !== null && endDate != null) {
      const formattedStartDate = formateDateInputStringWithFullYearMonthAndDateOnly(startDate)
      const formattedEndDate = formateDateInputStringWithFullYearMonthAndDateOnly(endDate)
      const query = `?start_date=${formattedStartDate}&end_date=${formattedEndDate}`
      dispatch(maintenanceStatusAndCountThunk(query)) 
      dispatch(getAllMaintenanceIssuesThunk(query))
      setApplied(true)
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
    setApplied(false)
  }
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(maintenanceStatusAndCountThunk())
  // },[])

  function getTotal() {
    const total = data?.find((d) => {
      if(d.status === 'Total') return d
    })
    return total
  }

  function getReportDate() {
    if(applied) {
      return `Report from ${formateDateInputStringWithFullYearMonthAndDateOnly(startDate)} to  ${formateDateInputStringWithFullYearMonthAndDateOnly(endDate)}`
    }
    else {
      return "Report till now"
    }
  }
  return (
    <div className='w-auto h-auto flex flex-col mt-3 p-5 shadow-2xl rounded-md'>
      <div className='w-full h-auto flex justify-between items-center z-10'>
      <h3 className='ml-4 font-semibold text-lg'>Maintenance Status</h3>
      <DateRangeFilter startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={(setEndDate)} onApplyClick={onApplyClick} onDefaultClick={onDefaultClick}/>
      </div>
      <div className='w-full h-auto flex'>

        {/* {
          data?.map((d,i) => {
            if(d.status.toLowerCase() !== 'total') {
              return <MaintenanceIssueStatusCard key={i} status={d.status.toLowerCase()} count={d.count}/>
            }
          })
        } */}
         <Swiper
         modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={4}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      
      {
        data?.map((d,i) => {
          return <SwiperSlide><MaintenanceIssueStatusCard key={i} status={d.status.toLowerCase()} count={d.count}/></SwiperSlide>
        })
      }
    </Swiper>
    </div>
    {/* <div className='w-[98%] ml-3 h-[55px] flex items-center'>
        <p className='text-lg ml-2'>{getReportDate()}</p>
        <p className='text-lg ml-3'>Total : {getTotal().count}</p>
    </div> */}
    </div>
  )
}
