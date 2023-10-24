import React from 'react'
import PendingActionsOutlinedIcon from '@mui/icons-material/PendingActionsOutlined';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import LoopIcon from '@mui/icons-material/Loop';
export default function MaintenanceIssueStatusCard({status,count}) {
  const getIconOrColor = (color) => {
    if(status === 'pending') {
      return color ? 'bg-yellow-300' : <PendingActionsOutlinedIcon fontSize='large'/>
    }
    else if(status === 'progress') {
      return color ? 'bg-blue-400' : <LoopIcon fontSize='large'/>
    }
    else if(status === 'completed') {
      return color ? 'bg-green-500' : <AssignmentTurnedInOutlinedIcon fontSize='large'/>
    }
    else {
      return color ? 'bg-red-500' :<CancelOutlinedIcon fontSize='large' />
    }
  }
  return (
    <div className={`w-[320px] m-4 h-28 shadow-md ${getIconOrColor(true)} flex flex-col justify-center items-center hover:scale-110`}>
        <div className='flex'>
        {getIconOrColor(false)} <h5 className='text-2xl ml-3'>{count}</h5>
        </div>
        <hr/>
        <h3 className='text-xl'>{status[0].toUpperCase() + status.slice(1,status.length)}</h3>
    </div>
  )
}
