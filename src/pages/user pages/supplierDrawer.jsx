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
import img from '../../resources/backuser.jpg'
import Footer from '../../components/footer'
import BidImage from "../../resources/bidimg2.webp"
import BookImage from "../../resources/megazine1.png"
import './style.css'


export default function SupplierDrawer() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const tabs = React.useMemo(() => ['Manage Bids', 'Me'], [])
  const {id} =useParams();
  const [user,setUser]=useState({})
  const [isFetching,setIsFetching]=useState(false)
  const [errorFetching,setErrorFetching]=useState(false)
  const [bids,setBids]=useState([]);
  const [activeBids,setactiveBids]=useState([]);
  const [cancelledBids,setcancelledBids]=useState([]);
  const [closedBids,setclosedBids]=useState([]);
  const [bidding,setBidding]=useState([]);
  const [BisFetching,setBIsFetching]=useState(true)
  const [BerrorFetching,setErrorBFetching]=useState(false)

  useEffect(()=>{
    fetchUserData();fetchBids()
 },[])
 const fetchUserData=()=>{
     setIsFetching(true)
     fetch(`http://localhost:3001/userbyid/${id}`)
     .then((res)=>res.json())
     .then((res)=>{
       setUser(res)
       setIsFetching(false)
     })
     .catch((err)=>{setIsFetching(false);setErrorFetching(true)})
   }

    var b=[]//all tenders in the database
    var a=[]//all tenders of the bidder
    var c=[]//active
    var d=[]//cancelled
    var e=[]//closed

    const fetchBidding=()=>{
      a=[]
      c=[]
      d=[]
      e=[]
      let q={id:id}
      q=new URLSearchParams(q)
      fetch(`http://localhost:3001/getbidding/?${q}`)
      .then((res)=>res.json())
      .then((res)=>{
        for(let i=0;i<res.length;i++){
          for(let j=0;j<b.length;j++){
            if(res[i].bidId==b[j]._id){
                a.push(b[j])
                if(res[i].bidderStatus=="cancelled")
                 d.push(b[j])
                else if(res[i].bidderStatus=="bidding")
                 c.push(b[j])
                else if(res[i].bidStatus=="closed")
                 e.push(b[j])
                else ;
            }
          }
          setBidding(a)
          setactiveBids(c)
        setcancelledBids(d)
        setclosedBids(e)
        }
        setBids(bidding)
        setBIsFetching(false)
      })
        }
    const fetchBids=()=>{
      b=[]
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
        b=res;
        fetchBidding()
      })
      .catch((err)=>{
        setBids([])
        setErrorBFetching(true)
      })
    }

  return (<>
    <Pane className='row mb-5 container mx-auto  pb-5' style={{height:'auto'}}>
      <Tablist className="col-md-3 col-12 mt-1" style={{height:'auto'}}>
        {tabs.map((tab, index) => {
          return (
            <Tab
              aria-controls={`panel-${tab}`}
              direction="vertical"
              isSelected={index === selectedIndex}
              key={tab}
              onSelect={() => setSelectedIndex(index)}
             className='mt-3'
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
          <div className='d-none d-md-flex flex-column justify-content-center align-items-center ' style={{marginTop:'29rem',height:'5rem'}}>
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
            <div className='w-100' style={{minHeight:'10rem',height:"auto"}}>
               <h3 id='pro' className='m-0 text-center fs-6 mt-1'>Manage Bids</h3>
               <div className='row g-3 justify-between container-fluid my-3 mx-auto' style={{minHeight:'10rem',height:'auto'}}>
               <div className='col-6 d-flex flex-column align-items-center justify-content-center '>
                      <Link id='pro' className=' d-flex flex-column align-items-center justify-content-center' to={`/userpage/supplier/${id}/all-bids`} style={{textDecoration:'none',color:"Blue"}}>
                        <BiMessageRoundedError style={{width:'4rem',height:'4rem',color:"blue"}} />
                        <br/>
                        All Tenders You Involved In
                      </Link>
                </div>
                 <div className='col-6' >
                    <Link className=' d-flex flex-column align-items-center justify-content-center ' id='pro' style={{textDecoration:'none',color:"black"}} to={`/userpage/supplier/${id}/bids-in-progress`}>
                    <GrInProgress style={{width:'2.5rem',height:'3rem',color:"yellowgreen"}} />
                      <br/>
                      <p>Bids in Progress</p>
                    </Link>
                 </div>
                 <div className='col-6 ms-auto ms-md-0 d-flex flex-column align-items-center justify-content-center'>
                    <Link id='pro' className=' d-flex flex-column align-items-center justify-content-center' style={{textDecoration:'none',color:"darkslateblue"}} to={`/userpage/supplier/${id}/cancelled-bids`}>
                      <MdOutlineCancelPresentation style={{width:'4rem',height:'4rem',color:"darkslateblue"}} />
                      <br/>
                      Cancelled Bids
                    </Link>
                  
                </div>
                <div className='col-6 ms-auto ms-md-0 d-flex flex-column align-items-center justify-content-center'>
                    <Link id='pro' className=' d-flex flex-column align-items-center justify-content-center' style={{textDecoration:'none',color:"darkslategray"}} to={`/userpage/supplier/${id}/closed-bids`} >
                    <MdQuestionAnswer style={{width:'4rem',height:'4rem',color:"darkslategray"}} /><br/> 
                    Closed Bids
                    </Link>
                    
                </div>
                <div className='thediv' >
                  <img className='col-12 mt-3 twodiv col-xxl-12 ' style={{maxWidth:"10rem",height:"14rem"}} src={BookImage}  alt='bid image'/>
                  <p className='effic'>
                    <strong>"Efficiency is not just about doing things right; it's about doing the right things at the right time. A Bid Management System empowers businesses to navigate the bidding landscape with precision, unlocking opportunities and maximizing success."</strong>
                  </p>
                </div>
              </div>
            </div>
            :
            (tab=="Me"?
            <div className='w-100' style={{minHeight:'10rem',height:"auto",backgroundImage:{img}}}>
               <h3 className='m-0 text-center fs-6 mt-1'>Me</h3>
               <div className='mx-auto d-flex flex-column justify-content-center align-items-center' style={{minHeight:'10rem',height:'auto'}}>
                 <ul className='list-unstyled mt-3 w-100'>
                   <li>Your Total Tenders : <p className='m-0 fw-bold d-inline'>{bids.length}</p></li>
                   <li>Your Active Tenders : <p className='m-0 fw-bold d-inline'>{activeBids.length}</p></li>
                   <li>Tenders You Cancelled : <p className='m-0 fw-bold d-inline'>{cancelledBids.length}</p></li>
                   <li>Closed Tenders : <p className='m-0 fw-bold d-inline'>{closedBids.length}</p></li>
                   <li></li>
                 </ul><hr className='w-100' />
                 <h5 className='mt-4'>Account Status : 
                 <p className={user.status=="active"?'m-0 ms-2 d-inline text-success':'m-0 ms-2 d-inline text-danger'}>{user.status}</p>
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
    <Footer />
    </>
  )
}
