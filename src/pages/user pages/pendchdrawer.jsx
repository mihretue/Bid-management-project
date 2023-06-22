import React from 'react'
import ReactDOM from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { Pane, Tablist, Tab} from 'evergreen-ui'
import {FaListAlt} from 'react-icons/fa'
import { Avatar } from 'evergreen-ui'
import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react'
import {GrInProgress} from 'react-icons/gr'
import {MdOutlineCancelPresentation} from 'react-icons/md'
import {MdQuestionAnswer} from 'react-icons/md'
import {BiMessageRoundedError} from 'react-icons/bi'
import {MdAssignmentAdd} from "react-icons/md"
import {AiOutlineFileDone} from'react-icons/ai'

export default function PendchDrawer() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const tabs = React.useMemo(() => ['Manage Tenders', 'Me'], [])
  const {id,uid} =useParams();
  const [isFetching,setIsFetching]=useState(false)
  const [errorFetching,setErrorFetching]=useState(false)
  const navigate = useNavigate();
  const [bids,setBids]=useState([]);
  useEffect(()=>{
 fetchBids()},[])

const fetchBids=()=>{
  let q={pBody:JSON.parse(localStorage.getItem('user')).pBody,approved:true}
  q=new URLSearchParams(q)
  fetch(`http://localhost:3001/tenderbypropp?${q}`)
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

  return (
    <Pane className='row mx-auto p-3 mb-5 border shadow rounded container pb-5' style={{height:'auto'}}>
      <Tablist className="col-md-3 col-12" style={{height:'auto'}}>
        {tabs.map((tab, index) => {
          return (
            <Tab
              aria-controls={`panel-${tab}`}
              direction="vertical"
              isSelected={index === selectedIndex}
              key={tab}
              onSelect={() => setSelectedIndex(index)}
             
            >
               {tab}
            </Tab>
          )
        })}
          <div className='d-none d-md-flex flex-column justify-content-center align-items-center' style={{marginTop:'10rem',minHeight:'5rem'}}>
          <h6 className='text-center'>{JSON.parse(localStorage.getItem('user')).name}</h6>
          <p className='fs-9 m-0 text-break text-center'>{JSON.parse(localStorage.getItem('user')).email}</p>
          <p className='fs-9 m-0 text-break text-center'>Procurement Endorsing Committee Head at : </p>
          <p className='fs-9 m-0 text-break text-center fw-bold'>{JSON.parse(localStorage.getItem('user')).pBody}</p>
         </div>
      </Tablist>
      <Pane className="col-md-9 col-12 " style={{height:'auto'}}>
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
              <h3 className='m-0 text-center fs-6'>Manage Bids</h3>
              <div className='row g-3 justify-between container-fluid my-3 mx-auto' style={{minHeight:'10rem',height:'auto'}}>
              <div id='pro' onClick={() => {navigate(`/userpage/pendch/${id}/approval-requests`)}} style={{cursor:"pointer"}}  className='cursor-pointer col-12  col-md-6 d-flex flex-column align-items-center justify-content-center'>
                    <MdAssignmentAdd style={{width:'3rem',height:'3rem',color:'#aaf507'}} />
                    <p className='m-0 fs-6 text-center'>Bid Approval Requests</p>
                </div>
              <div id='pro' onClick={()=>{navigate(`/userpage/pendch/${id}/approved-tenders`)}} style={{cursor:"pointer"}} className='col-12  col-md-6 d-flex flex-column align-items-center justify-content-center'>
                    <AiOutlineFileDone  style={{width:'4rem',minHeight:'4rem',color:'#e04d0d'}} />
                    <p className='m-0 fs-6 text-center text-break'>Approved Tenders</p>
                </div>
              </div>
            </div>
            :
            (tab=="Me"?
            <div className='w-100' style={{minHeight:'10rem',height:"auto"}}>
               <h3 className='m-0 text-center fs-6 mt-1'>Me</h3>
               <div className='mx-auto d-flex flex-column justify-content-center align-items-center' style={{minHeight:'10rem',height:'auto'}}>
                 <ul className='list-unstyled mt-3 w-100'>
                   <li>Your Approved Tenders : <p className='m-0 fw-bold d-inline'>{isFetching?"Fetching...":(errorFetching?"Some Error Occurred":bids.length)}</p></li>
                   <li></li>
                 </ul><hr className='w-100' />
                 <h5 className='mt-4'>Account Status : 
                 <p className={JSON.parse(localStorage.getItem('user')).status=="active"?'m-0 ms-2 d-inline text-success':'m-0 ms-2 d-inline text-danger'}>{JSON.parse(localStorage.getItem('user')).status}</p>
                 </h5>
               </div>
            </div>:
            <p>heh</p>)
            }
          </Pane>
          
        ))}
      </Pane>
    </Pane>
  )
}
