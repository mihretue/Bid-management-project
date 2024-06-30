// import { useState } from "react";
// import Footer from '../../components/footer'
// import Pdf from "../../resources/PDF_file_icon.png"
// import { useEffect } from "react";
// import {
//     PayPalScriptProvider,
//     PayPalButtons,
//     usePayPalScriptReducer
// } from "@paypal/react-paypal-js";
// import { Button } from "evergreen-ui";
// const amount = "12.99";
// const currency = "USD";
// const style = {"layout":"vertical"};

// const ButtonWrapper = ({ currency, showSpinner }) => {
//     const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

//     useEffect(() => {
//         dispatch({
//             type: "resetOptions",
//             value: {
//                 ...options,
//                 currency: currency,
//             },
//         });
//     }, [currency, showSpinner]);
//     return (<>
//             { (showSpinner && isPending) && <div className="spinner" /> }
//             <PayPalButtons
//                 style={style}
//                 disabled={false}
//                 forceReRender={[amount, currency, style]}
//                 fundingSource={undefined}
//                 createOrder={(data, actions) => {
//                     return actions.order
//                         .create({
//                             purchase_units: [
//                                 {
//                                     amount: {
//                                         currency_code: currency,
//                                         value: amount,
//                                     },
//                                 },
//                             ],
//                         })
//                         .then((orderId) => {
//                             return orderId;
//                         });
//                 }}
//                 onApprove={(data, actions)=> {
//                     return actions.order.capture().then(function (details) {
//                         document.getElementById('success_btn').hidden=false;
//                       });
                      
//                 }}
//                 />
//         </>
//     );
// }
// export default function Payment() {
//   const navigate = useNavigate();
// 	return (
// 		<div className="mt-3" style={{ maxWidth: "20rem", minHeight: "10rem" }}>
//             <PayPalScriptProvider
//                 options={{
//                     "clientId": "ARbsOoxVAQUJH9tXj65Ty3VaAtdv_5wOWknAOLGboMhexc1GImhoUG1qMpfskJMhqY6iAIMcqCuyXsKN",
//                     components: "buttons",
//                     currency: "USD"
//                 }}
//             >
// 				<ButtonWrapper
//                     currency={currency}
//                     showSpinner={false}
//                 />
//                 <Button hidden id="success_btn" onClick={() => {navigate(`/userpage/supplier/${id}/tenders/${tid}/apply/bid-document`)}}>
//                   Continue
//                 </Button>
// 			</PayPalScriptProvider>
// 		</div>
// 	);
// }
import React, { useState, useEffect } from 'react';
import { Link,useParams,useNavigate } from "react-router-dom"

const Payment = () => {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const {tid,id} = useParams();

  useEffect(() => {
    // Initialize the PayPal script
    const initializePayPalScript = () => {
      const script = document.createElement('script');
      script.src = 'https://www.paypal.com/sdk/js?client-id=ARbsOoxVAQUJH9tXj65Ty3VaAtdv_5wOWknAOLGboMhexc1GImhoUG1qMpfskJMhqY6iAIMcqCuyXsKN'; // Replace with your PayPal Client ID
      script.addEventListener('load', () => handlePaymentButton());
      document.body.appendChild(script);
    };

    initializePayPalScript();
  }, []);

  const handlePaymentButton = () => {
    // Render the PayPal button
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          // Set up the details for the transaction
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: '10.00', // Replace with the desired payment amount
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          // Capture the transaction after payment approval
          return actions.order.capture().then((details) => {
            // Set payment complete and redirect to the thank you page
            setPaymentComplete(true);
            window.location.href = `http://localhost:3000/userpage/supplier/${id}/tenders/${tid}/apply/bid-document`; // Replace with your desired return URL
          });
        },
      })
      .render('#paypal-button-container'); // Replace with the container ID where you want to render the PayPal button
  };

  return (
    <div>
      {paymentComplete ? (
        <h1>Payment Completed!</h1>
      ) : (
        <div>
          <h1>Payment Page</h1>
          <div id="paypal-button-container"></div>
        </div>
      )}
    </div>
  );
};

export default Payment;
