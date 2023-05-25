import {Navbar,Nav} from "react-bootstrap";
import React from 'react';
import {Link,Outlet } from "react-router-dom";
import Profile from "../../resources/profile.jpg";
import logo6 from "../../resources/logo6.png";
import {useState,useEffect} from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {BsGear} from 'react-icons/bs';
import {IoIosLogOut} from "react-icons/io";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
// import FontAwesomeIcon from "@fortawesome/fontawesome-free";
const SupplierLayout=()=>{

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
       console.log(res)
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
          

          {/* <div className="dropdown"> 
            {/* <button className="btn btn-outline-secondary" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src={Profile} style={{height:"1.5rem",width:"1.5rem"}} alt="profiel image"/>
            {isFetching?
              <p className="m-0 d-inline ps-2">User</p>
             :(errorFetching?
              <p className="m-0 d-inline ps-2">User</p>
              :
              <p className="m-0 d-inline ps-2">{user.fName}</p>
              ) }
          </button> 

          {/* <ul className="dropdown-menu d-flex flex-column justify-content-center align-items-center w-50">
          <li>
            <a class="dropdown-item m-0" href="#">{user.fName+' '+user.lName}</a>
          </li>
           
    <li>
      
    </li>
          </ul>
          </div> 

          
            {/* {!localStorage.getItem('user')&&
            <Nav.Link as={Link} to={"/login"} ><button className="btn btn-primary">Login</button></Nav.Link>}
            {
            !localStorage.getItem('user')&&
            }
            <Nav.Link as={Link} to={"/mailus"} ><TfiEmail size={30} data-toggle="tooltip" data-placement="bottom" title="Mail us" /></Nav.Link>
          */}    
          <Nav >
              <DropdownButton id="dropdown-basic-button "  title={isFetching?
                  <p className="m-0 d-inline ps-2">User</p>
                  :(errorFetching?
                  <p className="m-0 d-inline ps-2">User</p>
                  :
                  <p className="m-0 d-inline ps-2">{user.fName}</p>
                  ) } >
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
       
        </DropdownButton></Nav> 

        </Navbar.Collapse>
      
    </Navbar>
    <Outlet  />
      </div>
)
}
export default SupplierLayout;
