import {Navbar,Nav} from "react-bootstrap";
import React from 'react';
import {TfiEmail} from "react-icons/tfi";
import logo6 from "../../resources/logo6.png";
import {Link,Outlet } from "react-router-dom";
const Layout=()=>{
return(
    <div >
        <Navbar expand="lg"className="container fluid" >
          <Navbar.Brand href="#home"><img src={logo6} style={{width:'10rem',height:'2rem'}} alt="message"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="align-items-end " style={{fontFamily:'Bold700italic'}}>
          <Nav className="me-auto nav_item main_layout text-bold panew" >
            <Nav.Link as={Link} to={"/"} ><p className="m-0">Home</p></Nav.Link>
            <Nav.Link as={Link} to={"/tenders"} >Tenders</Nav.Link>
            <Nav.Link as={Link} to={"/about"} >About</Nav.Link>
           <Nav.Link as={Link} to={"contact"} >Contact Us</Nav.Link>
          </Nav>
          <Nav style={{marginLeft:'0px'}}>
            <Nav.Link as={Link} to={"/login"} ><button className="btn text-dark" style={{marginLeft:"-10px"}}>Login</button></Nav.Link>
            <Nav.Link as={Link} to={"/signup"} ><button className="btn" style={{marginLeft:"-10px"}}>Sign Up</button></Nav.Link>
            <Nav.Link as={Link} to={"/mailus"} ><TfiEmail size={25} data-toggle="tooltip" data-placement="bottom" title="Mail us" style={{marginLeft:'10px'}}/></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
    <Outlet  />
      </div>
)
}
export default Layout;
