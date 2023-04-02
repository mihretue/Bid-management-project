import React, { useState } from "react";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useEffect } from "react";
import { Link } from "react-router-dom";

const fetchTenders=()=>{
  fetch('http://localhost:3001/gettenders')
  .then(res=>res.json())
  .then((res)=>{
    console.log(res)
  })
  .catch((err)=>{
    console.log(err)
  })
}

  const columns = [
    { 
      id: 'id', 
      label: 'Procurement ID.',
       align: 'center'
    },
    { id: 'title',
     label: 'Procurement Title',
      align: 'center'
  },
    {
      id: 'entity',
      label: 'Procuring Entity',
      align: 'center',
    },
    {
      id: 'category',
      label: 'Procurement Category',
      align: 'center',
    },
    {
      id: 'market',
      label: 'Market Approach',
      align: 'center',
    },
    {
      id: 'deadline',
      label: 'Submission Deadline',
      align: 'center',
    },
  ];
  
  const rows = [
  {id:'OPE-NCB-G-0029-2015-BID',title:'lot one computer equipment',ent:'ORG PE',cat:'Goods',app:'National',dead:'	Apr 28, 2023, 12:00:00 AM'},
  {id:'1',title:'a',ent:'moe',cat:'goods',app:'s',dead:'2'}
  ];
  
  export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    
    useEffect(()=>{
      fetchTenders();
    })

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return (
      <Link to='/specific_adverts' className="text-decoration-none">
      <Paper sx={{ maxWidth: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
         <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="border-bottom border-success"
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
                          <TableCell style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"} >
              {row.id}
                          </TableCell>
                          <TableCell  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
              {row.title}
                          </TableCell>
                          <TableCell  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
              {row.ent}
                          </TableCell>
                          <TableCell style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"} >
              {row.cat}
                          </TableCell>
                          <TableCell  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
              {row.app}
                          </TableCell>
                          <TableCell  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
              {row.dead}
                          </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </Link>
    );
 
};

