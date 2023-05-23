import {Navbar,Nav} from "react-bootstrap";
import React from 'react';
import {Link,Outlet } from "react-router-dom";
import Profile from "../../resources/profile.jpg";
import logo6 from "../../resources/logo6.png";
import {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
 
// import FontAwesomeIcon from "@fortawesome/fontawesome-free";
const SupplierLayout=()=>{

  const {id,uid} =useParams();
  const [user,setUser]=useState({})
  


  useEffect(()=>{
    fetchUserData()
 },[])
 const fetchUserData=()=>{
    //  setIsFetching(true)
     fetch(`http://localhost:3001/userbyid/${id}`)
     .then((res)=>res.json())
     .then((res)=>{
       setUser(res)
       console.log(res)
      //  setIsFetching(false)
     })
    //  .catch((err)=>{setIsFetching(false);setErrorFetching(true)})
   }

return(
    <div>
        <Navbar expand="lg"className="container fluid" >
        <Navbar.Brand href="#home"><img src={logo6} style={{width:'10rem',height:'2rem'}} alt="message"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="align-items-end">
          <Nav className="me-auto nav_item fw-bold" >
            <Nav.Link as={Link} to={"/"} >Home</Nav.Link>
            <Nav.Link className="advLink" as={Link} to={"/tenders"} >Tenders</Nav.Link>
            <Nav.Link as={Link} to={"/about"} >About</Nav.Link>
            <Nav.Link as={Link} to={"contact"} >Contact Us</Nav.Link>

          </Nav>
          <Nav style={{ fontWeight: 'bold' }}>
          <Nav.Link as={Link} to={"/profile"} ><button className="btn btn-outline-secondary"><img src={Profile} style={{height:"1.5rem",width:"1.5rem"}} alt="profiel image"/>{user.fName}</button></Nav.Link>

          
            {/* {!localStorage.getItem('user')&&
            <Nav.Link as={Link} to={"/login"} ><button className="btn btn-primary">Login</button></Nav.Link>}
            {
            !localStorage.getItem('user')&&
            }
            <Nav.Link as={Link} to={"/mailus"} ><TfiEmail size={30} data-toggle="tooltip" data-placement="bottom" title="Mail us" /></Nav.Link>
          */}</Nav> 

        </Navbar.Collapse>
      
    </Navbar>
    <Outlet  />
      </div>
)
}
export default SupplierLayout;
