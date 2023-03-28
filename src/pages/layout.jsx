import {Navbar,Nav} from "react-bootstrap";
import React from 'react';
import {TfiEmail} from "react-icons/tfi";
import logo6 from "../resources/logo6.png";
import {Link,Outlet } from "react-router-dom";
const Layout=()=>{
return(
    <div>
        <Navbar expand="lg"className="container fluid" >
          <Navbar.Brand href="#home"><img src={logo6} style={{width:'10rem',height:'2rem'}} alt="message"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="align-items-end">
          <Nav className="me-auto nav_item fw-bold" >
            <Nav.Link as={Link} to={"/"} >Home</Nav.Link>
            <Nav.Link as={Link} to={"/adverts"} >Bid Advertisements</Nav.Link>
            <Nav.Link as={Link} to={"/about"} >About</Nav.Link>
           <Nav.Link as={Link} to={"contact"} >Contact Us</Nav.Link>

          </Nav>
          <Nav style={{ fontWeight: 'bold' }}>
            {!localStorage.getItem('user')&&
            <Nav.Link as={Link} to={"/login"} ><button className="btn btn-primary">Login</button></Nav.Link>}
            {
            !localStorage.getItem('user')&&
            <Nav.Link as={Link} to={"/signup"} ><button className="btn btn-outline-secondary">Sign Up</button></Nav.Link>}
            <Nav.Link as={Link} to={"/mailus"} ><TfiEmail size={30} data-toggle="tooltip" data-placement="bottom" title="Mail us" /></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
    <Outlet  />
      </div>
)
}
export default Layout;
