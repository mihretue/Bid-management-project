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
import Button from '@mui/material/Button';
import { Link,useParams } from "react-router-dom";
import {IoIosArrowBack} from 'react-icons/io'
import CircularProgress from '@mui/material/CircularProgress';
import {BiError} from 'react-icons/bi'
import {BiLinkExternal} from 'react-icons/bi'
import {BsArrowCounterclockwise} from 'react-icons/bs'
import Footer from "../components/footer";
const columns = [
    { 
        id: 'id', 
        label: 'Procurement Information',
        align: 'start',
       
      }
  ]

const Tender = () => {
useEffect(()=>{document.title='Cheretanet | Tender Information'},[])
useEffect(()=>{fetchTenderDetails()},[])
const [tender,setTender]=useState({})
const [rows,setRows]=useState([])
const [rows2,setRows2]=useState([])
const [rows3,setRows3]=useState([])
const [tc,setTc]=useState("")
const [isFetching,setIsFetching]=useState(true)
const [errorFetching,setErrorFetching]=useState(false)

const fetchTenderDetails=()=>{
const a=window.location.href.split('/')[4]
  fetch(`http://localhost:3001/gettender/?id=${a}`)
  .then(res=>res.json())
  .then((res)=>{
   console.log(res)
    setTender(res)
    setRows([
  {title:'Invitation Date', Information:res.inv},
  {title:'Procurement ID', Information:res.id},
  {title:'Procurement Title', Information:res.title},
  {title:'Procurement Category', Information:res.cat},
  {title:'Market Type', Information:res.app},
  {title:'Procurement Method', Information:'Open'},
  {title:'Site Visit Schedule', Information:res.visit},
  {title:'Bid Submission Deadline', Information:res.dead},
  {title:'Bid Opening Schedule', Information:res.ent}
])
    setRows2([
  {title:'Participation Fee', Information:res.partFee},
  {title:'Bid Security Amount', Information:res.bidSec}
])
  setRows3([{title:'Valid tax clearance certificate', Information:res.vTax},
  {title:'Conflict of Interest', Information:res.coi},
  {title:'Valid trade license or business organization registration certificate', Information:res.lic},
  {title:'Debarred by decision of the FPPA', Information:res.lg},
  {title:'Form Data on Joint Ventures', Information:res.vent},
  {title:'Nationality', Information:res.nat},
  {title:'VAT registration certificate', Information:res.vat},
  {title:'Government Owned Entity', Information:res.gow}
])
  setTc(res.tc)
  fetchBidderStatus()
  setIsFetching(false)
  })
  .catch((err)=>{
    setErrorFetching(true)
  })
}
 const {tid}=useParams()
 const [isChecking,setIsChecking]=useState(false)
 const [errorChecking,setErrorChecking]=useState(false)
 const [status,setStatus]=useState("")
 
 const fetchBidderStatus=()=>{
  let q={bid:tid,uid:JSON.parse(localStorage.getItem('user')).id}
  setIsChecking(true)
  fetch(`http://localhost:3001/checkbidder?${q}}`)
  .then((res)=>res.json())
  .then((res)=>{
     if(Object.keys(res).length==0){//bidder doesn't exist
         setStatus("not-bidding")
     }else{//bidder exists
      if(res.bidderStatus=="bidding")
         setStatus("bidding")
      else
         setStatus("not-bidding")
     }
     setIsChecking(false)
 })
  .catch((err)=>{
     setErrorChecking(true)
  })
 }

return (<>
  <Link to={'/tenders'} style={{textDecoration:'none'}}>
     <button style={{margin:'0 0 1rem 10%'}} type="button" className="btn btn-primary">
     Back To Tenders List</button>
  </Link>
    {isFetching?<>
      <div className="container mb-5" style={{border:'1px solid black',borderRadius:'0.5rem',maxWidth:"90%",height:'auto',backgroundColor:'white',margin:'2rem auto'}}>
           {errorFetching?<>
           <div className="mb-5" style={{minHeight:'10rem',display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
             <BiError size="1.5rem" />
             <p style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',margin:"0",textAlign:'center',color:'red'}}>An Error Occurred!</p>
            <Button onClick={()=>{fetchTenderDetails();setIsFetching(true);setErrorFetching(false)}} style={{textTransform:'none'}} color="secondary" className="mt-3" variant="outlined" size="small" endIcon={<BsArrowCounterclockwise />}>Try Again</Button>
           </div><Footer /></>
           :
           <div style={{minHeight:'10rem',display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
              <CircularProgress size="1.5rem" color="secondary"/>
              <p style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',margin:"0",textAlign:'center'}}>Fetching Tender Information...</p>
           </div>
    }</div><Footer /></>
       :<>
      <div className="container mb-5" style={{padding:'0rem',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <Paper sx={{ width: '90%',margin:'auto', overflow: 'hidden',border:'0.1rem solid gray' }}>
        <TableContainer sx={{ height:'auto'  }}>
          <Table stickyHeader aria-label="sticky table">
         <TableHead >
              <TableRow >
                  <TableCell
                    align={'start'}
                    colSpan={2}
                    className="border-success border-bottom"
                    style={{fontWeight:'bold',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol'}}
                  >
                    {"Tender Information"}
                  </TableCell>
              </TableRow>
            </TableHead>
             <TableBody>
              {rows.map((row) => {
                  return (
                    <TableRow style={{fontSize:'0.8rem',minHeight:'1rem'}} key={row.id}  hover role="checkbox" tabIndex={-1}>
                          <TableCell style={{fontWeight:'bold',width:'35%',borderRight:'0.1rem solid gray',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"} >
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
      <Paper className="mt-3" sx={{ width: '90%',margin:'auto', overflow: 'hidden',border:'0.1rem solid gray' }}>
        <TableContainer sx={{ height:'auto' }}>
          <Table stickyHeader aria-label="sticky table">
         <TableHead >
              <TableRow >
                  <TableCell
                    align={'start'}
                    colSpan={2}
                    className="border-success border-bottom"
                    style={{fontWeight:'bold',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol'}}
                  >
                    {"Required Payments"}
                  </TableCell>
              </TableRow>
            </TableHead>
             <TableBody>
              {rows2.map((row) => {
                  return (
                    <TableRow style={{fontSize:'0.8rem',minHeight:'1rem'}} key={row.id}  hover role="checkbox" tabIndex={-1}>
                          <TableCell style={{fontWeight:'bold',width:'35%',borderRight:'0.1rem solid gray',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"} >
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
      <Paper className="mt-3" sx={{ width: '90%',margin:'auto', overflow: 'hidden',border:'0.1rem solid gray' }}>
        <TableContainer sx={{ height:'auto' }}>
          <Table stickyHeader aria-label="sticky table">
         <TableHead >
              <TableRow >
                  <TableCell
                    align={'start'}
                    colSpan={2}
                    className="border-success border-bottom"
                    style={{fontWeight:'bold',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol'}}
                  >
                    {"Eligibility Documents"}
                  </TableCell>
              </TableRow>
            </TableHead>
             <TableBody>
              {rows3.map((row) => {
                  return (
                    <TableRow style={{fontSize:'0.8rem',minHeight:'1rem'}} key={row.id}  hover role="checkbox" tabIndex={-1}>
                          <TableCell style={{fontWeight:'bold',width:'35%',borderRight:'0.1rem solid gray',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"} >
              {row.title}
                          </TableCell>
                          <TableCell  style={{align:'start',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}}>
              {row.Information}
                          </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Paper className="mt-3" sx={{ width: '90%',margin:'auto', overflow: 'hidden',border:'0.1rem solid gray' }}>
        <TableContainer sx={{ height:'auto' }}>
          <Table stickyHeader aria-label="sticky table">
         <TableHead >
              <TableRow >
                  <TableCell
                    align={'start'}
                    colSpan={2}
                    className="border-success border-bottom"
                    style={{fontWeight:'bold',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol'}}
                  >
                    {"Notice"}
                  </TableCell>
              </TableRow>
            </TableHead>
             <TableBody>
                    <TableRow style={{fontSize:'0.8rem',minHeight:'1rem'}}  hover role="checkbox" tabIndex={-1}>
                          <TableCell style={{fontWeight:'bold',width:'35%',borderRight:'0.1rem solid gray',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}} align={"center"} >
              Terms and Conditions
                          </TableCell>
                          <TableCell  style={{align:'start',fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',fontSize:'inherit'}}>
                          {tc}
                          </TableCell>
                    </TableRow>
            </TableBody>
            
          </Table>
        </TableContainer>
        
      </Paper>
      <Link to={status=="not-bidding"?`./apply/bid-document/`:'#'} target="about"> 
      <Button disabled={isChecking?true:(errorChecking?true:(status=="bidding"?true:false))} endIcon={status=="not-bidding"&&<BiLinkExternal />} variant="contained" color="primary" style={{margin:'2rem auto',maxWidth:'20rem',textTransform:'none'}}>
      {isChecking?"Checking Status...":(errorChecking?"Some Error Occurred":(status=="bidding"?"You have applied for this bid":"Apply For This Bid"))}
    </Button></Link> 
      </div>
      <Footer /></>}
      </>)
}                           
export default Tender;