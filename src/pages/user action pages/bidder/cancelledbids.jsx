import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'
import StickyHeadTable from '../../../components/BidsCancelledTable'
import Footer from '../../../components/footer'
const CancelledBids=()=>{
    const {id,uid}=useParams();

    return(<>
        <div className="mb-5 container border rounded" style={{minHeight:'20rem',height:"auto"}} >
        <div className="p-2 w-100 fluid" style={{minHeight:'2rem'}}>
           <a className="icon-link text-decoration-none text-black">
            <BsArrowLeft className='me-2' />
            <Link className="text-decoration-none" to={`/userpage/supplier/${id}`}>Back to Manage Bids</Link>
           </a>
        </div>
        <h2 className="text-center">Cancelled Tenders</h2>
        <div className= " bg-body-tertiary rounded shadow mt-3 border border-info rounded" style={{maxWidth:'100%',height:'auto',minHeight:'3rem',backgroundColor:'white'}}>
          <StickyHeadTable />
        </div>
    </div>
    <Footer />
    </>
    )
}

export default CancelledBids;