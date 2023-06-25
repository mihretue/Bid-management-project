import React, { useState,useEffect } from "react";
import TableContainer from '@mui/material/TableContainer';
import {BsFillCircleFill} from 'react-icons/bs'
import Table from '@mui/material/Table';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {AiOutlineSearch} from 'react-icons/ai'
import TablePagination from '@mui/material/TablePagination';
import { useNavigate} from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import {BiError} from 'react-icons/bi'
import Button from '@mui/material/Button';
import {BsArrowCounterclockwise} from 'react-icons/bs'
import {GrRefresh} from 'react-icons/gr'
import { dateconverter } from "../../services/date converter";
  const columns = [
    { 
      id: 'open', 
      label: 'Activity',
       align: 'center'
    },
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
    },{
      id: 'status',
      label: 'Status',
      align: 'center',
    },
  ];
  
  export default function StickyHeadTable({search}) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rows,setRows]=useState([]);
    const [init,setInit]=useState([]);
    const [isFetching,setIsFetching]=useState(true)
    const [errorFetching,setErrorFetching]=useState(false)
    const [sortBy,setSortBy]=useState("Invitation Date")
    const navigate=useNavigate();
    useEffect(()=>{
      fetchTenders();
    },[])

    const fetchTenders=()=>{
      setIsFetching(true)
      fetch('http://localhost:3001/gettenders',{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({sortBy:sortBy})
      })
      .then(res=>res.json())
      .then((res)=>{
        setRows(res)
        setInit(res)
        console.log(res)
        setIsFetching(false)
      })
      .catch((err)=>{
        setRows([])
        setErrorFetching(true)
        console.log(err)

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
            <Button onClick={fetchTenders} style={{textTransform:'none'}} color="secondary" className="mt-3" variant="outlined" size="small" endIcon={<BsArrowCounterclockwise />}>Refresh</Button>
           </div>
           :
           <div style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
              <CircularProgress size="1.5rem" color="secondary"/>
              <p style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',margin:"0",textAlign:'center'}}>Fetching Tenders List...</p>
           </div>
    }</div>
        :<>
        <div className="mt-3 rounded border mx-auto" style={{width:'90%',height:'auto',minHeight:'2.5rem'}}>
        <TextField
          placeholder="Search By Title"
          id="outlined-start-adornment"
          size="small"
          InputProps={{
            endAdornment: <InputAdornment position="end">
                <AiOutlineSearch  />
            </InputAdornment>,
          }}
          style={{width:'100%',margin:'auto'}}
          onChange={(e)=>{
            const q=e.target.value;
            let filt=rows;
           if(q!=""){
              filt=rows.filter(row=>row.title.includes(q))
              setRows(filt)
           }
            else 
              setRows(init)
          }}
        />
    </div>
      <div style={{display:'flex',justifyContent:'end',alignItems:'center',borderBottom:'0.1rem solid green',borderTopLeftRadius:'inherit',borderTopRightRadius:'inherit',backgroundColor:'white',width:'100%',height:'3rem',padding:'1rem'}}>
         <Button variant="outlined" endIcon={<GrRefresh />} style={{textTransform:"none"}} onClick={()=>{fetchTenders();setIsFetching(true)}}>Refresh</Button>
      </div>  
      <Paper sx={{maxWidth: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{height:'auto'}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="border-bottom border-left border-success"
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
                  <TableRow key={row._id} onClick={()=>{navigate(`./${row._id}`)}} style={{cursor:'pointer',fontSize:'0.8rem',minHeight:'1rem'}} hover role="checkbox" tabIndex={-1}>
                       <TableCell className={dateconverter(row.open,"tenders")=="past"&&"text-white bg-primary"}  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"} >
                          {dateconverter(row.open,"tenders")=="now"?"Opened recently":(dateconverter(row.open,"tenders")=="past"?(row.status=="cancelled" || rows.status=="closed"?row.status:"Open"):"Not Open Yet")}
                        </TableCell>
                        <TableCell  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"} >
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
                        <TableCell  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
            {row.status=="active"?<p className="m-0"><BsFillCircleFill className="me-1" color="green" />{row.status}</p>:<p className="m-0 text-danger">{row.status}</p>}
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
      </>
    );
 
};

