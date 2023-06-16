// import "./App.css";
import axios from "axios";
import { useState } from "react";
const {v4:uuidv4}=require('uuid')

function Payment(){
    const [item,setItem]=useState({
        name:"tesla model 00",
        supplier : "dema amano",
        img : "https://ocdn.eu/pulscms-transforms/1/RcEk9kuTURBXy…mVmNi0wNzQxNTU2NTNiNGQuanBlZ5GTBc0DFs0Brt4AAaEwBQ",
        amount : 45,
    
      });
      const [checkoutUrl, setCheckoutUrl] = useState("");
      const [createUrl , setCreateUrl] = useState("");
    
      const handlePayment = async () => {
        fetch("http://localhost:3001/api/payment/initialize/orders", {
          method: "POST",
          headers: {
             "Content-Type": "application/json"
          },
          body: JSON.stringify({
             amount: item.amount,
             currency: "ETB",
             email: "ketemagirma@gmail.com",
             first_name: "ketema",
             last_name: "Girma",
             phone_number: "0912345678",
             tx_ref: uuidv4(),
             callback_url: "http://localhost:3001/api/payment/verify",
             return_url: "http://localhost:3000"
           })
})
  .then(response => response.json())
  .then(data => setCheckoutUrl(data.checkoutUrl))
  .catch(error => console.error(error));
      };
     
      return (
        <div className="App">
          <div className="book_container">
                    <img src={item.img} alt="book_img" className="book_img" />
                    <p className="book_name">{item.name}</p>
                    <p className="book_author">By {item.supplier}</p>
                    <p className="book_price">
                        Price : <span>&#x20B9; {item.amount}</span>
                    </p>
                    <button onClick={handlePayment} className="buy_btn">
                        buy now
                    </button>
            {checkoutUrl && <a href={checkoutUrl}>Proceed to Payment</a>}
    
                </div>
              </div>
      );

}
export default Payment;

// import React, {useEffect, useRef} from 'react';




// import Footer from '../../components/footer';
// import { useParams,useNavigate } from 'react-router-dom';
// const Payment = () => {
//   const navigate=useNavigate()
//   const {tid}=useParams()
//   //you  will call this function after the payment is successfully made.
//     const makePayment=()=>{
//       let q={tid:tid,uid:JSON.parse(localStorage.getItem('user')).id}
//       q=new URLSearchParams(q).toString()
//       fetch(`http://localhost:3001/makepayment?${q}`)
//       .then((res)=>res.json())
//       .then((res)=>{
//         if(res.res=="ok"){
//           navigate(`/tenders/${tid}/apply/bid-document`)
//         }
//       })
//     }
//     return(<>
//         <div className="container d-flex flex-column border rounded justify-content-center align-items-center" style={{minHeight:'10rem',height:'10rem'}}>
//             <h1>Payment Page</h1>
//             <button onClick={makePayment} className='btn btn-primary'>Continue</button>
//         </div>
//     <Footer />
//     </>)
// }

// export default Payment;