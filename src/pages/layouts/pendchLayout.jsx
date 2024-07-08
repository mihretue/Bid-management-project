import { Navbar, Nav } from "react-bootstrap";
import React from "react";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo6 from "../../resources/logo6.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { IoIosLogOut } from "react-icons/io";
import { Pane, Dialog } from "evergreen-ui";

const PendchLayout = () => {
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false);

  return (
    <div>
      <Navbar expand="lg" className="container fluid">
        <Navbar.Brand href="#home">
          <img
            src={logo6}
            style={{ width: "10rem", height: "2rem" }}
            alt="message"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="align-items-end">
          <Nav className="me-auto nav_item fw-bold">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link className="advLink" as={Link} to={"./messages"}>
              Messages
            </Nav.Link>
            <Nav.Link as={Link} to={"./about"}>
              About
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                window.scrollTo(
                  0,
                  document.body.scrollHeight ||
                    document.documentElement.scrollHeight
                );
              }}
            >
              Contact Us
            </Nav.Link>
          </Nav>

          <Nav style={{ fontWeight: "bold" }}>
            <DropdownButton
              id="dropdown-basic-button  "
              title={JSON.parse(localStorage.getItem("user")).fName}
            >
              <Dropdown.Item>
                <Nav.Link className="justify-content-center text-black ">
                  <Pane className="col-12 d-flex">
                    <Dialog
                      isShown={isShown}
                      title="Confirm Action"
                      onCloseComplete={() => setIsShown(false)}
                      confirmLabel="Yes"
                      onCancel={() => {
                        setIsShown(false);
                      }}
                      onConfirm={() => {
                        setIsShown(false);
                        localStorage.removeItem("user");
                        navigate("/");
                      }}
                    >
                      <p>Are You Sure You Want To Log Out?</p>
                    </Dialog>
                    <button
                      className="col-12 btn btn-danger"
                      intent="danger"
                      onClick={() => {
                        setIsShown(true);
                      }}
                    >
                      <IoIosLogOut className="mx-1" />
                      Log Out
                    </button>
                  </Pane>
                </Nav.Link>
              </Dropdown.Item>
            </DropdownButton>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      <Outlet />
    </div>
  );
};
export default PendchLayout;
