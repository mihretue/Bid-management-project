import { useParams ,useNavigate} from "react-router-dom"
import { useState ,useEffect} from "react"
import Footer from "../../../components/footer"
const ManageApprovalRequest=()=>{
    const [isFetching,setIsFetching]=useState(false)
    const [errorFetching,setErrorFetching]=useState(false)
    const [tender,setTender]=useState({})
    const [isApproving,setIsApproving]=useState(false)
    const [dephead,setDepHead]=useState({})
    const [errorApproving,setErrorApproving]=useState(false)

useEffect(()=>{fetchBid()},[])
    const {bid,id}=useParams()
     const navigate=useNavigate()

const fetchBid=()=>{
    setIsFetching(true)
  fetch(`http://localhost:3001/gettender/?id=${bid}`)
  .then(res=>res.json())
  .then((res)=>{
    setTender(res)
    console.log(res)
    fetchProcHead()
}).catch((err)=>{console.log(err)
setErrorFetching(true)
})

}
const fetchProcHead=()=>{
    setIsFetching(true)
    let q={pBody:JSON.parse(localStorage.getItem('user')).pBody,role:"procurement department head"}
    q=new URLSearchParams(q)
    fetch(`http://localhost:3001/userbyprop?${q}`)
  .then(res=>res.json())
  .then((res)=>{
    setDepHead(res)
    setIsFetching(false)
    console.log(res)

   
}).catch((err)=>{console.log(err)
setErrorFetching(true)
})

}

const approveBid=()=>{
    setIsApproving(true)
  fetch(`http://localhost:3001/approvebid/${bid}`)
  .then(res=>res.json())
  .then((res)=>{
    console.log(res)
    setIsApproving(false)
    navigate(`/userpage/pendch/${id}/approval-requests/success`)
    fetchProcHead()
}).catch((err)=>{console.log(err)
setErrorApproving(true)
})

}


return(<><h2 className="text-center">Approval Request</h2>
{isFetching?
<div className="text-center p-3 mb-5">Please Wait...</div>:(errorFetching?
<div className="text-danger p-3 text-center mb-5">Error Fetching!</div>:
<div className="d-flex mb-5 container mx-auto flex-column justify-content-center align-items-center">
    <h6>Tender Information</h6>
    <ul className="list-unstyled">
       <li>Tender Id :<p className="m-0 d-inline fw-bold"> {tender.id}</p></li>
       <li>Tender Title :<p className="m-0 d-inline fw-bold"> {tender.title}</p></li>
       <li></li>
    </ul>
    <h6>Requested By : </h6>
    <ul className="list-unstyled">
       <li>Name :<p className="m-0 d-inline fw-bold"> {dephead.fName + ' ' +dephead.lName}</p></li>
       <li>Email :<p className="m-0 d-inline fw-bold"> {dephead.email}</p></li>
    </ul>
    <button className="btn btn-primary">
        <a download className="text-white text-decoration-none" href={`/backend/uploads/bidrequests/${tender.bidReqFile}`}>View Bid Proposal</a>
    </button><hr className="w-100" />
    <button onClick={approveBid} className="btn btn-success ">
        Approve Bid
    </button>
    <p>
        {isApproving&&"Please Wait..."}
        {errorApproving&&"Some Error Occurred!"}
    </p>
    
</div>)

}
<Footer />
</>)
}

export default ManageApprovalRequest