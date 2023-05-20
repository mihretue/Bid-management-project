import {Navbar,Nav} from "react-bootstrap";
import React from 'react';
import {Link,Outlet } from "react-router-dom";
import Profile from "../../resources/profile.jpg";
import logo6 from "../../resources/logo6.png";
// import FontAwesomeIcon from "@fortawesome/fontawesome-free";
const AdminLayout=()=>{
return(
    <div>
        <Navbar expand="lg"className="container fluid" >
        <Navbar.Brand href="#home"><img src={logo6} style={{width:'10rem',height:'2rem'}} alt="message"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="align-items-end">
          <Nav className="me-auto nav_item fw-bold" >
            <Nav.Link as={Link} to={"./"} >Home</Nav.Link>
            <Nav.Link className="advLink" as={Link} to={"/tenders"} >Tenders</Nav.Link>
            <Nav.Link as={Link} to={"/about"} >d</Nav.Link>
            <Nav.Link as={Link} to={"contact"} >Contact Us</Nav.Link>

          </Nav>
          <Nav style={{ fontWeight: 'bold' }}>
          <Nav.Link as={Link} to={"/manageuseraccount"} ><button className="btn btn-outline-secondary">Manage User Account</button></Nav.Link>
          <Nav.Link as={Link} to={"/profile"} ><button className="btn btn-outline-secondary"><img src={Profile} style={{height:"1.5rem",width:"1.5rem"}} alt="profiel image"/></button></Nav.Link>
          </Nav> 

        </Navbar.Collapse>
      
    </Navbar>
    <Outlet  />
      </div>
)
}
export default AdminLayout;
