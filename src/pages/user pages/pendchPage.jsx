import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import PendchDrawer from './pendchdrawer';
import Footer from '../../components/footer';

function PendchPage() {

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
       setIsFetching(false)
     })
     .catch((err)=>{
      setIsFetching(false);
      setErrorFetching(true)})
   }
  return (<>
      <PendchDrawer/>
      <Footer />
      </>

  );
}

export default PendchPage;
