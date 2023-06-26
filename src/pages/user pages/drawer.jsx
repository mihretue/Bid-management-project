import React from 'react'
import ReactDOM from 'react-dom'
import {useNavigate } from 'react-router-dom'
import { useState,useEffect  } from 'react'
import { Pane, Tablist, Tab } from 'evergreen-ui'
import {IoBan} from 'react-icons/io5'
import {RiLoaderLine} from 'react-icons/ri'
import {FaUsers} from 'react-icons/fa'
import {RiUserStarLine} from 'react-icons/ri'

export default function SidebarTabsExample() {

  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const tabs = React.useMemo(() => ['Manage User Accounts', 'Analytics'], [])
  const [isFetching,setIsFetching]=useState(false)
  const [errorFetching,setErrorFetching]=useState(false)
  const [ApisFetching,setApIsFetching]=useState(false)
  const [AperrorFetching,setApErrorFetching]=useState(false)
  const [BisFetching,setBIsFetching]=useState(false)
  const [BerrorFetching,setBErrorFetching]=useState(false)
  const [AisFetching,setAIsFetching]=useState(false)
  const [AerrorFetching,setAErrorFetching]=useState(false)
  const [Aplength,setApLength]=useState(0)
  const [Blength,setBLength]=useState(0)
  const [length,setLength]=useState(0)
  const [Alength,setALength]=useState(0)
  const navigate=useNavigate()

  const fetchAccounts=()=>{
    setIsFetching(true)
    fetch('http://localhost:3001/getusers')
    .then(res=>res.json())
    .then((res)=>{
      res=res.filter((r)=>r.role!=='ppa it officer')
      setLength(res.length)
      setIsFetching(false)
    })
    .catch((err)=>{
      setErrorFetching(true)
    })
  }
  const fetchApprovedAccounts=()=>{
    setApIsFetching(true)
    fetch('http://localhost:3001/getusers/not-approved',)
    .then(res=>res.json())
    .then((res)=>{
      setApLength(res.length)
      setApIsFetching(false)
    })
    .catch((err)=>{
      setApErrorFetching(true)
    })
  }
  const fetchBannedAccounts=()=>{
    setBIsFetching(true)
    fetch('http://localhost:3001/getusers/banned')
    .then(res=>res.json())
    .then((res)=>{
      setBLength(res.length)
      setBIsFetching(false)
    })
    .catch((err)=>{
      setBErrorFetching(true)
    })
  }
  const fetchActiveAccounts=()=>{
    setAIsFetching(true)
    fetch('http://localhost:3001/getusers/active')
    .then(res=>res.json())
    .then((res)=>{
      res=res.filter((r)=>r.role!=='ppa it officer')
      setALength(res.length)
      setAIsFetching(false)
    })
    .catch((err)=>{
      setAErrorFetching(true)
    })
  }

  useEffect(()=>{fetchAccounts();fetchActiveAccounts();fetchBannedAccounts();fetchApprovedAccounts()},[])
  return (
    <Pane className='row rounded border container mb-5 mx-auto shadow p-3 pb-5' style={{height:'auto'}}>
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
        <div className='d-none d-md-flex flex-column justify-content-center align-items-center' style={{marginTop:'15rem',height:'5rem'}}>
        <h6 className='text-center'>{JSON.parse(localStorage.getItem('user')).name}</h6>
        <p className='fs-9 m-0 text-break text-center'>{JSON.parse(localStorage.getItem('user')).email}</p>
        <p className='fs-9 m-0 text-break text-center fw-bold'>PPA IT Officer</p>
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
            {tab=="Manage User Accounts"?
            <div className='w-100' style={{minHeight:'10rem',height:"auto"}}>
               <h3 className='m-0 text-center gx-2 pt-3 fs-6'>Manage User Accounts</h3>
               <div className='row container-fluid my-3 mx-auto' style={{cursor:'pointer'}}>
                 <div onClick={()=>{navigate(`./manage-accounts`)}} className='col-6 d-flex flex-column align-items-center justify-content-center'>
                    <FaUsers color='green' style={{width:'4rem',height:'4rem'}} />
                    <p className='m-0 fs-5 text-center'>All users</p>
                 </div>
                 <div onClick={()=>{navigate(`./active-accounts`)}} style={{cursor:'pointer'}}  className='col-6 d-flex flex-column align-items-center justify-content-center'>
                    <RiUserStarLine color='brown' style={{width:'4rem',height:'4rem'}} />
                    <p className='m-0 fs-5 text-center'>Active users</p>
                 </div>
                 <div onClick={()=>{navigate(`./approval-requests`)}} style={{cursor:'pointer'}}  className='col-6 ms-auto mt-3 ms-md-0 d-flex flex-column align-items-center justify-content-center'>
                    <RiLoaderLine color='darkslategray' style={{width:'4rem',height:'4rem'}} />
                    <p className='m-0 fs-5 text-center'>Waiting For Approval</p>
                 </div>
                 <div onClick={()=>{navigate(`./banned-accounts`)}} style={{cursor:'pointer'}}  className='col-6 my-md-0 mt-3 d-flex flex-column align-items-center justify-content-center'>
                    <IoBan color='red' style={{width:'4rem',height:'4rem'}} />
                    <p className='m-0 fs-5 text-center'>Banned users</p>
                 </div>
               </div>
            </div>
            :
            (tab=="Analytics"?
            <div className='w-100' style={{minHeight:'10rem',height:"auto"}}>
            <h3 className='m-0 text-center fs-6 mt-1'>Analytics</h3>
            <div className='container mx-auto d-flex flex-column justify-content-center align-items-center' style={{minHeight:'10rem',height:'auto'}}>
              <ul className='list-unstyled mt-3 w-100 row gap-3'>
                <div className='col col-md-6 shadow col-sm-12 border rounded border-success' style={{width:'12rem'}}>
                <li className='card-body'><span style={{fontFamily:"'Adamina',serif"}}>All Users : </span> <br/><p className='m-0 fw-bold card-text d-inline'>{isFetching?"fetching":(errorFetching?"error fetching":length)}</p></li>
                </div>
                <div className='col col-md-6 col-sm-12  border rounded border-success shadow align-item-right justify-content-right' style={{width:'12rem',}}>
                  <li className='card-body'><span style={{fontFamily:"'Adamina',serif"}}> Active Users : </span> <br/><p className='m-0 fw-bold d-inline'>{AisFetching?"fetching":(AerrorFetching?"error fetching":Alength)}</p></li>
                </div>
                <div className='col col-md-6 col-sm-12 border rounded border-danger shadow ' style={{width:'12rem',}}>
                  <li className='card-body'><span style={{fontFamily:"'Adamina',serif"}}>Users Waiting For Approval : </span>  <br/><p className='m-0 fw-bold d-inline'>{ApisFetching?"fetching":(AperrorFetching?"error fetching":Aplength)}</p></li>
                </div>
                <div className='col col-md-6 col-sm-12  border rounded border-success shadow' style={{width:'12rem'}} >
                  <li className='card-body' ><span style={{fontFamily:"'Adamina',serif"}}> Banned Users : </span><br/><p className='m-0 fw-bold d-inline'>{BisFetching?"fetching":(BerrorFetching?"error fetching":Blength)}</p></li>
                </div>
              </ul>
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
