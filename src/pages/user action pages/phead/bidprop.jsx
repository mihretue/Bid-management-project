import Footer from '../../../components/footer'
import {BsArrowLeft} from 'react-icons/bs'
import { Link,useNavigate,useParams } from "react-router-dom";
import { useEffect,useState } from 'react'; 
const BidProp=()=>{
    const {id,bid,bidp}=useParams()
    const [prop,setProp]=useState({})
    const [isFetching,setIsFetching]=useState(false)
    const [errorFetching,setErrorFetching]=useState(false)
    const [bidder,setBidder]=useState({})
   const fetchBidProp=()=>{
        setIsFetching(true)
        fetch(`http://localhost:3001/getbiddingo/${bidp}`)
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
            setProp(res)
            fetchBidder(res.bidderId)
        })
        .catch((err)=>{console.log(err);setErrorFetching(true)})
    }

    const fetchBidder=(bidderId)=>{
        fetch(`http://localhost:3001/userbyid/${bidderId}`)
        .then((res)=>res.json())
        .then((res)=>{console.log(res);setBidder(res);setIsFetching(false)})
        .catch((err)=>{console.log(err);setErrorFetching(true)})
    }

    useEffect(()=>{fetchBidProp()},[])
return(<>
    <div className="container p-2 w-100 fluid" style={{minHeight:'2rem'}}>
               <a className="icon-link text-decoration-none text-black">
                <BsArrowLeft className='me-2' />
                <Link className="text-decoration-none" to={`/userpage/phead/${id}/manage-bids/${bid}/bid-props`}>Back to All Bid Proposals</Link>
               </a>
    </div>
       <div className='container mb-5 d-flex flex-column justify-content-center align-items-center'>
        <h3>Bid Proposal Detail</h3>
        {isFetching?
        <div className='container p-5 mx-auto d-flex align-items-center justify-content-center'>Fetching...</div>
        :
    (errorFetching?
        <div className='container text-danger p-5 mx-auto d-flex align-items-center justify-content-center'>Error Fetching!</div>:
        <div className='container row col-12'>
           <div className='col-12 col-md-6 d-flex flex-column align-items-center'>
            <h6 className='text-center mt-3'>Applicant Information</h6>
        <ul>
            <li>Applicant Name : <p className='m-0 fw-bold d-inline'>{bidder.fName + ' '+ bidder.lName}</p></li>
            <li>Applicant Email : <p className='m-0 fw-bold d-inline'>{bidder.email}</p></li>
            <li>Applicant Status : <p className='m-0 fw-bold d-inline'>{bidder.status}</p></li>
        </ul>
           </div>
           <hr className='mt-2 d-sm-block d-md-none w-100' />
           <div className='col-12 col-md-6 d-flex flex-column align-items-center'>
            <h6 className='text-center mt-3'>Bid Proposal Information</h6>
        <ul>
            <li>Bid Security Payment : <p className='m-0 fw-bold d-inline'>{prop.bidSecPayment}</p></li>
            <li>Bidder Status : <p className='m-0 fw-bold d-inline'>{prop.bidderStatus}</p></li>
            <li>Application Time : <p className='m-0 fw-bold d-inline'>{prop.appTime}</p></li>
        </ul>
           </div>
             <button disabled={isFetching?true:false} className='col-12 w-50 mx-auto mt-3 btn btn-primary'>
             <a className='text-white w-100 text-decoration-none' download href={`/backend/uploads/bidprops/${prop.bidPropFile}`}>View Bid Proposal
             </a>
             </button>
        </div>)}
    </div>
<Footer />
</>)
}

export default BidProp;