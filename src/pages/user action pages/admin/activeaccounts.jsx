import React from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'
import StickyHeadTable from "../../../components/Active Acc Table";
const ManageActiveAccounts = () => {
    const { id } = useParams();
    
    return ( 
        <div className="container mb-5 border rounded" style={{minHeight:'20rem',height:"auto"}} >
            <div className="p-2 w-100 fluid" style={{minHeight:'2rem'}}>
               <a className="icon-link text-decoration-none text-black">
                <BsArrowLeft className='me-2' />
                <Link className="text-decoration-none" to={`/userpage/admin/${id}`}>Back to Dashboard</Link>
               </a>
            </div>
            <div className="container" style={{height:'auto'}}>
                 <h4 className="text-center my-2">Manage Active User Accounts</h4>
                 <div>
              <div className= " bg-body-tertiary rounded shadow mt-3 border border-info rounded" style={{maxWidth:'100%',height:'auto',minHeight:'3rem',backgroundColor:'white'}}>
                <StickyHeadTable />
              </div>
            </div>
            </div>
        </div>

    )
}
export default ManageActiveAccounts;