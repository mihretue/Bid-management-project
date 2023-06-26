import React,{useEffect,useState} from "react";
import {CgProfile} from 'react-icons/cg'
import { useParams } from "react-router-dom";
import Footer from '../../../components/footer'
import { Button,Form,Modal,TrashIcon,TickIcon,ManualIcon,KeyIcon,EditIcon } from 'evergreen-ui'
import { setDate } from "date-fns";
import { dateconverter } from "../../../services/date converter";
const Setting = ()=>{

    const {id} = useParams();
    const [data,setData]=useState({fName:JSON.parse(localStorage.getItem('user')).fName,lName:JSON.parse(localStorage.getItem('user')).lName,email:JSON.parse(localStorage.getItem('user')).email,oemail:JSON.parse(localStorage.getItem('user')).email,pass:JSON.parse(localStorage.getItem('user')).pass,cpass:'',bDay:''})
    const [isFetching,setIsFetching]=useState(false)
    const [errorFetching,setErrorFetching]=useState(false)
    const [user,setUser] =useState()
    const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleChange = (event) =>{
        const {name,value}=event.target
        setData({...data,[name]:value})
    } 

    const handleSubmit = (event) => {
      event.preventDefault();
      data.bDay=dateconverter(data,"signup")
      console.log(data);
    //   handleCloseModal();
    editProfile()
    };

    const editProfile=()=>{
      fetch('http://localhost:3001/editprofile',{
        method:"post",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)
      }).then((res=>res.json())
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=>{
        console.log(err)
      }
    }

    useEffect(()=>{
        fetchUserData();
     },[])
     const fetchUserData=()=>{
         setIsFetching(true)
         fetch(`http://localhost:3001/userbyid/${id}`)
         .then((res)=>res.json())
         .then((res)=>{
           setUser(res)
           setIsFetching(false)
         })
         .catch((err)=>{setIsFetching(false);setErrorFetching(true)})
       }
    return(<>
        <div className="container p-2 mb-5 border rounded d-flex flex-column justify-content-center align-items-center " style={{width:'70%'}} >
            <div className="d-flex flex-column justify-content-center align-items-center">
                <CgProfile  className="justify-content-center align-items-center" style={{width:'20rem',height:'3rem',color:'darkgoldenrod'}} />
                <h2 className="text-center">{JSON.parse(localStorage.getItem('user')).fName}</h2>
            </div>
            <div className="w-100">
              <ul className="list-unstyled">
                <li>First Name : <p className="fw-bold m-0 d-inline">{JSON.parse(localStorage.getItem('user')).fName}</p></li>
                <li>Last Name : <p className="fw-bold m-0 d-inline">{JSON.parse(localStorage.getItem('user')).lName}</p></li>
                <li>Email : <p className="fw-bold m-0 d-inline">{JSON.parse(localStorage.getItem('user')).email}</p></li>
                <li>Birthday: <p className="fw-bold m-0 d-inline">{JSON.parse(localStorage.getItem('user')).bDay}</p></li>
                {JSON.parse(localStorage.getItem('user')).pBody!=="no"&&<li>Public Body : <p className="fw-bold m-0 d-inline">{JSON.parse(localStorage.getItem('user')).pBody}</p></li>}
              </ul> 
            </div>
            <div className="container mx-auto d-flex justify-content-center">
               <Button onClick={handleShowModal} className="bg-primary text-white" iconBefore={<EditIcon />}>Edit Profile</Button>
      <div className={`modal ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Profile</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              <form id="form" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fname" className="form-label">First Name</label>
                  <input name="fName" required type="text" className="form-control" id="fname" value={data.fName} onChange={handleChange} />
                  <label htmlFor="lname" className="form-label">Last Name</label>
                  <input name="lName"  required type="text" className="form-control" id="lname" value={data.lName} onChange={handleChange} />
                  <label htmlFor="email" className="form-label">Email</label>
                  <input name="email"  required type="email" className="form-control" id="email" value={data.email} onChange={handleChange} />
                  <label htmlFor="bday" className="form-label">Birthday</label>
                  <input name="bDay"  required type="date" className="form-control" id="bday" value={data.bDay} onChange={handleChange} />
                  <label htmlFor="npass" className="form-label">New Password</label>
                  <input name="pass"  required type="password" className="form-control" id="npass" value={data.pass} onChange={handleChange} />
                  <label htmlFor="cpass" className="form-label">Confirm New Password (if no password change, skip this.)</label>
                  <input name="cpass"  required={data.pass!==JSON.parse(localStorage.getItem('user')).pass} type="password" className="form-control" id="cpass" value={data.cpass} onChange={handleChange} />
                 </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
              <button type="submit" form="form" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
            </div>
        </div>   
        <Footer />
        </>
    )
}

export default Setting;
