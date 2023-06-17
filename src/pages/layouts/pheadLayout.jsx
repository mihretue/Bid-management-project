import {Navbar,Nav} from "react-bootstrap";
import React, { useState,useEffect } from 'react';
import {Link,Outlet,useParams,useNavigate } from "react-router-dom";
import Profile from "../../resources/profile.jpg";
import logo6 from "../../resources/logo6.png";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {IoIosLogOut} from "react-icons/io";
import {BsGear} from "react-icons/bs"

// import FontAwesomeIcon from "@fortawesome/fontawesome-free";
const PheadLayout=()=>{
  const {id,uid} =useParams();
  const [user,setUser]=useState({})
  const [isFetching,setIsFetching]=useState(false)
  const [errorFetching,setErrorFetching]=useState(false)
  const navigate = useNavigate();

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
          <DropdownButton id="dropdown-basic-button "  title={JSON.parse(localStorage.getItem('user')).fName} >
                <Dropdown.Item >
                  <Nav.Link as={Link} to={"/setting"} className="icon-link  text-decoration-none text-black  justify-content-center align-items-center" href="/#">
                    <BsGear className='mx-1' />
                      Settings
                  </Nav.Link>
                </Dropdown.Item>
                <Dropdown.Item >
                    <Nav.Link  onClick={()=>{localStorage.removeItem("user"); navigate("/")}}  className="justify-content-center text-black ">
                      <IoIosLogOut  className='mx-1'/>
                        Log Out
                    </Nav.Link>
                </Dropdown.Item>
       
        </DropdownButton>
          
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
export default PheadLayout;
