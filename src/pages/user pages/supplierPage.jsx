import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import SupplierDrawer from './supplierDrawer';

function SupplierPage() {
  const {id} =useParams();
  const [user,setUser]=useState({})
  const [isFetching,setIsFetching]=useState(false)
  const [errorFetching,setErrorFetching]=useState(false)



  useEffect(()=>{
    fetchUserData()
 },[])
 const fetchUserData=()=>{
     setIsFetching(true)
     fetch(`http://localhost:3001/userbyid/${id}`)
     .then((res)=>res.json())
     .then((res)=>{
       setUser(res)
       console.log(res)
       setIsFetching(false)
     })
     .catch((err)=>{
      setIsFetching(false);
      setErrorFetching(true)})
   }

  return (
        <SupplierDrawer/>
  );
}

export default SupplierPage;
