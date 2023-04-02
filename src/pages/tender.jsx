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
import { Link } from "react-router-dom";
import {IoIosArrowBack} from 'react-icons/io'
const columns = [
    { 
        id: 'id', 
        label: 'Procurement Information',
        align: 'start',
       
      }
  ]



const Tender = () => {
useEffect(()=>{document.title='Cheretanet | Tender Details'},[])
useEffect(()=>{fetchTenderDetails()},[])
const [tender,setTender]=useState({})
const [rows,setRows]=useState([])
const [rows2,setRows2]=useState([])
const [rows3,setRows3]=useState([
  {title:'Valid tax clearance certificate', Information:'Having been submitted valid tax clearance certificate issued by the tax authority (Domestic Bidders Only) in accordance with ITB Clause 4.6 '},
  {title:'Conflict of Interest', Information:' No conflict of interest as described in ITB Clause 6.'},
  {title:'Valid trade license or business organization registration certificate', Information:' Having been submitted valid trade license or business organization registration certificate issued by the country of establishment in accordance with ITB Clause 4.6.'},
  {title:'Debarred by decision of the FPPA', Information:' Not having been debarred by decision of the Public Procurement Agency from participating in public procurements for breach of its obligation under previous contracts in accordance with ITB Clause 4.3.'},
  {title:'Form Data on Joint Ventures', Information:'In the case of a bid submitted by a joint venture (JV), the Bidder has to submit the Form Data on Joint Ventures, the Agreement governing the formation of the joint venture, or letter of intent to form JV, including a draft agreement, in accordance with ITB Clause 4.1 '},
  {title:'Nationality', Information:' Nationality in accordance with ITB Clause 4.2.'},
  {title:'VAT registration certificate', Information:'Having been submitted VAT registration certificate issued by the tax authority (in case of contract value of Birr 200,000.00 and above) in accordance with ITB Clause 4.6. '},
  {title:'Government Owned Entity', Information:'Compliance with conditions of ITB Clause 4.4. '}
])




const fetchTenderDetails=()=>{
const a=window.location.href.split('/')[4]
  fetch(`http://localhost:3001/gettender/?id=${a}`)
  .then(res=>res.json())
  .then((res)=>{
    setTender(res)
    setRows([
  {title:'Invitation Date', Information:res.inv},
  {title:'Procurement ID', Information:res.id},
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
  })
  .catch((err)=>{
    console.log(err)
  })
}


return (
        <div className="container" style={{padding:'0rem',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
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
                          The Company has the right to cancel the bid fully.
                          </TableCell>
                    </TableRow>
            </TableBody>
            
          </Table>
        </TableContainer>
        
      </Paper>
      <Button variant="contained" color="primary" style={{margin:'2rem auto',maxWidth:'20rem'}}>
      Apply For This Bid
    </Button>
    <Link to={'/tenders'} style={{textDecoration:'none'}}>
    <Button startIcon={<IoIosArrowBack />} className="mt-0" variant="contained" color="secondary" style={{margin:'2rem auto',maxWidth:'20rem'}}>
     Back to Tenders List
    </Button></Link>
      </div>
    )
}                           
export default Tender;