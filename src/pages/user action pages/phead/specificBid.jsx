import React, { useState,useEffect } from "react";
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link,useNavigate,useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import {BiError} from 'react-icons/bi'
import { Pane, Dialog} from 'evergreen-ui'
import {BsArrowCounterclockwise} from 'react-icons/bs'
import {BsArrowLeft} from 'react-icons/bs'
import { Button,EditIcon,TrashIcon,TickIcon,ManualIcon,PersonIcon,ArchiveIcon } from 'evergreen-ui'
import Footer from '../../../components/footer'
const columns = [
    { 
        id: 'id', 
        label: 'Procurement Information',
        align: 'start',
       
      }
  ]
const SpecificBid = () => {
const navigate=useNavigate()
const {id,uid} =useParams();
const [isShown, setIsShown] = useState(false)
useEffect(()=>{document.title='Cheretanet | SpecificBid Information'},[])
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
const [isFetching,setIsFetching]=useState(true)
const [errorFetching,setErrorFetching]=useState(false)
const [isCancelling,setIsCancelling]=useState(false)
const [errorCancelling,setErrorCancelling]=useState(false)
const {bid}=useParams()

const fetchTenderDetails=()=>{

  fetch(`http://localhost:3001/gettender/?id=${bid}`)
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
  setIsFetching(false)
  })
  .catch((err)=>{
    setErrorFetching(true)
  })
}

const cancelTender=()=>{
  setIsCancelling(true)
  fetch(`http://localhost:3001/canceltender/${bid}`)
  .then(res=>res.json())
  .then((res)=>{
    setIsCancelling(false)
    if(res.res=="ok"){
       navigate(`/userpage/phead/${id}/manage-bids/all-bids`)
    }else{
      setErrorCancelling(true)
    }
  })
  .catch((err)=>{
    setErrorCancelling(true)
  })
}


return (<>
    <div className="container p-2 w-100 fluid" style={{minHeight:'2rem'}}>
               <a className="icon-link text-decoration-none text-black">
                <BsArrowLeft className='me-2' />
                <Link className="text-decoration-none" to={`/userpage/phead/${id}/manage-bids/all-bids`}>Back to All Bids</Link>
               </a>
    </div>
    {isFetching?
        <div className="mb-5 container" style={{border:'1px solid black',borderRadius:'0.5rem',maxWidth:"90%",height:'auto',backgroundColor:'white',margin:'2rem auto'}}>
           {errorFetching?
           <div style={{minHeight:'10rem',display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
             <BiError size="1.5rem" />
             <p style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',margin:"0",textAlign:'center',color:'red'}}>An Error Occurred!</p>
            <Button onClick={()=>{fetchTenderDetails();setIsFetching(true);setErrorFetching(false)}} style={{textTransform:'none'}} color="secondary" className="mt-3" variant="outlined" size="small" endIcon={<BsArrowCounterclockwise />}>Try Again</Button>
           </div>
           :
           <div style={{minHeight:'10rem',display:'flex',flexDirection:"column",justifyContent:'center',alignItems:'center'}}>
              <CircularProgress size="1.5rem" color="secondary"/>
              <p style={{fontFamily:'Noto Sans Ethiopic,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol',margin:"0",textAlign:'center'}}>Fetching Bid Information...</p>
           </div>
    }</div>
       :
      <div className="container mb-5" style={{padding:'0rem',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h4 className="text-center">Tender Details</h4>
        <Paper className="mt-3" sx={{ width: '90%',margin:'auto', overflow: 'hidden',border:'0.1rem solid gray' }}>
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
      <Paper className="mt-3 mb-3" sx={{ width: '90%',margin:'auto', overflow: 'hidden',border:'0.1rem solid gray' }}>
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
      <hr className=" w-100" />
      <div className="container d-flex flex-column justify-content-center align-items-center rounded mt-1 " style={{width:'90%',minHeight:'5rem',height:'auto',fontFamily:"'Adamina', serif'"}}>
        <h5 className="mt-0">Tender Status : 
          {tender.status=="active"&&<p className="m-0 d-inline text-success"> {tender.status}</p>}
          {tender.status=="cancelled"&&<p className="m-0 d-inline text-danger"> {tender.status}</p>}
          {tender.status=="closed"&&<p className="m-0 d-inline text-primary"> {tender.status}</p>}
        </h5>
        <h6 className="text-center mt-1 ">Actions</h6>
        <div className=" justify-content-center align-items-center row g-2 mb-2 container-fluid " >
          {tender.status=="active"&&<Button onClick={()=>{navigate(`/userpage/phead/${id}/manage-bids/${bid}/post-bid-award`)}} style={{fontFamily:"'Adamina', serif'"}} className="col-12"  iconBefore={TickIcon} intent="success">
            Post Bid Award
          </Button>}
          {tender.status=="active"&&
          <Pane className="mx-auto col-23 mt-2 d-flex justify-content-center">
      <Dialog
        isShown={isShown}
        title="Confirm Action"
        onCloseComplete={() => setIsShown(false)}
        confirmLabel="Yes"
        onCancel={() => {setIsShown(false)}}
        onConfirm={() => {setIsShown(false);cancelTender()}}
      >
        <p>Are You Sure You Want To Cancel This Bid?</p>
        <p className="mt-3" style={{fontSize:'0.8rem'}}>Note that this can't be undone.</p>
      </Dialog>
      <Button className="col-12"   iconBefore={TrashIcon} intent="danger" onClick={() => setIsShown(true)}>Cancel Tender</Button>
          </Pane>}
          {tender.status=="closed"&&<Button onClick={()=>{navigate(`/userpage/phead/${id}/bid-awards/${bid}`)}} style={{fontFamily:"'Adamina', serif'"}} className="col-12"  iconBefore={TickIcon} intent="success">
            View Bid Award Information
          </Button>}
          <Button onClick={()=>{navigate(`/userpage/phead/${id}/manage-bids/${bid}/bid-props`)}}  className="col-12 "  iconBefore={ManualIcon}>
            View Bid Proposals 
          </Button>
        </div>
      </div>
      </div>}
      <Footer />
      </>)
}                           
export default SpecificBid;