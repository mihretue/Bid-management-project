import React from "react";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useEffect } from "react";

const columns = [
    { 
        id: 'id', 
        label: 'Procurement Information',
        align: 'start',
       
      }
  ]

const rows =[
    {title:'Invitation Date', Information:'Apr 7, 2023'}
]

const Specific_adverts = () => {
    return (
        <div className="container" style={{padding:'0rem'}}>
        <Paper sx={{ maxWidth: '100%', overflow: 'hidden',border:'0.1rem solid gray' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
         <TableHead >
              <TableRow >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    colSpan={2}
                    className="border-success border-bottom"
                    style={{fontWeight:'bold',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol'}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
             <TableBody>
              {rows.map((row) => {
                  return (
                    <TableRow style={{fontSize:'0.8rem',minHeight:'1rem'}} key={row.id}  hover role="checkbox" tabIndex={-1}>
                          <TableCell style={{width:'35%',borderRight:'0.1rem solid gray',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"} >
              {row.title}
                          </TableCell>
                          <TableCell  style={{align:'start',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
              {row.Information}
                          </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            
          </Table>
        </TableContainer>
        
      </Paper>
      </div>
    )
}                           
export default Specific_adverts;