import { useParams, Link } from "react-router-dom";
import {BsArrowLeft} from 'react-icons/bs'
import StickyHeadTable from '../../../components/BidderAllBidsTable'
import Footer from '../../../components/footer'
const BidderAllBids=()=>{
    const {id,uid}=useParams();

    return(<>
        <div className="mb-5 container border rounded" style={{minHeight:'20rem',height:"auto"}} >
        <div className="p-2 w-100 fluid" style={{minHeight:'2rem'}}>
           <a className="icon-link text-decoration-none text-black">
            <BsArrowLeft className='me-2' />
            <Link className="text-decoration-none" to={`/userpage/supplier/${id}`}>Back to Manage Bids</Link>
           </a>
        </div>
        <h2 className="text-center">All Tenders</h2>
        <StickyHeadTable />
    </div>
    <Footer />
    </>)
}

export default BidderAllBids;