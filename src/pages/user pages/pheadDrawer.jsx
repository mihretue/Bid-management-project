import React from 'react'
import ReactDOM from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { Pane, Tablist, Tab, Paragraph } from 'evergreen-ui'
import Button from '@material-ui/core/Button'
import {AiFillHome} from 'react-icons/ai'
import {FaUsersCog} from 'react-icons/fa'
import {MdOutlineManageAccounts} from 'react-icons/md'
import {AiOutlineSearch} from 'react-icons/ai'
import {IoBan} from 'react-icons/io5'
import {RiLoaderLine} from 'react-icons/ri'
import {FaUsers} from 'react-icons/fa'
import {BsArrowRight} from 'react-icons/bs'
import { Avatar } from 'evergreen-ui'
import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react'
import {GrInProgress} from 'react-icons/gr'
import {MdOutlineCancelPresentation} from 'react-icons/md'
import {MdQuestionAnswer} from 'react-icons/md'
import {BiMessageRoundedError} from 'react-icons/bi'
import {MdAssignmentAdd} from "react-icons/md"

export default function PheadDrawer() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const tabs = React.useMemo(() => ['Manage Tenders', 'Me'], [])
  const {id,uid} =useParams();
  const [user,setUser]=useState({})
  const [isFetching,setIsFetching]=useState(false)
  const [errorFetching,setErrorFetching]=useState(false)
  const navigate = useNavigate();



  useEffect(()=>{
    fetchUserData()
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
    <Pane className='row container-fluid pb-5' style={{height:'auto'}}>
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
        {isFetching?
        <div className='d-none d-md-flex flex-column justify-content-center align-items-center' style={{marginTop:'15rem',height:'5rem'}}>
           <p className='text-center text-break m-0'>Fetching Account Details...</p>
         </div>
        :
        (errorFetching?'error':
          <div className='d-none d-md-flex flex-column justify-content-center align-items-center' style={{marginTop:'15rem',height:'5rem'}}>
          <Avatar
           src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
           name="Alan Turing"
           size={40}
          />
          <h6 className='text-center'>{user.fName + " "+ user.lName}</h6>
          <p className='fs-9 m-0 text-break text-center'>{user.email}</p>
         </div>
        )}
        
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
               <div onClick={() => {navigate(`/userpage/phead/${id}/manage-bids/post-bid`)}} style={{cursor:"pointer"}}  className='cursor-pointer col-6 border rounded col-md-4 d-flex flex-column align-items-center justify-content-center'>
                    <MdAssignmentAdd style={{width:'3rem',height:'3rem'}} />
                    <p className='m-0 fs-5 text-center'>Post Tender</p>

                 </div>
                 <div onClick={()=>{navigate(`/userpage/phead/${id}/manage-bids/all-bids`)}} style={{cursor:"pointer"}} className='col-6 border rounded col-md-4 d-flex flex-column align-items-center justify-content-center'>
                    <GrInProgress style={{width:'3rem',height:'3rem'}} />
                    <p className='m-0 fs-5 text-center'>All Tenders</p>
                    <p className='m-0 fs-6'>567</p>

                 </div>
                 <div onClick={()=>{navigate (`/userpage/supplier/${id}/cancelled-bids`)}} style={{cursor:"pointer"}} className='col-6 ms-auto ms-md-0 col-md-4 border rounded   d-flex flex-column align-items-center justify-content-center'>
                    <MdOutlineCancelPresentation style={{width:'4rem',height:'4rem'}} />
                    <p className='m-0 fs-5 text-center'>Cancelled Bids</p>
                    <p className='m-0 fs-6'>23</p>

                 </div>
                 <div  onClick={()=>{ navigate (`/userpage/supplier/${id}/clarification-requests`)}} style={{cursor:"pointer"}} className='col-6  ms-md-0 col-md-6 border rounded   d-flex flex-column align-items-center justify-content-center'>
                    <MdQuestionAnswer style={{width:'4rem',height:'4rem'}} />
                    <p className='m-0 fs-5 text-center'>Bid Clarification Requests</p>
                    <p className='m-0 fs-6'>23</p>
                 </div>
                 <div onClick={()=> {navigate (`/userpage/supplier/${id}/bid-complaints`)}} style={{cursor:"pointer"}} className='col-12 ms-md-0 border col-md-6 mx-auto rounded   d-flex flex-column align-items-center justify-content-center'>
                    <BiMessageRoundedError style={{width:'4rem',height:'4rem'}} />
                    <p className='m-0 fs-5 text-center'>Complaints Sent</p>
                    <p className='m-0 fs-6'>13</p>

                 </div>
               </div>
            </div>
            :
            (tab=="Me"?
            <p>dfd</p>:
            (tab=="Other"?
            <p>heh</p>:
            <p>hi</p>))}
          </Pane>
          
        ))}
      </Pane>
    </Pane>
  )
}
