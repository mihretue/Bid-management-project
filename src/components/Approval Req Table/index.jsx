import React, { useState,useEffect } from "react";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import {useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import {BiError} from 'react-icons/bi'
import Button from '@mui/material/Button';
import {BsArrowCounterclockwise} from 'react-icons/bs'
import {GrRefresh} from 'react-icons/gr'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {AiOutlineSearch} from 'react-icons/ai'
  const columns = [
    { 
      id: 'name', 
      label: 'Name',
       align: 'center'
    },
    { id: 'email',
     label: 'Email',
      align: 'center'
  },
    {
      id: 'uname',
      label: 'User Name',
      align: 'center',
    },
    {
      id: 'bday',
      label: 'Birthday',
      align: 'center',
    },
    {
      id: 'role',
      label: 'Role',
      align: 'center',
    },
    {
      id: 'status',
      label: 'Status',
      align: 'center',
    },
    {
      id: 'regdate',
      label: 'Request Time',
      align: 'center',
    },
  ];
  
  export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows,setRows]=useState([]);
    const [init,setInit]=useState([]);
    const [isFetching,setIsFetching]=useState(true)
    const [errorFetching,setErrorFetching]=useState(false)
    const navigate=useNavigate();
    useEffect(()=>{
      fetchAccounts();
    },[])

    const fetchAccounts=()=>{
      fetch('http://localhost:3001/getusers/not-approved')
      .then(res=>res.json())
      .then((res)=>{
        setRows(res)
        setInit(res)
        setIsFetching(false)
      })
      .catch((err)=>{
        setRows([])
        setErrorFetching(true)
      })
    }

    
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    return (
      isFetching?
        <div style={{maxWidth:"15rem",minHeight:'2rem',height:'auto',backgroundColor:'white',margin:'2rem auto'}}>
           {errorFetching?
           <div style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
             <BiError size="1.5rem" />
             <p style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',margin:"0",textAlign:'center',color:'red'}}>An Error Occurred!</p>
            <Button onClick={()=>{fetchAccounts();setIsFetching(true);setErrorFetching(false)}} style={{textTransform:'none'}} color="secondary" className="mt-3" variant="outlined" size="small" endIcon={<BsArrowCounterclockwise />}>Refresh</Button>
           </div>
           :
           <div style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
              <CircularProgress size="1.5rem" color="secondary"/>
              <p style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',margin:"0",textAlign:'center'}}>Fetching Approval Requests...</p>
           </div>
    }</div>
        :
        (rows.length>0?<>
          <div className="mt-3 rounded border mx-auto" style={{width:'90%',height:'auto',minHeight:'2.5rem'}}>
      <TextField
        placeholder="Search a user"
        id="outlined-start-adornment"
        size="small"
        InputProps={{
           endAdornment: <InputAdornment position="end">
           <AiOutlineSearch  />
           </InputAdornment>,
        }}
        style={{width:'100%'}}
        onChange={(e)=>{
         const q=e.target.value;
         let filt=rows;
        if(q!=""){
           filt=rows.filter(row=>(row.fName+" "+row.lName).includes(q))
           setRows(filt)
        }
         else 
           setRows(init)
       }}
 />
</div>
        <button className="ms-auto m-1 d-block btn float-right btn-secondary" variant="outlined" endIcon={<GrRefresh />} style={{textTransform:"none"}} onClick={()=>{fetchAccounts();setIsFetching(true)}}>Refresh List</button>
         <Paper sx={{maxWidth: '100%', overflow: 'hidden' }}>
         <TableContainer sx={{height:'auto'}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead className="border-success">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className=" "
                    style={{fontWeight:'bold',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol'}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
             <TableBody>
              {
              rows.map((row) => {
                return (
                  <TableRow onClick={()=>{navigate(`./${row._id}`)}} style={{cursor:'pointer',fontSize:'0.8rem',minHeight:'1rem'}} key={row.id}  hover role="checkbox" tabIndex={-1}>
                        <TableCell style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"} >
            {row.fName+' '+row.lName}
                        </TableCell>
                        <TableCell  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
            {row.email}
                        </TableCell>
                        <TableCell  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
            {row.uName}
                        </TableCell>
                        <TableCell style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"} >
            {row.bDay}
                        </TableCell>
                        <TableCell className="text-capitalize" style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
            {row.role}
                        </TableCell>
                        <TableCell className="text-capitalize"  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
            {row.status}
                        </TableCell>
                        <TableCell  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
            {row.regTime}
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
      </>:<>
      <div className="mt-3 rounded border mx-auto" style={{width:'90%',height:'auto',minHeight:'2.5rem'}}>
      <TextField
        placeholder="Search a user by name"
        id="outlined-start-adornment"
        size="small"
        InputProps={{
           endAdornment: <InputAdornment position="end">
           <AiOutlineSearch  />
           </InputAdornment>,
        }}
        style={{width:'100%'}}
        onChange={(e)=>{
         const q=e.target.value;
         let filt=rows;
        if(q!=""){
           filt=rows.filter(row=>(row.fName+" "+row.lName).includes(q))
           setRows(filt)
        }
         else 
           setRows(init)
       }}
 />
</div>
<div>
        <button className="ms-auto m-1 d-block btn float-right btn-secondary" variant="outlined" endIcon={<GrRefresh />} style={{textTransform:"none"}} onClick={()=>{fetchAccounts();setIsFetching(true)}}>Refresh List</button>
        <p className="pb-5 m-0 text-center pt-2 fs-6">No Entry Found!</p>
      </div>
      </>
      )
    );
 
};

