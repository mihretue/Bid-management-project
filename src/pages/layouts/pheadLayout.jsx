import {Navbar,Nav} from "react-bootstrap";
import React, { useState,useEffect } from 'react';
import './style.css'
import {Link,Outlet,useParams,useNavigate } from "react-router-dom";
import BackImage from "../../resources/backuser.jpg";
import logo6 from "../../resources/logo6.png";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {IoIosLogOut} from "react-icons/io";
import {BsGear} from "react-icons/bs"
import { colors } from "@material-ui/core";
import { Pane, Dialog} from 'evergreen-ui'

const PheadLayout=()=>{
  const {id,uid} =useParams();
  const [user,setUser]=useState({})
  const [isFetching,setIsFetching]=useState(false)
  const [errorFetching,setErrorFetching]=useState(false)
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false)
  // localStorage.removeItem('user')
  useEffect(()=>{
    fetchUserData()
 },[])
 const fetchUserData=()=>{
     setIsFetching(true)
     fetch(`http://localhost:3001/userbyid/${id}`)
     .then((res)=>res.json())
     .then((res)=>{
       setUser(res)
       setIsFetching(false)
     })
     .catch((err)=>{
      setIsFetching(false);
      setErrorFetching(true)})
   }
return(
    <div >
        <Navbar expand="lg"className="container fluid" >
        <Navbar.Brand href="#home"><img src={logo6} style={{width:'10rem',height:'2rem'}} alt="message"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="align-items-end" style={{fontFamily:'Adamina, serif'}}>
          <Nav className="me-auto nav_item " >
            <Nav.Link as={Link} to={"/"} className="pheadlay">Home</Nav.Link>
            <Nav.Link className="advLink" as={Link} to={"./messages"} >Messages</Nav.Link>
            <Nav.Link as={Link} to={"./about"} >About</Nav.Link>
            <Nav.Link onClick={()=>{
              window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
            }} >Contact Us</Nav.Link>
          </Nav>
          <Nav style={{ fontWeight: 'bold' }}>
          <DropdownButton id="dropdown-basic-button  "  title={JSON.parse(localStorage.getItem('user')).fName} >
                <Dropdown.Item>
                    <Nav.Link  className="justify-content-center text-black ">
                      <Pane className="col-12 d-flex">
      <Dialog
        isShown={isShown}
        title="Confirm Action"
        onCloseComplete={() => setIsShown(false)}
        confirmLabel="Yes"
        onCancel={() => {setIsShown(false)}}
        onConfirm={() => {setIsShown(false);localStorage.removeItem("user"); navigate("/")}}
      >
        <p>Are You Sure You Want To Log Out?</p>
      </Dialog>
      <button className="col-12 btn btn-danger"  intent="danger" onClick={() => {setIsShown(true)}}>
      <IoIosLogOut  className='mx-1'/>
                        Log Out
      </button>
          </Pane>
                    </Nav.Link>
                </Dropdown.Item>
        </DropdownButton>
          </Nav> 
        </Navbar.Collapse>
    </Navbar>
    <Outlet  />
      </div>
)
}
export default PheadLayout;
