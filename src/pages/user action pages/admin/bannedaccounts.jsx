import React from "react";
import Layout from "../../layouts/adminLayout";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {AiOutlineSearch} from 'react-icons/ai'
import StickyHeadTable from "../../../components/Banned Acc Table";
const BannedAccounts = () => {
    const { id } = useParams();
    
    return ( 
        
        <div className="container border rounded" style={{minHeight:'20rem',height:"auto"}} >
            <div className="p-2 w-100 fluid" style={{minHeight:'2rem'}}>
               <a className="icon-link text-decoration-none text-black">
                <BsArrowLeft className='me-2' />
                <Link className="text-decoration-none" to={`/userpage/admin/${id}`}>Back to Dashboard</Link>
               </a>
            </div>
            <div className="container" style={{height:'auto'}}>
                 <h4 className="text-center my-2">Manage Banned Accounts</h4>
                 <div>
                 <div className="mt-3 rounded border" style={{width:'100%',height:'auto',minHeight:'2.5rem'}}>
                   <TextField
                     placeholder="Search a user"
                     id="outlined-start-adornment"
                     size="small"
                     InputProps={{
                        endAdornment: <InputAdornment position="end">
                        <AiOutlineSearch  />
                        </InputAdornment>,
                     }}
                     style={{width:'100%'}}
              />
              </div>
              <div className= " bg-body-tertiary rounded shadow mt-3 border border-info rounded" style={{maxWidth:'100%',height:'auto',minHeight:'3rem',backgroundColor:'white'}}>
                <StickyHeadTable />
              </div>
            </div>
            </div>
        </div>

    )
}
export default BannedAccounts;