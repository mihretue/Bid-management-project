import {Navbar,Nav} from "react-bootstrap";
import React from 'react';
import {Link,Outlet,useNavigate } from "react-router-dom";
import Profile from "../../resources/profile.jpg";
import logo6 from "../../resources/logo6.png";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {IoIosLogOut} from "react-icons/io";
import {BsGear} from "react-icons/bs"

const PendchLayout=()=>{
  const navigate = useNavigate();
return(
    <div>
        <Navbar expand="lg"className="container fluid" >
        <Navbar.Brand href="#home"><img src={logo6} style={{width:'10rem',height:'2rem'}} alt="message"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="align-items-end">
          <Nav className="me-auto nav_item fw-bold" >
            <Nav.Link as={Link} to={"/"} >Home</Nav.Link>
            <Nav.Link className="advLink" as={Link} to={"./messages"} >Messages</Nav.Link>
            <Nav.Link as={Link} to={"./about"} >About</Nav.Link>
            <Nav.Link as={Link} to={"./contact"} >Contact Us</Nav.Link>

          </Nav>
          <Nav style={{ fontWeight: 'bold' }}>
          <DropdownButton id="dropdown-basic-button  "  title={JSON.parse(localStorage.getItem('user')).fName} >
                <Dropdown.Item style={{marginRight:'38px'}}>
                  <Nav.Link as={Link} to={"/setting"} className="icon-link  text-decoration-none text-black  justify-content-center align-items-center" href="/#">
                    <BsGear className='mx-1 mr-2' />
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
export default PendchLayout;
