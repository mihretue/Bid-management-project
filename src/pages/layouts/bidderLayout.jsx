import React, { Component } from 'react'
import {Navbar,Nav} from "react-bootstrap";
import logo6 from "../../resources/logo6.png";
import {Link,Outlet } from "react-router-dom";

export default class bidderLayout extends Component {
  render() {
    return (
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
          
        </Navbar.Collapse>
    </Navbar>
    <Outlet  />
      </div>
    )
  }
}
