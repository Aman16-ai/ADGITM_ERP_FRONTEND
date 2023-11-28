import React from 'react'
import DatePickerComponent from './DatePickerComponent'

export default function DateRangeFilter({startDate,setStartDate,endDate,setEndDate,onApplyClick,onDefaultClick}) {
  return (
    <div className='flex justify-center'>
      <DatePickerComponent key={1} placeholder={'Start Date'} selectedDate={startDate} setSelectedDate={setStartDate}/>
      <DatePickerComponent key={2} placeholder={'End Date'} selectedDate={endDate} setSelectedDate={setEndDate}/>
      <button
      onClick={onApplyClick}
      className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline h-8 mt-1 mr-2`}
    >
      Apply
    </button>
    <button
      onClick={onDefaultClick}
      className={`border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white font-semibold py-1 px-4 rounded focus:outline-none focus:shadow-outline h-8 mt-1 mr-4`}
    >
      Default
    </button>
      </div>
  )
}
