import { useState } from "react";
import { Link,useParams,useNavigate } from "react-router-dom"
import Footer from '../../components/footer'
function Payment(){
  const {tid}=useParams()
  const {v4:uuidv4}=require('uuid')
  const navigate=useNavigate()
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
     
      return (<>{
              localStorage.getItem('user')?
              <div className="container mb-5 d-flex justify-content-center align-items-center mx-auto">
                 <button className="btn btn-primary" onClick={()=>{navigate(`/tenders/${tid}/apply/bid-document`)}}>Pay</button>
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
export default Payment;