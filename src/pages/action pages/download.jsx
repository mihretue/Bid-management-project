import * as React from 'react'
import { useState } from "react"
import {Link} from "react-router-dom"
import Payment from "./payment";
const Download = () => {
    const [checkOut, setCheckOut] = useState(false);

    return (
        <div className="container">
            {checkOut ? (
                <Payment/>
            ): ( 
            <Link to="/tenders/:id/apply/payment/:id" onClick={()=> {setCheckOut(true)}}>Download Document</Link>
            )}
            </div>
    )
}
export default Download;