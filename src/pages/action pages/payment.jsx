import React, {useEffect, useRef} from 'react';
import Footer from '../../components/footer';
const Payment = () => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer CHASECK_TEST-4c3LPcrnMoijdblC8MaHTNPIYy07E0al");
    myHeaders.append("Content-Type", "application/json");
    
    var raw = JSON.stringify({
      "amount": "100",
      "currency": "ETB",
      "email": "abebech_bekele@gmail.com",
      "first_name": "Bilen",
      "last_name": "Gizachew",
      "phone_number": "0912345678",
      "tx_ref": "chewatatest-6669",
      "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
      "return_url": "https://www.google.com/",
      "customization[title]": "Payment for my favourite merchant",
      "customization[description]": "I love online payments"
    });
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://api.chapa.co/v1/transaction/initialize", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    return(<>
    <div  className='justify-content-center align-items-center d-flex flex-column mb-5 container mx-auto bg-info' >
    {/* <form method="POST" action="https://api.chapa.co/v1/hosted/pay" >
      <input type="hidden" name="public_key" value="YOUR_PUBLIC_API_KEY" />
      <input type="hidden" name="tx_ref" value="negade-tx-12345678sss9" />
      <input type="hidden" name="amount" value="100" />
      <input type="hidden" name="currency" value="ETB" />
      <input type="hidden" name="email" value="israel@negade.et" />
      <input type="hidden" name="first_name" value="Israel" />
      <input type="hidden" name="last_name" value="Goytom" />
      <input type="hidden" name="title" value="Let us do this" />
      <input type="hidden" name="description" value="Paying with Confidence with cha" />
      <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
      <input type="hidden" name="callback_url" value="https://example.com/callbackurl" />
      <input type="hidden" name="return_url" value="https://example.com/returnurl" />
      <input type="hidden" name="meta[title]" value="test" />
    <button type="submit">Pay Now</button>
</form> */}
    </div>
    <Footer />
    </>)
}

export default Payment;