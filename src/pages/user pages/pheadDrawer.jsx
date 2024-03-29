import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Pane, Tablist, Tab, Paragraph } from 'evergreen-ui'
import {FaListAlt} from 'react-icons/fa'
import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react'
import {GrInProgress} from 'react-icons/gr'
import {MdOutlineCancelPresentation} from 'react-icons/md'
import {MdAssignmentAdd} from "react-icons/md"
import {AiOutlineFileDone} from 'react-icons/ai'
export default function PheadDrawer() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const tabs = React.useMemo(() => ['Manage Tenders', 'Me'], [])
  const {id} =useParams();
  const [user,setUser]=useState({})
  const [isFetching,setIsFetching]=useState(false)
  const [errorFetching,setErrorFetching]=useState(false)
  const navigate = useNavigate();
  const [bids,setBids]=useState([]);
  const [BidsisFetching,setBidsIsFetching]=useState(true)
  const [errorBidsFetching,setErrorBidsFetching]=useState(false)
  const [Cbids,setCBids]=useState([]);
  const [CBidsisFetching,setCBidsIsFetching]=useState(false)
  const [errorCBidsFetching,setErrorCBidsFetching]=useState(false)
  const [ACbids,setAcBids]=useState([]);
  const [AcBidsisFetching,setAcBidsIsFetching]=useState(false)
  const [errorAcBidsFetching,setErrorAcBidsFetching]=useState(false)
  const [Clbids,setClBids]=useState([]);
  const [ClBidsisFetching,setClBidsIsFetching]=useState(false)
  const [errorClBidsFetching,setErrorClBidsFetching]=useState(false)
  const fetchBids=()=>{
    setBidsIsFetching(true)
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
      console.log(res)
      setBidsIsFetching(false)
    })
    .catch((err)=>{
      setBids([])
      setErrorBidsFetching(true)
    })
  }

  const fetchCancelledBids=()=>{
    setCBidsIsFetching(true)
    fetch('http://localhost:3001/getbids/cancelled',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({ent:JSON.parse(localStorage.getItem('user')).pBody})
    })
    .then(res=>res.json())
    .then((res)=>{
      setCBids(res)
      console.log(res)
      setCBidsIsFetching(false)
    })
    .catch((err)=>{
      setCBids([])
      setErrorCBidsFetching(true)
    })
  }

  const fetchActiveBids=()=>{
    setAcBidsIsFetching(true)
    fetch('http://localhost:3001/getbids/active',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({ent:JSON.parse(localStorage.getItem('user')).pBody})
    })
    .then(res=>res.json())
    .then((res)=>{
      setAcBids(res)
      console.log(res)
      setAcBidsIsFetching(false)
    })
    .catch((err)=>{
      setCBids([])
      setErrorAcBidsFetching(true)
    })
  }

  const fetchClosedBids=()=>{
    setAcBidsIsFetching(true)
    fetch('http://localhost:3001/getbids/closed',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({ent:JSON.parse(localStorage.getItem('user')).pBody})
    })
    .then(res=>res.json())
    .then((res)=>{
      setClBids(res)
      setClBidsIsFetching(false)
    })
    .catch((err)=>{
      setClBids([])
      setErrorClBidsFetching(true)
    })
  }

  useEffect(()=>{
    fetchUserData();fetchBids();fetchCancelledBids();fetchActiveBids();fetchClosedBids()
 },[])
 const fetchUserData=()=>{
     setIsFetching(true)
     fetch(`http://localhost:3001/userbyid/${id}`)
     .then((res)=>res.json())
     .then((res)=>{
       setUser(res)
    //    console.log(res)
       setIsFetching(false)
     })
    //  .catch((err)=>{setIsFetching(false);setErrorFetching(true)})
   }

  return (
    <Pane className='row p-3 container mb-5 mx-auto shadow border rounded pb-5' style={{height:'auto'}}>
      <Tablist className="col-md-3 col-12" style={{height:'auto'}}>
        {tabs.map((tab, index) => {
          return (
            <Tab
              aria-controls={`panel-${tab}`}
              direction="vertical"
              isSelected={index === selectedIndex}
              key={tab}
              onSelect={() => setSelectedIndex(index)}
              className='mt-1'
            >
               {tab}
            </Tab>
          )
        })}
          <div className='d-none d-md-flex flex-column mb-5 justify-content-center align-items-center' style={{marginTop:'17rem',height:'5rem'}}>
          <h6 className='text-center'>{JSON.parse(localStorage.getItem('user')).name}</h6>
          <p className='fs-9 m-0 text-break text-center'>{JSON.parse(localStorage.getItem('user')).email}</p>
          <p className='fs-9 m-0 text-break text-center'>Procurement Department Head at : </p>
          <p className='fs-9 m-0 text-break text-center fw-bold'>{JSON.parse(localStorage.getItem('user')).pBody}</p>
         </div>
        
      </Tablist>
      <Pane className="col-md-9 col-12 panew" style={{height:'auto'}}>
        {tabs.map((tab, index) => (
          <Pane
            aria-labelledby={tab}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? 'inline-block' : 'none'}
            key={tab}
            role="tabpanel"
            className='container-fluid'
          >
            {tab=="Manage Tenders"?
            <div className='w-100' style={{minHeight:'10rem',height:"auto"}}>
               <h3 id='pro' className='m-0 text-center fs-6'>Manage Tenders</h3>
               <div className='row g-3 justify-between container-fluid my-3 mx-auto' style={{minHeight:'10rem',height:'auto'}}>
               <div id='pro' onClick={() => {navigate(`/userpage/phead/${id}/manage-bids/post-bid`)}} style={{cursor:"pointer"}}  className='cursor-pointer col-12 d-flex flex-column align-items-center justify-content-center'>
                    <MdAssignmentAdd style={{width:'3rem',height:'3rem',color:'#2fdb18'}} />
                    <p className='m-0 fs-6 text-center'>Post Tender</p>
                 </div>
                 <div id='pro' onClick={()=>{navigate(`/userpage/phead/${id}/manage-bids/all-bids`)}} style={{cursor:"pointer"}} className=  'col-6 d-flex flex-column align-items-center justify-content-center'>
                    <FaListAlt style={{width:'3rem',height:'3rem',color:'#0aa0f7'}} />
                    <p className='m-0 fs-6 text-center'>All Tenders</p>
                 </div>
                 <div id='pro' onClick={()=>{navigate(`/userpage/phead/${id}/manage-bids/active-bids`)}} style={{cursor:"pointer"}} className= ' col-6 d-flex flex-column align-items-center justify-content-center'>
                    <GrInProgress style={{width:'3rem',height:'3rem',color:'red'}} />
                    <p className='m-0 fs-6 text-center'>Active Tenders</p>
                 </div>
                 <div id='pro' onClick={()=>{navigate (`/userpage/phead/${id}/manage-bids/cancelled-bids`)}} style={{cursor:"pointer"}} className= 'ms-md-0 col-6  d-flex flex-column align-items-center justify-content-center'>
                    <MdOutlineCancelPresentation style={{width:'4rem',height:'4rem',color:"red"}} />
                    <p className='m-0 fs-6 text-center ' >Cancelled Tenders</p>
                 </div>
                 <div id='pro' onClick={()=>{navigate (`/userpage/phead/${id}/manage-bids/closed-bids`)}} style={{cursor:"pointer"}} className= 'ms-md-0 col-6  d-flex flex-column align-items-center justify-content-center'>
                    <AiOutlineFileDone  style={{width:'4rem',height:'4rem',color:'#e04d0d'}} />
                    <p className='m-0 fs-6 text-center'>Closed Tenders</p>
                 </div>
               </div>
            </div>
            :
            (tab=="Me"?
            <div className='w-100' style={{minHeight:'10rem',height:"auto"}}>
              <h3 className='m-0 text-center fs-6 mt-1'>Me</h3>
              <div className='container mx-auto d-flex flex-column justify-content-center align-items-center' style={{minHeight:'10rem',height:'auto'}}>
                <ul className='list-unstyled mt-3 w-100 row gap-3'>
                  <div className='col col-md-6 shadow col-sm-12 border rounded border-success' style={{width:'12rem'}}>
                  <li className='card-body'><span style={{fontFamily:"'Adamina',serif"}}>Total Tenders </span> <br/><p className='m-0 fw-bold card-text d-inline'>{BidsisFetching?"fetching":(errorBidsFetching?"error fetching":bids.length)}</p></li>
                  </div>
                  <div className='col col-md-6 col-sm-12  border rounded border-success shadow align-item-right justify-content-right' style={{width:'12rem',}}>
                    <li className='card-body'><span style={{fontFamily:"'Adamina',serif"}}> Your Active Tenders </span> <br/><p className='m-0 fw-bold d-inline'>{AcBidsisFetching?"fetching":(errorAcBidsFetching?"error fetching":ACbids.length)}</p></li>
                  </div>
                  <div className='col col-md-6 col-sm-12 border rounded border-danger shadow ' style={{width:'12rem',}}>
                    <li className='card-body'><span style={{fontFamily:"'Adamina',serif"}}>Cancelled Tenders </span>  <br/><p className='m-0 fw-bold d-inline'>{CBidsisFetching?"fetching":(errorCBidsFetching?"error fetching":Cbids.length)}</p></li>
                  </div>
                  <div className='col col-md-6 col-sm-12  border rounded border-success shadow' style={{width:'12rem'}} >
                    <li className='card-body' ><span style={{fontFamily:"'Adamina',serif"}}> Closed Tenders  </span><br/><p className='m-0 fw-bold d-inline'>{ClBidsisFetching?"fetching":(errorClBidsFetching?"error fetching":Clbids.length)}</p></li>
                  </div>
                </ul><hr className='w-100' />
                <h5 className='mt-4' style={{fontFamily:"'Titillium Web', sans-serif"}}>Account Status : 
                <p className={user.status=="active"?'m-0 ms-2 d-inline text-success':'m-0 ms-2 d-inline text-danger'} style={{fontFamily: "'Playfair Display', serif"}}>{user.status}</p>
                </h5>
              </div>
            </div>:
            (tab=="Other"?
            <p>heh</p>:
            <p>hi</p>))}
          </Pane>
          
        ))}
      </Pane>
    </Pane>
  )
}
