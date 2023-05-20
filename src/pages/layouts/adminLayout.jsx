import {Navbar,Nav} from "react-bootstrap";
import React from 'react';
import {Link,Outlet } from "react-router-dom";
import Profile from "../../resources/profile.jpg";
import logo6 from "../../resources/logo6.png";
import {MdAccountCircle} from 'react-icons/md'
// import FontAwesomeIcon from "@fortawesome/fontawesome-free";
const AdminLayout=()=>{
return(
    <div>
        <Navbar expand="lg"className="container fluid align-items-center" >
        <Navbar.Brand href="#home"><img src={logo6} style={{width:'10rem',height:'2rem'}} alt="message"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="align-items-end">
          <Nav className="me-auto nav_item fw-bold" >
            <Nav.Link as={Link} to={"./"} >Home</Nav.Link>
          </Nav>
          <Nav style={{ fontWeight: 'bold' }}>
          <Nav.Link className="rounded" as={Link} to={"/profile"} >
            <button className="btn  border-0 rounded">
             <MdAccountCircle className='rounded' size='small' style={{borderRadius:'1rem',width:'2rem',height:'2rem'}} />
            </button>
          </Nav.Link>
          </Nav> 

        </Navbar.Collapse>
      
    </Navbar>
    <Outlet  />
      </div>
)
}
export default AdminLayout;
