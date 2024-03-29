import { useParams,useNavigate,Link  } from 'react-router-dom'
import Footer from '../../../components/footer'
import { useEffect,useState } from 'react'
import { Pane, Dialog} from 'evergreen-ui'
import {BsArrowLeft} from 'react-icons/bs'

const CancelledBidsDetail=()=>{
    const {bid,id}=useParams()
    const navigate=useNavigate()
    const [isShown, setIsShown] = useState(false)
    const [tender,setTender]=useState({})
    const [bidding,setBidding]=useState({})
    const [isFetching,setIsFetching]=useState(false)
    const [errorFetching,setErrorFetching]=useState(false)
    const [bIsFetching,setBIsFetching]=useState(false)
    const [errorBFetching,setErrorBFetching]=useState(false)
    useEffect(()=>{fetchDetails();fetchBidding()},[])
    const fetchDetails=()=>{
        setIsFetching(true)
        fetch(`http://localhost:3001/gettender/?id=${bid}`)
        .then((res)=>res.json())
        .then((res)=>{
            setTender(res)
            setIsFetching(false)
            })
        .catch((err)=>{console.log(err);setErrorFetching(true)})
    }

    const fetchBidding=()=>{
        setBIsFetching(true)
        let q={bid:bid,id:id}
        q=new URLSearchParams(q)
        fetch(`http://localhost:3001/getbiddingb/?${q}`)
        .then((res)=>res.json())
        .then((res)=>{
          setBidding(res)
          console.log(res)
          setBIsFetching(false)
        })
    }

    const withdrawTender=()=>{
        let q={bid:bid,id:id}
        q=new URLSearchParams(q)
       fetch(`http://localhost:3001/withdrawtender/?${q}`)
       .then((res)=>res.json())
       .then((res)=>{
        if(res.res=='ok'){
            navigate(`/userpage/supplier/${id}/bids-in-progress`)
        }else{
            alert("Something went wrong!")
        }
       })
       .catch((err)=>{console.log(err)})
    }
    
return(<><div className='container mb-4'>
          <a className="icon-link text-decoration-none text-black">
            <BsArrowLeft className='me-2' />
            <Link className="text-decoration-none" to={`/userpage/supplier/${id}/cancelled-bids`}>Back to Cancelled Bids</Link>
           </a></div>
<div className='container border rounded d-flex flex-column align-items-center justify-content-center mx-auto mb-5' style={{minHeight:'5rem',height:'auto'}}>
    <h5 className='text-center'>Tender Details</h5>
    <div className='d-flex flex-column align-items-center justify-content-center'>{isFetching?"Fetching...":(errorFetching?"Error Fetching!":
    <><ul className=''>
        <li>Tender Title : <p className='m-0 d-inline fw-bold'>{tender.title}</p></li>
        <li>Procuring Entity : <p className='m-0 d-inline fw-bold'>{tender.open}</p></li>
        <li>Bid Opening Schedule : <p className='m-0 d-inline fw-bold'>{tender.open}</p></li>
        <li>Site Visitation Schedule : <p className='m-0 d-inline fw-bold'>{tender.visit}</p></li>
        <li className='mt-2'>Bid Status : <p className={tender.open>=Date.now()?'m-0 d-inline font-monospace text-primary fw-bold':'m-0 d-inline fw-bold'}>{tender.open>=Date.now()?"Open":"Not Open"}</p></li>
    </ul>
    <button onClick={()=>{navigate(`/tenders/${bid}`)}} className='btn btn-info'>View All Details</button>
    </> )}
    </div>
    <hr className='w-100' />
    <h5 className='text-center'>Your Status</h5>
    <div className='d-flex flex-column align-items-center justify-content-center'>{bIsFetching?"Fetching...":(errorBFetching?"Error Fetching!":
    <><ul className=''>
        <li>Applied On: <p className='m-0 d-inline fw-bold'>{bidding.appTime}</p></li>
        <li>Bid Document Payment : <p className='m-0 d-inline fw-bold'>{bidding.bidDocPayment}</p></li>
        <li>Bid Security Payment : <p className='m-0 d-inline fw-bold'>{bidding.bidSecPayment}</p></li>
        <li>Bid Proposal Document : 
            <a href={`/backend/uploads/biddocs/${bidding.bidPropFile}`} download className='d-block mx-auto'>
                View Bid Proposal Document
            </a></li>
    </ul>
    <h4 className='text-danger mt-3'>You Have Withdrawn From This Tender!</h4>
    </>)}
    </div>
</div>
<Footer />
</>)
}

export default CancelledBidsDetail