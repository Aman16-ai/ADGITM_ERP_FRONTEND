import { CircularProgress } from '@mui/material'
import React from 'react'

export default function CircularProgressBarButton({isLoading,onClick,text,width,height}) {
  return (
    <button
          onClick={onClick}
          className={`w-[${width}] bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg`}
        >
          {isLoading ? <CircularProgress sx={{color:"white"}}/> : text}
        </button>
  )
}
