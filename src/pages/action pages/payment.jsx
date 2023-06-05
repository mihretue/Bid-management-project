import React, {useEffect, useRef} from 'react';
import Footer from '../../components/footer';
import { useParams,useNavigate } from 'react-router-dom';
const Payment = () => {
  const navigate=useNavigate()
  const {tid}=useParams()
  //you  will call this function after the payment is successfully made.
    const makePayment=()=>{
      let q={tid:tid,uid:JSON.parse(localStorage.getItem('user')).id}
      q=new URLSearchParams(q).toString()
      fetch(`http://localhost:3001/makepayment?${q}`)
      .then((res)=>res.json())
      .then((res)=>{
        console.log(res)
        if(res.res=="ok"){
          navigate(`/tenders/${tid}/apply/bid-document`)
        }
      })
    }

    return(<>
        <div className="container d-flex flex-column border rounded justify-content-center align-items-center" style={{minHeight:'10rem',height:'10rem'}}>
            <h1>Payment Page</h1>
            <button onClick={makePayment} className='btn btn-primary'>Continue</button>
        </div>
    <Footer />
    </>)
}

export default Payment;