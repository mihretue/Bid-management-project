import React, { Component,useState,useEffect } from 'react'
import { useParams,Link } from 'react-router-dom';
import StickyHeadTable from "../../../components/Closed Bids Table";
import {BsArrowLeft} from 'react-icons/bs'
import Footer from '../../../components/footer'

function ClosedBids () {
  
  const {id} =useParams();

return (<>
    <div className="container p-2 w-100 fluid" style={{minHeight:'2rem'}}>
               <a className="icon-link text-decoration-none text-black">
                <BsArrowLeft className='me-2' />
                <Link className="text-decoration-none" to={`/userpage/phead/${id}`}>Back to Dashboard</Link>
               </a>
            </div>
      <div id="advertss" className='mb-5' >
    <h1 className='text-center fs-4 text-success '> Closed Tenders</h1>
    <div className= " bg-body-tertiary rounded shadow mt-3 border border-info rounded" style={{maxWidth:'100%',height:'auto',minHeight:'3rem',backgroundColor:'white'}}>
      <StickyHeadTable />
   </div>
    </div>
    <Footer />

    </>
    )
  }
  export default ClosedBids;

