import * as React from 'react'
import { useState } from "react"
import {Link} from "react-router-dom"
import Payment from "./payment";
import Footer from '../../components/footer';
const Download = () => {
    const [checkOut, setCheckOut] = useState(false);

    return (<>
        <div className="container mb=5">
            {checkOut ? (
                <Payment/>
            ): ( 
            <Link to="/tenders/:id/apply/payment/:id" onClick={()=> {setCheckOut(true)}}>Download Document</Link>
            )}
            </div><Footer /></>
    )
}
export default Download;