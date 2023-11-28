import * as React from 'react';
import Table from '@mui/material/Table';
import styled from '@emotion/styled';
import TableBody from '@mui/material/TableBody';
import TableCell,{tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../../store/slice/userSlice';
import RadioGroupComponent from '../Global/RadioGroupComponent';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { setOpen } from '../../store/slice/globalModal';
import { setPayload } from '../../store/slice/MaintenanceSlice/commentSlice';
import GlobalModal from '../Global/GlobalModal';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import CheckboxComponent from '../Global/CheckboxComponent';

export default function MaintenanceIssueTable(props) {
  const user = useSelector(selectUserData)
  const dispatch = useDispatch()
  const getUserRole = () => {
    if('faculty_user' in user) {
      return user.faculty_user.role
    }
    return user?.role
  }
  const handleComment = (maintenanceIssueId) => {
    console.log("msi ",maintenanceIssueId)
    dispatch(setOpen(true))
    dispatch(setPayload({name:"maintenanceIssue",value:maintenanceIssueId}))
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><p className='font-semibold'>Date</p></TableCell>
            <TableCell align="center"><p className='font-semibold'>Type</p></TableCell>
            <TableCell align="center"><p className='font-semibold'>Description</p></TableCell>
            <TableCell align="center"><p className='font-semibold'>Logged By</p></TableCell>
            <TableCell align="center"><p className='font-semibold'>Department</p></TableCell>
            <TableCell align="center"><p className='font-semibold'>Status</p></TableCell>
            {getUserRole() === 'HOD'?<TableCell align="center"><p className='font-semibold'>Verify</p></TableCell>:null}
            <TableCell align="center"><p className='font-semibold'>Comment</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.data.map((row,i) => (
            <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.created_at}
              </TableCell>
              <TableCell align="center">{row.maintenanceType.name}</TableCell>
              <TableCell align="center"> <div className='flex justify-center items-center'>
                  <p>{row.description}</p>
                  
                </div> </TableCell> 
              <TableCell align="center">{row.created_by.first_name} {row.created_by.last_name}</TableCell>
              <TableCell align="center">{row.department.name}</TableCell>
              <TableCell align="center">{getUserRole() === 'MM' || getUserRole() === 'Admin' ? 
              row.status==='Verified'? 
              <div className='flex justify-center items-center'><StatusTab withIcon={true} status={row.status}/></div> : 
              <><RadioGroupComponent currentStatus={row.status} id={row.id} key={i}/> </> :
              <div className='flex justify-center items-center'><StatusTab status={row.status}/></div>}</TableCell>
              {getUserRole() === 'HOD'?<TableCell align="center"><CheckboxComponent status={row.status}/></TableCell>:null}
              <TableCell align='center'><button onClick={(e) => handleComment(row.id)}><CommentOutlinedIcon fontSize='medium' sx={{ stroke: "#ffffff" }} /></button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function StatusTab({status,withIcon}) {
  const getColor = () => {
    if (status === 'Pending') {
      return 'bg-gradient-to-r from-yellow-400 to-yellow-600'
    }
    else if(status === 'Completed') {
      return 'bg-gradient-to-r from-green-400 to-green-600'
    }
    else if(status === 'Progress') {
      return 'bg-gradient-to-r from-cyan-500 to-blue-500'
    }
    else if(status === 'Verified') {
      return 'bg-gradient-to-r from-sky-500 to-blue-500'
    }
    else {
      return 'bg-gradient-to-r from-red-400 to-red-600'
    }
  }
  return <div className={`${withIcon ? 'w-[130px] h-[40px]' : 'w-[80px] h-[30px]'} p-2 border-2 rounded-md text-white flex justify-center items-center ${getColor()}`}>
    {withIcon?<VerifiedOutlinedIcon style={{marginRight:"4px"}} fontSize='small'/>:null}
    <p className={`${withIcon ? "text-sm":'text-xs'} font-semibold`}>{status}</p>
  </div>
}
