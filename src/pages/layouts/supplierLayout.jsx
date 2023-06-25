import {Navbar,Nav} from "react-bootstrap";
import React from 'react';
import {Link,Outlet } from "react-router-dom";
import logo6 from "../../resources/logo6.png";
import {useState,useEffect} from 'react';
import { useParams,useNavigate  } from "react-router-dom";
import {BsGear} from 'react-icons/bs';
import {IoIosLogOut} from "react-icons/io";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Pane, Dialog} from 'evergreen-ui'

const SupplierLayout=()=>{
  const {id,uid} =useParams();
  const [user,setUser]=useState({})
  const [isFetching,setIsFetching]=useState(false)
  const [errorFetching,setErrorFetching]=useState(false)
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState(false)
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
    <div>
        <Navbar expand="lg"className="container fluid" >
        <Navbar.Brand href="#home"><img src={logo6} style={{width:'10rem',height:'2rem'}} alt="message"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="">
          <Nav className="me-auto nav_item">
            <Nav.Link as={Link} to={"/"} >Home</Nav.Link>
            <Nav.Link className="advLink" as={Link} to={"./tenders"} >Tenders</Nav.Link>
            <Nav.Link className="advLink" as={Link} to={"./bid-awards"} >Bid Awards</Nav.Link>
            <Nav.Link as={Link} to={`./messages`} >Messages</Nav.Link>
          </Nav> 
          <Nav className="me-3">
            <Nav.Link as={Link} to={"./about"} >About</Nav.Link>
            <Nav.Link as={Link} to={"./contact"} >Contact Us</Nav.Link>
          </Nav>
          <Nav className="btn-success">
              <DropdownButton id="dropdown-basic-button" title={JSON.parse(localStorage.getItem('user')).fName}>
                <Dropdown.Item>
                  <Nav.Link as={Link}  to={"./pages/user action pages/bidder/setting"} className="icon-link  text-decoration-none text-black  justify-content-center align-items-center" href="/#">
                    <BsGear className='mx-1' />
                      Settings
                  </Nav.Link>
                </Dropdown.Item>
                <Dropdown.Item >
                    <Nav.Link  className="justify-content-center text-black ">
                    <Pane className="mx-auto col-6 mt-2 d-flex justify-content-center">
      <Dialog
        isShown={isShown}
        title="Confirm Action"
        onCloseComplete={() => setIsShown(false)}
        confirmLabel="Yes"
        onCancel={() => {setIsShown(false)}}
        onConfirm={() => {setIsShown(false);localStorage.removeItem("user"); navigate("/")}}
      >
        <p>Are You Sure You Want To Cancel This Bid?</p>
        <p className="mt-3" style={{fontSize:'0.8rem'}}>Note that this can't be undone.</p>
      </Dialog>
      <IoIosLogOut  className='mx-1'/>
                        Log Out
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
export default SupplierLayout;
