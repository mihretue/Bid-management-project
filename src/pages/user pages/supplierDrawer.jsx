import React from 'react'
import { Link } from 'react-router-dom'
import { Pane, Tablist, Tab} from 'evergreen-ui'
import {BsArrowRight} from 'react-icons/bs'
import { Avatar } from 'evergreen-ui'
import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react'
import {GrInProgress} from 'react-icons/gr'
import {MdOutlineCancelPresentation} from 'react-icons/md'
import {MdQuestionAnswer} from 'react-icons/md'
import {BiMessageRoundedError} from 'react-icons/bi'

export default function SupplierDrawer() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const tabs = React.useMemo(() => ['Manage Bids', 'Me'], [])
  const {id} =useParams();
  const [user,setUser]=useState({})
  const [isFetching,setIsFetching]=useState(false)
  const [errorFetching,setErrorFetching]=useState(false)



  useEffect(()=>{
    fetchUserData()
 },[])
 const fetchUserData=()=>{
     setIsFetching(true)
     fetch(`http://localhost:3001/userbyid/${id}`)
     .then((res)=>res.json())
     .then((res)=>{
       setUser(res)
       console.log(res)
       setIsFetching(false)
     })
     .catch((err)=>{setIsFetching(false);setErrorFetching(true)})
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
            {tab=="Manage Bids"?
            <div className='w-100' style={{minHeight:'10rem',height:"auto"}}>
               <h3 className='m-0 text-center fs-6'>Manage Bids</h3>
               <div className='row g-3 justify-between container-fluid my-3 mx-auto' style={{minHeight:'10rem',height:'auto'}}>
                 <div className='col-6 border rounded col-md-4 d-flex flex-column align-items-center justify-content-center'>
                    <GrInProgress style={{width:'3rem',height:'3rem'}} />
                    <p className='m-0 fs-5 text-center'>Bids in Progress</p>
                    <p className='m-0 fs-6'>567</p>
                    <a className="icon-link text-decoration-underline text-black" href="/#">
                     <Link to={`/userpage/supplier/${id}/bids-in-progress`}>Show</Link>
                     <BsArrowRight className='ms-2' />
                    </a>
                 </div>
                 <div className='col-6 ms-auto ms-md-0 col-md-4 border rounded  col-md-4 d-flex flex-column align-items-center justify-content-center'>
                    <MdOutlineCancelPresentation style={{width:'4rem',height:'4rem'}} />
                    <p className='m-0 fs-5 text-center'>Cancelled Bids</p>
                    <p className='m-0 fs-6'>23</p>
                    <a className="icon-link text-decoration-underline text-black" href="/#">
                     <Link to={`/userpage/supplier/${id}/cancelled-bids`}>Show</Link>
                     <BsArrowRight className='ms-2' />
                    </a>
                 </div>
                 <div className='col-6 ms-auto ms-md-0 col-md-4 border rounded  col-md-4 d-flex flex-column align-items-center justify-content-center'>
                    <MdQuestionAnswer style={{width:'4rem',height:'4rem'}} />
                    <p className='m-0 fs-5 text-center'>Bid Clarification Requests</p>
                    <p className='m-0 fs-6'>23</p>
                    <a className="icon-link text-decoration-underline text-black" href="/#">
                     <Link to={`/userpage/supplier/${id}/clarification-requests`}>Show</Link>
                     <BsArrowRight className='ms-2' />
                    </a>
                 </div>
                 <div className='col-6 my-md-0 border col-md-4 mx-auto rounded  col-md-4 d-flex flex-column align-items-center justify-content-center'>
                    <BiMessageRoundedError style={{width:'4rem',height:'4rem'}} />
                    <p className='m-0 fs-5 text-center'>Complaints Sent</p>
                    <p className='m-0 fs-6'>13</p>
                    <a className="icon-link text-decoration-underline text-black" href="/#">
                      <Link to={`/userpage/supplier/${id}/bid-complaints`}>Show</Link>
                     <BsArrowRight className='ms-2' />
                    </a>
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
