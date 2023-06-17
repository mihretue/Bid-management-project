import { useParams,useNavigate  } from "react-router-dom";
import { Link } from 'react-router-dom'
import { Avatar } from 'evergreen-ui'
import {BsArrowLeft} from 'react-icons/bs'
import { useState ,useEffect} from "react";
import { Pane, Dialog, Button } from 'evergreen-ui'


const ManageActiveUser=()=>{
    const {id,uid}=useParams();
    const [user,setUser]=useState({})
    const [isFetching,setIsFetching]=useState(false)
    const [errorFetching,setErrorFetching]=useState(false)
    const [isShown, setIsShown] = useState(false)
    const navigate=useNavigate()
    useEffect(()=>{
       fetchUserData()
    },[])
    const fetchUserData=()=>{
      setIsFetching(true)
      fetch(`http://localhost:3001/userbyid/${uid}`)
      .then((res)=>res.json())
      .then((res)=>{
        setUser(res)
        setIsFetching(false)
      })
      .catch((err)=>{setIsFetching(false);setErrorFetching(true)})
    }

    const banAccount=()=>{
      setIsFetching(true)
      fetch(`http://localhost:3001/ban/${uid}`)
      .then((res)=>res.json())
      .then((res)=>{
          if(res.res=="ok"){
              setIsFetching(false)
              navigate(`/userpage/admin/${id}/active-accounts`)
          }
      })
      .catch((err)=>{
        setErrorFetching(true)
      })
  }

    return(
        <div className="container border rounded" style={{minHeight:'20rem',height:"auto"}} >
        <div className="p-2 w-100 fluid" style={{minHeight:'2rem'}}>
           <a className="icon-link text-decoration-none text-black" href="/#">
            <BsArrowLeft className='me-2' />
            <Link className="text-decoration-none" to={`/userpage/admin/${id}/active-accounts/`}>Back to Manage Active User Accounts</Link>
           </a>
        </div>
        <div className="container rounded my-2" style={{height:'auto'}}>
             <h4 className="text-center">User Details</h4>
             <hr />
             <Avatar
              src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg"
              name="Alan Turing"
              size={80}
              className="mx-auto d-block"
            />
            {isFetching?'Fetching...':(errorFetching?'Error':
<>
<table class="table mx-auto" style={{width:'70%'}}>
<tbody>
<tr className="text-center" >
  <td className="text-center border-0" colspan="2">First Name</td>
  <td className="text-center float-end border-0">{isFetching?'Loading...':user.fName}</td>
</tr>
<tr className="text-center" >
  <td className=" border-0" colspan="2">Last Name</td>
  <td className="float-end border-0">{isFetching?'Loading...':user.LName}</td>
</tr>
<tr className="text-center" >
  <td className="border-0" colspan="2">User Name</td>
  <td className="float-end border-0">{isFetching?'Loading...':user.uName}</td>
</tr>
<tr className="text-center" >
  <td className="border-0" colspan="2">Email Address</td>
  <td className="float-end border-0">{isFetching?'Loading...':user.email}</td>
</tr>
<tr className="text-center" >
  <td className=" border-0" colspan="2">Role</td>
  <td className="float-end border-0">{isFetching?'Loading...':user.role}</td>
</tr>
<tr className="text-center" >
  <td className="border-0" colspan="2">Birthday</td>
  <td className="float-end border-0">{isFetching?'Loading...':user.bday}</td>
</tr>
<tr className="text-center" >
  <td className="border-0" colspan="2">Account Status</td>
  <td className="float-end border-0">{isFetching?'Loading...':user.status}</td>
</tr>
<tr className="text-center" >
  <td className="border-0" colspan="2">Registered On</td>
  <td className="float-end border-0">{isFetching?'Loading...':user.status}</td>
</tr>
</tbody>
</table>
<Pane className="mb-5 mx-auto mt-2 d-flex justify-content-center">
      <Dialog
        isShown={isShown}
        title="Confirm Banning"
        onCloseComplete={() => setIsShown(false)}
        confirmLabel="Confirm"
        onCancel={() => {setIsShown(false)}}
        onConfirm={() => {setIsShown(false);banAccount()}}
        
      >
        Ban User Account?
      </Dialog>
      <Button className="bg-primary text-white" onClick={() => setIsShown(true)}>Ban User Account</Button>
    </Pane>
</>
                
            )}
            {
                
            }
            
        </div>
    </div>)
}

export default ManageActiveUser;