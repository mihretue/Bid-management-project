import { useParams,Link } from 'react-router-dom'
import Footer from '../../../components/footer'
import { useEffect,useState } from 'react'
const PostBidAward=()=>{
    const {bid}=useParams()
    useEffect(()=>{fetchBid()},[])
    const [tender,setTender]=useState({})
    const fetchBid=()=>{
       fetch(`http://localhost:3001/gettender?id=${bid}`)
       .then((res)=>res.json())
       .then((res)=>{console.log(res);setTender(res)})
       .catch((err)=>{console.log(err)})
    }
return(<>
   {tender.approved==false?
    <div className='container mb-5 d-flex flex-column justify-content-center align-items-center mx-auto border rounded p-7' style={{width:'60%'}}>
        <p className='text-center'>To Post Bid Award, The Tender Should Be Approved.</p>
        <button className='btn btn-primary mb-3'>Request Approval</button>
    </div>:
    <div className='container mb-5 d-flex flex-column justify-content-center align-items-center mx-auto'>
        <h1>Post Bid Award</h1>
    </div>
   }
<Footer />
</>)
}
export default PostBidAward;