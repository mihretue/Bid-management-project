
import {Navbar,Nav} from "react-bootstrap";
import React, { Component } from 'react';
import {Link} from "react-router-dom";
// import {AiFillBell} from "react-icons/ai";
import {TfiEmail} from "react-icons/tfi";
// import {RiAccountCircleFill} from "react-icons/ri";
// import imag1 from "../resources/new.png";
// import logo2 from "../resources/logo2.png";

// import logo3 from "../resources/logo3.png";
// import logo4 from "../resources/logo4.png";
// import logo5 from "../resources/logo5.png";
import logo6 from "../resources/logo6.png";






export default class Navbarcomp extends Component {
  render() {
    return (
      <div >
        <Navbar  expand="lg"className="container fluid" >
          <Navbar.Brand href="#home"><img src={logo6} style={{width:'10rem',height:'2rem'}} alt="message"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="align-items-end">
          <Nav className="me-auto nav_item fw-bold" >
            <Nav.Link as={Link} to={"/"} >Home</Nav.Link>
            <Nav.Link as={Link} to={"/adverts"} >Advertidems</Nav.Link>
            <Nav.Link as={Link} to={"/about"} >About</Nav.Link>
            <Nav.Link as={Link} to={"/contacts"} >Contact us</Nav.Link>
          </Nav>
          <Nav style={{ fontWeight: 'bold' }}>
            <Nav.Link as={Link} to={"/login"} ><button className="btn btn-primary">Login</button></Nav.Link>
            <Nav.Link as={Link} to={"/register"} ><button className="btn btn-outline-secondary">Sign Up</button></Nav.Link>
            <Nav.Link as={Link} to={"/message "} ><TfiEmail size={30} data-toggle="tooltip" data-placement="bottom" title="Mail us" /></Nav.Link>
            {/* <Nav.Link as={Link} to={"/profile"} ><RiAccountCircleFill size={30}/></Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      
    </Navbar>
      </div>
    )
  }
}
