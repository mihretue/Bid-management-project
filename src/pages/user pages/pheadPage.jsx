import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PheadDrawer from './pheadDrawer';
import Footer from '../../components/footer';

function PheadPage() {

  const {id,uid} =useParams();
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
      <PheadDrawer/>
      <Footer />
      </>

  );
}

export default PheadPage;
