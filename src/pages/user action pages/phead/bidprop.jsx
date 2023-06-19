import Footer from '../../../components/footer'
import {BsArrowLeft} from 'react-icons/bs'
import { Link,useNavigate,useParams } from "react-router-dom";

const BidProp=()=>{
    const {id,bid}=useParams()
    const fetchBidProp=()=>{
        fetch(`http://localhost:3001/getbiddingo/${})
        .then((res)=>res.json())
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{console.log(err)})
    }
return(<>
    <div className="container p-2 w-100 fluid" style={{minHeight:'2rem'}}>
               <a className="icon-link text-decoration-none text-black">
                <BsArrowLeft className='me-2' />
                <Link className="text-decoration-none" to={`/userpage/phead/${id}/manage-bids/${bid}/bid-props`}>Back to All Bid Proposals</Link>
               </a>
    </div>
    <div className='container d-flex flex-column justify-content-center align-items-center'>
        <h3>Bid Proposal Detail</h3>
        <ul>
            <li>Applicant Name : </li>
        </ul>
    </div>
<Footer />
</>)
}

export default BidProp;