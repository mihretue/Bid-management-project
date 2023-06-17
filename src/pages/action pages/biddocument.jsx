import React from "react"
import { Link,useParams,useNavigate } from "react-router-dom"
import Footer from "../../components/footer"
import { useState } from "react";
// import Download from "./download"
const Biddocument = () => {
   const {tid}=useParams();
   const navigate=useNavigate()
   const [bidDocument,setBidDocument]=useState("")
   const [isChecking,setIsChecking]=useState(false)
   const [errorChecking,setErrorChecking]=useState(false)
   const [payed,setPayed]=useState(false)
   const fetchBidDocument=()=>{
     fetch(`http://localhost:3001/gettender/?id=${tid}`)     .then((res)=>res.json())
     .then((res)=>{
        setBidDocument(res.bidDocFile)
     })
   }
   const checkBidder=()=>{
    let q={bid:tid,uid:JSON.parse(localStorage.getItem('user')).id}
     setIsChecking(true)
     document.getElementById('checkp').style.display="inline"
     fetch(`http://localhost:3001/checkbidder?${q}`)
     .then((res)=>res.json())
     .then((res)=>{
        console.log(res)
        if(Object.keys(res).length==0){//bidder doesn't exist
            setPayed(false)
            setTimeout(()=>{
                navigate(`/tenders/${tid}/apply/payment`)
            },3000)
        }else{
            setPayed(true)
            fetchBidDocument()
        }
        setIsChecking(false)
    })
     .catch((err)=>{
        setErrorChecking(true)
        console.log(err)
     })
   }




    return(<>
    {localStorage.getItem('user')?
    <div className="container d-flex flex-column justify-content-center align-items-center border rounded mb-5" style={{minHeight:'15rem',height:'auto'}}>
        <h6 className="text-center pt-4 word-break mx-auto" style={{maxWidth:"20rem"}}>To apply for this bid, you need to download and view the bid document </h6>
        <a download={payed?true:false} href={payed&&`backend/uploads/biddocs/${bidDocument}`} >
            <button disabled={isChecking?true:false} onClick={checkBidder} className="btn btn-primary">Download Bid Document</button>
        </a>
        <p id="checkp" className="fs-10 m-0 text-center" style={{display:'none'}}>
           {isChecking?"Checking Payment Status...":(errorChecking?"Some Error Occurred!":(payed?"You have payed for the bid document, you can now download the bid document.":"Redirecting you to the payment page..."))}
        </p>
        <button onClick={()=>{navigate(`/tenders/${tid}/apply/bid-proposal`)}} hidden={payed?false:true} className="btn btn-success mt-2">Continue Application</button>
    </div>:
    <div className="container border rounded mb-5" style={{minHeight:'15rem',height:'auto'}}>
    <h4 className="text-center pt-4 word-break mx-auto" style={{maxWidth:"20rem"}}>To apply for bids, you need to log in. </h4>
   <Link to="/login" className="mx-auto d-flex align-items-center flex-column mt-3 justify-content-center">
    <button className="btn btn-primary" style={{maxWidth:'10rem'}}>Log in</button>
    </Link>
    <p className="text-center mt-2">Or, if you don't have an account, </p>
    <Link to='/signup' className="mx-auto d-flex align-items-center flex-column mt-3 justify-content-center">
    <button className="btn btn-secondary" style={{maxWidth:'10rem'}}>Sign Up</button>
   </Link>
</div>
    }
    <Footer />
    </>)
}

export default Biddocument