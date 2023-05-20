import React, {useEffect, useRef} from 'react';


const Payment = () => {
    const paypal = useRef()

    useEffect (()=>{
        window.paypal.Buttons({
            createOrder : (data, actions,err ) => {
                return actions.order.create({
                    intern : "CAPTURE",
                    purchase_units : [
                        {
                            description:'Bid Document',
                            amount:{
                                currency_code:"USD",
                                value: 30.00,
                            },
                        },
                    ],
                });
            },
            onApprove : async (data,actions) =>{
                const order = await actions.order.capture()
                console.log(order)
            },
            onError : (err)=> {
                console.log(err)
            }
        }).render(paypal.current)
    }, [])
    return(<>
    <div ref={paypal} >

    </div>
    </>)
}

export default Payment;