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
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.created_by.first_name} {row.created_by.last_name}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{getUserRole() === 'MM' ? <><RadioGroupComponent currentStatus={row.status} id={row.id} key={i}/> </> : row.status}</TableCell>
              <TableCell align='center'><button onClick={(e) => handleComment(row.id)}><CommentOutlinedIcon fontSize='medium' sx={{ stroke: "#ffffff" }} /></button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
