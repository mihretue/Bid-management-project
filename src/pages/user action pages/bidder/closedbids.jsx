import { useParams,Link } from "react-router-dom";
import {BsArrowLeft} from 'react-icons/bs'
import { useState ,useEffect} from "react";
import StickyHeadTable from '../../../components/Bidder Closed Bids Table'
import Footer from '../../../components/footer'
const BidderClosedBids=()=>{
    const {id,uid}=useParams();
    const [user,setUser]=useState({})
    const [isFetching,setIsFetching]=useState(false)
    const [errorFetching,setErrorFetching]=useState(false)

    useEffect(()=>{
       fetchUserData()
    },[])
    const fetchUserData=()=>{
        setIsFetching(true)
        fetch(`http://localhost:3001/userbyid/${uid}`)
        .then((res)=>res.json())
        .then((res)=>{
          setUser(res)
          console.log(res)
          setIsFetching(false)
        })
        .catch((err)=>{setIsFetching(false);setErrorFetching(true)})
      }
    return(<>
        <div className="mb-5 container border rounded" style={{minHeight:'20rem',height:"auto"}} >
        <div className="p-2 w-100 fluid" style={{minHeight:'2rem'}}>
           <a className="icon-link text-decoration-none text-black">
            <BsArrowLeft className='me-2' />
            <Link className="text-decoration-none" to={`/userpage/supplier/${id}`}>Back to Manage Bids</Link>
           </a>
        </div>
        <h2 className="text-center">Closed Tenders</h2>
        <div className= " bg-body-tertiary rounded shadow mt-3 border border-info rounded" style={{maxWidth:'100%',height:'auto',minHeight:'3rem',backgroundColor:'white'}}>
          <StickyHeadTable />
        </div>
    </div>
    <Footer /></>)
}

export default BidderClosedBids;