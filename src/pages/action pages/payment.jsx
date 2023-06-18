import { useState } from "react";
import { useNavigate ,useParams} from "react-router-dom";
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
     
      return (
        <div className="App">
          {/* <div className="book_container">
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
    
                </div> */}
                <button onClick={()=>{navigate(`/tenders/${tid}/apply/bid-proposal`)}}>Pay</button>
              </div>
      );

}
export default Payment;