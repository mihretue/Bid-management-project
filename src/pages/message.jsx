import { useParams,Link } from "react-router-dom";
import Footer from '../components/footer'
import { BsArrowLeft } from "react-icons/bs";
const Message=()=>{
    const {id,mid}=useParams()
return(<>
<div className="container mb-5 p-2 w-100 fluid" style={{minHeight:'2rem'}}>
               <a className="icon-link text-decoration-none text-black">
                <BsArrowLeft className='me-2' />
                <Link className="text-decoration-none" to={`/userpage/supplier/${id}/messages`}>Back to All Messages</Link>
               </a>
    </div>
    <div className="border rounded" style={{minHeight:'10rem'}}>
        <h3 className="text-center">Message Details</h3>
        <div>
            
        </div>
    </div>
<Footer />
</>)
}

export default Message;