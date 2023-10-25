import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import the default CSS// Optional custom CSS
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
const  DatePickerComponent = ({placeholder}) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="w-auto m-1 flex items-center border bg-white border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400">
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText={placeholder}
        className="w-full p-2 focus:outline-none"
      />
      <DateRangeOutlinedIcon sx={{marginRight:"2px"}}/>
    </div>
  );
};

export default DatePickerComponent;
