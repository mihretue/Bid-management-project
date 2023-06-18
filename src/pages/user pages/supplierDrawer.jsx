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
import img from '../../resources/userbackground.png'
import Footer from '../../components/footer'
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

  return (<>
    <Pane className='row mb-5 container mx-auto border rounded pb-5' style={{height:'auto'}}>
      <Tablist className="col-md-3 col-12 " style={{height:'auto'}}>
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
        {isFetching?
        <div className='d-none d-md-flex flex-column justify-content-center align-items-center' style={{marginTop:'15rem',height:'5rem'}}>
           <p className='text-center text-break m-0'>Fetching Account Details...</p>
         </div>
        :
        (errorFetching?'error':
          <div className='d-none d-md-flex flex-column justify-content-center align-items-center mb-2' style={{marginTop:'15rem',height:'5rem'}}>
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
      <Pane className="col-md-9 col-12  " style={{height:'auto',backgroundColor:'white'}}>
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
            <div className='w-100' style={{minHeight:'10rem',height:"auto",backgroundImage:{img}}}>
               <h3 className='m-0 text-center fs-6 mt-1'>Manage Bids</h3>
               <div className='row g-3 justify-between container-fluid my-3 mx-auto' style={{minHeight:'10rem',height:'auto'}}>
                 <div className='col-6' >
                    <Link className=' d-flex flex-column align-items-center justify-content-center' style={{textDecoration:'none',color:"black"}} to={`/userpage/supplier/${id}/bids-in-progress`}>
                    <GrInProgress style={{width:'2.5rem',height:'3rem'}} />
                      <br/>
                      <p>Bids in Progress</p>
                    </Link>
                 </div>
                 <div className='col-6 ms-auto ms-md-0 d-flex flex-column align-items-center justify-content-center'>
                    <Link className=' d-flex flex-column align-items-center justify-content-center' style={{textDecoration:'none',color:"black"}} to={`/userpage/supplier/${id}/cancelled-bids`}>
                      <MdOutlineCancelPresentation style={{width:'4rem',height:'4rem'}} />
                      <br/>
                      Cancelled Bids
                    </Link>
                  
                </div>
                <div className='col-6 ms-auto ms-md-0 d-flex flex-column align-items-center justify-content-center'>
                    
                    <Link className=' d-flex flex-column align-items-center justify-content-center' style={{textDecoration:'none',color:"black"}} to={`/userpage/supplier/${id}/clarification-requests`} >
                    <MdQuestionAnswer style={{width:'4rem',height:'4rem'}} /><br/> 
                    Bid Clarification Requests
                    </Link>
                    
                </div>
                <div className='col-6 d-flex flex-column align-items-center justify-content-center '>
                      <Link className=' d-flex flex-column align-items-center justify-content-center' to={`/userpage/supplier/${id}/bid-complaints`} style={{textDecoration:'none',color:"black"}}>
                        <BiMessageRoundedError style={{width:'4rem',height:'4rem'}} />
                        <br/>
                        Complaints Sent
                      </Link>
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
    <Footer />
    </>
  )
}
