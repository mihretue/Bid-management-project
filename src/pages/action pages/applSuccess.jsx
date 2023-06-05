import { useState } from "react";
import Footer from "../../components/footer";
import { useParams,Link } from "react-router-dom";
import { useEffect } from "react";

const ApplicationSuccess=()=>{
    const [tender,setTender]=useState({})
    const {tid}=useParams()
    useEffect(()=>{fetchTenderDetails()},[])
    const fetchTenderDetails=()=>{
          fetch(`http://localhost:3001/gettender/?id=${tid}`)
          .then(res=>res.json())
          .then((res)=>{
           console.log(res)
            setTender(res)
        })}

return(<>
   <div className="container border rounded mb-5 d-flex flex-column justify-content-center align-items-center" style={{minHeight:'10rem'}}>
      <h1>Application Successful!</h1>
      <p className="m-0">Details : </p>
      <ul>
        <li>Tender : <p className="fw-bold m-0 d-inline-flex">{`${tender.title} - ${ tender.ent}`}</p></li>
        <li>Tender Opening Schedule : <p className="fw-bold m-0 d-inline-flex">{tender.open}</p></li>
        <li>Applicant Name : <p className="fw-bold m-0 d-inline-flex">{JSON.parse(localStorage.getItem('user')).name}</p></li>
      </ul>
      <Link to='/'><button className="mt-2 mb-4 btn btn-success">Go to Home</button></Link>
   </div>
   <Footer />
</>)
}

export default ApplicationSuccess;