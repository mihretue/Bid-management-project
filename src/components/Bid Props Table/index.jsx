import React, { useState,useEffect } from "react";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import {BsFillCircleFill} from 'react-icons/bs'
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import {useNavigate, useParams} from "react-router-dom";
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
      id: 'nane', 
      label: 'Applicant Name',
       align: 'center'
    },
    { id: 'payment',
     label: 'Bid Security Payment',
      align: 'center'
  },
    {
      id: 'time',
      label: 'Application Time ',
      align: 'center',
    },
    {
      id: 'status',
      label: 'Bidder Status',
      align: 'center',
    }
  ];
  
  export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [bids,setBids]=useState([]);
    const [init,setInit]=useState([]);
    const [bidding,setBidding]=useState([]);
    const [isFetching,setIsFetching]=useState(false)
    const [errorFetching,setErrorFetching]=useState(false)
    const navigate=useNavigate();
    const {id}=useParams()
    useEffect(()=>{
      fetchBids();
    },[])
    const fetchBidding=()=>{
      fetch('http://localhost:3001/getbiddingall')
      .then((res)=>res.json())
      .then((res)=>{
        setBidding(res.filter((r)=>{return bids.some(bidItem=>bidItem._id==r.bidId)}))
        setInit(res.filter((r)=>{return bids.some(bidItem=>bidItem._id==r.bidId)}))
        setIsFetching(false)
      })
      .catch((err)=>{console.log(err);setErrorFetching(true)})
        }
      const fetchBids=()=>{
          setIsFetching(true)
          fetch('http://localhost:3001/getbids',{
            method:'post',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({ent:JSON.parse(localStorage.getItem('user')).pBody})
          })
          .then(res=>res.json())
          .then((res)=>{
            setBids(res)
            fetchBidding()
          })
          .catch((err)=>{
            setBids([])
            setErrorFetching(true)
          })
        }

    const handleChangePage = (newPage) => {
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
            <Button onClick={()=>{fetchBids();setIsFetching(true);setErrorFetching(false)}} style={{textTransform:'none'}} color="secondary" className="mt-3" variant="outlined" size="small" endIcon={<BsArrowCounterclockwise />}>Refresh</Button>
           </div>
           :
           <div style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
              <CircularProgress size="1.5rem" color="secondary"/>
              <p style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',margin:"0",textAlign:'center'}}>Fetching Bids...</p>
           </div>
    }</div>
        :(bidding.length==0?
          <>
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
         let filt=bidding;
        if(q!=""){
           filt=bidding.filter(bid=>(bid.fName+" "+bid.lName).includes(q))
           setBidding(filt)
        }
         else 
           setBidding(init)
       }}
 />
</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderTopLeftRadius:'inherit',borderTopRightRadius:'inherit',backgroundColor:'white',width:'100%',height:'3rem',padding:'1rem'}}>
            <Button variant="outlined" className="ms-auto" endIcon={<GrRefresh />} style={{textTransform:"none"}} onClick={()=>{fetchBids();setIsFetching(true)}}>Refresh</Button>
         </div> 
          <div className="container border rounded">
            <p className="text-center m-0 p-3">Empty!</p>
          </div>
          </>
          :
      <>
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
         let filt=bidding;
        if(q!=""){
           filt=bidding.filter(bid=>(bid.fName+" "+bid.lName).includes(q))
           setBidding(filt)
        }
         else 
           setBidding(init)
       }}
 />
</div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottom:'0.1rem solid green',borderTopLeftRadius:'inherit',borderTopRightRadius:'inherit',backgroundColor:'white',width:'100%',height:'3rem',padding:'1rem'}}>
        <Button variant="outlined" className="ms-auto" endIcon={<GrRefresh />} style={{textTransform:"none"}} onClick={()=>{fetchBids();setIsFetching(true)}}>Refresh</Button>
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
              bidding.map((bid) => {
                return (
                  <TableRow onClick={()=>{navigate(`./${bid._id}`)}} style={{cursor:'pointer',fontSize:'0.8rem',minHeight:'1rem'}} key={bid.id}  hover role="checkbox" tabIndex={-1}>
                        <TableCell style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"} >
            {bid.bidderName}
                        </TableCell>
                        <TableCell  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
            {bid.bidSecPayment}
                        </TableCell>
                        <TableCell style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"} >
            {bid.appTime}
                        </TableCell>
                        <TableCell  style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"}>
            {bid.bidderStatus}
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
    );
 
};

