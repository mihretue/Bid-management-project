import React,{useEffect,useState} from "react";
import {CgProfile} from 'react-icons/cg'
import { useParams } from "react-router-dom";

const Setting = ()=>{

    const {id} = useParams();
    const [isFetching,setIsFetching]=useState(false)
    const [errorFetching,setErrorFetching]=useState(false)
    const [user,setUser] =useState()


    useEffect(()=>{
        fetchUserData();
     },[])
     const fetchUserData=()=>{
         setIsFetching(true)
         fetch(`http://localhost:3001/userbyid/${id}`)
         .then((res)=>res.json())
         .then((res)=>{
           setUser(res)
           setIsFetching(false)
         })
         .catch((err)=>{setIsFetching(false);setErrorFetching(true)})
       }
    return(
        <div className="container border rounded justify-content-center align-items-center " style={{width:'20rem'}} >
            <div className="mt-1 justify-content-center align-items-center">
                <CgProfile  className="justify-content-center align-items-center" style={{width:'20rem',height:'3rem',color:'darkgoldenrod'}} />
                <br/>
                <h2 className="text-center">{JSON.parse(localStorage.getItem('user')).fName}</h2>
            </div>
            <div>
            <p>email : </p>     
                    </div>
            
        </div>   
    )
}

export default Setting;