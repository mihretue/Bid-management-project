import React from "react";
import Layout from "../../layouts/adminLayout";

const Manageuseraccount = () => {
    return ( 
        
        <div className="container text-center m-5 " >
            <Layout />
            <div className="row align-items-start ">
                <div className="col ">
                Name of user
                </div>
                <div className="col ">
                <button type="button" className="btn btn-primary mx-1">View</button>
                <button type="button" className="btn btn-primary mx-1">Approve</button>
                <button type="button" className="btn btn-primary mx-1">Ban</button>
                <button type="button" className="btn btn-primary mx-1">Remove</button>
                </div>
            </div>
            {/* <div className="row align-items-start  my-2">
                <div className="col ">
                One of three columns
                </div>
            </div> */}

        </div>
    )
}
export default Manageuseraccount;