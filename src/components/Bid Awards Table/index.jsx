import React, { useState } from "react";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import {BsFillCircleFill} from 'react-icons/bs'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useEffect } from "react";
import {useNavigate,useParams} from "react-router-dom";
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
      id: 'id', 
      label: 'Procurement ID.',
       align: 'center'
    },
    { id: 'title',
     label: 'Procurement Title',
      align: 'center'
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
    }
  ];
  
  export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [bids,setBids]=useState([]);
    const [init,setInit]=useState([]);
    const [isFetching,setIsFetching]=useState(false)
    const [errorFetching,setErrorFetching]=useState(false)
    const navigate=useNavigate();
    const {id}=useParams()
    useEffect(()=>{
      if(localStorage.getItem('user')){
        fetchBids()
      }else{
        fetchBidsPublicUser()
      }
    },[])
  
    const fetchBids=()=>{
      setIsFetching(true)
      fetch('http://localhost:3001/getbids/closed',{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({ent:JSON.parse(localStorage.getItem('user')).pBody})
      })
      .then(res=>res.json())
      .then((res)=>{
        setBids(res)
        setInit(res)
        setIsFetching(false)
      })
      .catch((err)=>{
        setBids([])
        setErrorFetching(true)
      })
    }

    const fetchBidsPublicUser=()=>{
      setIsFetching(true)
      fetch('http://localhost:3001/getbidsPU/closed')
      .then(res=>res.json())
      .then((res)=>{
        setBids(res)
        setIsFetching(false)
      })
      .catch((err)=>{
        setBids([])
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
      <div className="p-3" style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
        <CircularProgress size="1.5rem" color="secondary"/>
        <p style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',margin:"0",textAlign:'center'}}>Fetching Bids...</p>
      </div>:
        (
           errorFetching?
           <div className="p-3"  style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
             <BiError size="1.5rem" />
             <p style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',margin:"0",textAlign:'center',color:'red'}}>An Error Occurred!</p>
            <Button onClick={()=>{if(localStorage.getItem('user')){fetchBids()}else{fetchBidsPublicUser()}}} style={{textTransform:'none'}} color="secondary" className="mt-3" variant="outlined" size="small" endIcon={<BsArrowCounterclockwise />}>Refresh</Button>
           </div>
        :(bids.length==0?<>
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
            let filt=bids;
           if(q!=""){
              filt=bids.filter(bid=>bid.title.includes(q))
              setBids(filt)
           }
            else 
              setBids(init)
          }}
        />
    </div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderTopLeftRadius:'inherit',borderTopRightRadius:'inherit',backgroundColor:'white',width:'100%',height:'3rem',padding:'1rem'}}>
            <Button variant="outlined" className="ms-auto" endIcon={<GrRefresh />} style={{textTransform:"none"}} onClick={localStorage.getItem('user')?fetchBids:fetchBidsPublicUser}>Refresh</Button>
         </div> 
         <div className="container border rounded">
            <p className="text-center m-0 p-3">Empty!</p>
          </div></>
        :<>
        <div className="mt-3 rounded border mx-auto" style={{width:'90%',height:'auto',minHeight:'2.5rem'}}>
        <TextField
          placeholder="Search"
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
            let filt=bids;
           if(q!=""){
              filt=bids.filter(bid=>bid.title.includes(q))
              setBids(filt)
           }
            else 
              setBids(init)
          }}
        />
    </div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'0.1rem solid green',borderTopLeftRadius:'inherit',borderTopRightRadius:'inherit',backgroundColor:'white',width:'100%',height:'3rem',padding:'1rem'}}>
        <Button variant="outlined" className="ms-auto" endIcon={<GrRefresh />} style={{textTransform:"none"}} onClick={localStorage.getItem('user')?fetchBids:fetchBidsPublicUser}>Refresh</Button>
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
                    className="border-bottom border-success"
                    style={{fontWeight:'bold',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol'}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
             <TableBody>
              {
              bids.map((bid) => {
                return (
                  <TableRow onClick={()=>{navigate(`./${bid._id}`)}} style={{cursor:'pointer',fontSize:'0.8rem',minHeight:'1rem'}} key={bid.id}  hover role="checkbox" tabIndex={-1}>
                        <TableCell style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"} >
            {bid.id}
                        </TableCell>
                        <TableCell  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
            {bid.title}
                        </TableCell>
                        <TableCell style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"} >
            {bid.cat}
                        </TableCell>
                        <TableCell  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
            {bid.app}
                        </TableCell>
                        <TableCell  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
            {bid.dead}
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
          count={bids.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      </>)
    ));
 
};

