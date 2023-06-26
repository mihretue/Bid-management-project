import {Navbar,Nav} from "react-bootstrap";
import React from 'react';
import {TfiEmail} from "react-icons/tfi";
import logo6 from "../../resources/logo6.png";
import {Link,Outlet } from "react-router-dom";
const Layout=()=>{
return(
    <div >
        <Navbar expand="lg"className="container fluid" >
          <Navbar.Brand href="#home"><img src={logo6} style={{width:'10rem',height:'2rem'}} alt="cheretanet"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="align-items-end " style={{fontFamily:'Bold700italic'}}>
          <Nav className="me-auto nav_item main_layout text-bold panew" >
            <Nav.Link style={{fontFamily:"'Cambria, Cochin, Georgia, Times, 'Times New Roman', serif !important"}} as={Link} to={"/"} >Home</Nav.Link>
            <Nav.Link style={{fontFamily:"'Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}} as={Link} to={"/tenders"} >Tenders</Nav.Link>
            <Nav.Link style={{fontFamily:"'Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}} as={Link} to={"/bid-awards"} >Bid Awards</Nav.Link>
            <Nav.Link style={{fontFamily:"'Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}} as={Link} to={"/about"} >About</Nav.Link>
            <Nav.Link onClick={()=>{
              window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
            }} >Contact Us</Nav.Link>
          </Nav>
          <Nav style={{marginLeft:'0px'}}>
            <Nav.Link style={{fontFamily:"'Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}} as={Link} to={"/login"}  ><button className="btn btn-primary border rounded">Login</button></Nav.Link>
            <Nav.Link style={{fontFamily:"'Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}} as={Link} to={"/signup"} ><button className="btn btn-secondary border rounded">Sign Up</button></Nav.Link>
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
    <Outlet  />
      </div>
)
}
export default Layout;
