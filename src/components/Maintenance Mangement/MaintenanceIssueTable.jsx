import * as React from 'react';
import Table from '@mui/material/Table';
import styled from '@emotion/styled';
import TableBody from '@mui/material/TableBody';
import TableCell,{tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function MaintenanceIssueTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><p className='font-semibold'>Type</p></TableCell>
            <TableCell align="center"><p className='font-semibold'>Description</p></TableCell>
            <TableCell align="center"><p className='font-semibold'>Timestamp</p></TableCell>
            <TableCell align="center"><p className='font-semibold'>Status</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props?.data.map((row) => (
            <TableRow
              key={row.maintenanceType.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.maintenanceType.name}
              </TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.timestamp}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
