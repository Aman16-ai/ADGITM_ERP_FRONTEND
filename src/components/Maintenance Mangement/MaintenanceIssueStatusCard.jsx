import React from 'react'
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LoopIcon from '@mui/icons-material/Loop';
import FunctionsOutlinedIcon from '@mui/icons-material/FunctionsOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
export default function MaintenanceIssueStatusCard({status,count}) {
  const getIconOrColor = (color) => {
    if(status === 'pending') {
      return color ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : <PendingActionsOutlinedIcon fontSize='large'/>
    }
    else if(status === 'total') {
      return color ? 'bg-gradient-to-r from-orange-400 to-orange-600' : <FunctionsOutlinedIcon fontSize='large'/>
    }
    else if(status === 'completed') {
      return color ? 'bg-gradient-to-r from-green-400 to-green-600' : <AssignmentTurnedInOutlinedIcon fontSize='large'/>
    }
    else if(status === 'progress') {
      return color ? 'bg-gradient-to-r from-cyan-500 to-blue-500' : <PauseCircleOutlinedIcon fontSize='large'/>
    }
    else if(status === 'verified') {
      return color ? 'bg-gradient-to-r from-sky-500 to-blue-500' : <VerifiedOutlinedIcon fontSize='large'/>
    }
    else {
      return color ? 'bg-gradient-to-r from-red-400 to-red-600' :<CancelOutlinedIcon fontSize='large' />
    }
  }
  return (
    <div className={`w-[290px] m-4 h-32 shadow-md rounded-md ${getIconOrColor(true)} flex flex-col justify-center items-center hover:scale-110`}>
        <div className='flex'>
        {getIconOrColor(false)} <h5 className='text-2xl ml-2'>{count}</h5>
        </div>
        <hr/>
        <h3 className='text-xl'>{status[0].toUpperCase() + status.slice(1,status.length)}</h3>
    </div>
  )
}
