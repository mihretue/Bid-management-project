import { useParams,useNavigate  } from "react-router-dom";
import { Link } from 'react-router-dom'
import { Avatar } from 'evergreen-ui'
import {BsArrowLeft} from 'react-icons/bs'
import { useState ,useEffect} from "react";
import { Pane, Dialog, Button } from 'evergreen-ui'
import {MdAccountCircle} from 'react-icons/md'
import Footer from '../../../components/footer'
const ManageBannedAccount=()=>{
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
          console.log(res)
          setIsFetching(false)
        })
        .catch((err)=>{setIsFetching(false);setErrorFetching(true)})
      }

      const releaseAccount=()=>{
        fetch(`http://localhost:3001/release/${uid}`)
        .then((res)=>res.json())
        .then((res)=>{
            if(res.res=="ok"){
                navigate(`/userpage/admin/${id}/banned-accounts`)
            }
        })
        .catch((err)=>{})
    }
    return(<>
        <div className="container mb-5 border rounded" style={{minHeight:'20rem',height:"auto"}} >
        <div className="p-2 w-100 fluid" style={{minHeight:'2rem'}}>
           <a className="icon-link text-decoration-none text-black" href="/#">
            <BsArrowLeft className='me-2' />
            <Link className="text-decoration-none" to={`/userpage/admin/${id}/banned-accounts/`}>Back to Manage Banned Accounts</Link>
           </a>
        </div>
        <div className="container rounded my-2" style={{height:'auto'}}>
             <h4 className="text-center">User Details</h4>
             <hr />
             <div className="mx-auto" style={{width:'4rem',height:'4rem'}}>
              <MdAccountCircle color="brown"  style={{width:'100%',height:'100%'}}
            /></div>
            {isFetching?
            <p className="text-center mt-3">Fetching User Information...</p>
            :(errorFetching?'Error':<>
<table class="table mx-auto" style={{width:'70%'}}>
<tbody>
<tr className="text-center" >
  <td className="text-center border-0" colspan="2">First Name</td>
  <td className="text-center float-end fw-bold border-0">{isFetching?'Loading...':user.fName}</td>
</tr>
<tr className="text-center" >
  <td className=" border-0" colspan="2">Last Name</td>
  <td className="float-end border-0">{isFetching?'Loading...':user.LName}</td>
</tr>
<tr className="text-center" >
  <td className="border-0" colspan="2">User Name</td>
  <td className="float-end fw-bold border-0">{isFetching?'Loading...':user.uName}</td>
</tr>
<tr className="text-center" >
  <td className="border-0" colspan="2">Email Address</td>
  <td className="float-end fw-bold border-0">{isFetching?'Loading...':user.email}</td>
</tr>
<tr className="text-center" >
  <td className=" border-0" colspan="2">Role</td>
  <td className="float-end fw-bold border-0">{isFetching?'Loading...':user.role}</td>
</tr>
<tr className="text-center" >
  <td className="border-0" colspan="2">Birthday</td>
  <td className="float-end fw-bold border-0">{isFetching?'Loading...':user.bday}</td>
</tr>
<tr className="text-center" >
  <td className="border-0" colspan="2">Account Status</td>
  <td className="float-end fw-bold border-0">{isFetching?'Loading...':user.status}</td>
</tr>
<tr className="text-center" >
  <td className="border-0" colspan="2">Registered On</td>
  <td className="float-end fw-bold border-0">{isFetching?'Loading...':user.status}</td>
</tr>
</tbody>
</table>
           
        <Pane className="mb-5 mx-auto mt-2 d-flex justify-content-center">
      <Dialog
        isShown={isShown}
        title="Confirm Action"
        onCloseComplete={() => setIsShown(false)}
        confirmLabel="Confirm"
        onCancel={() => {setIsShown(false)}}
        onConfirm={() => {setIsShown(false);releaseAccount()}}
        
      >
       Are you sure you want to release this account?

      </Dialog>
      <Button className="bg-primary text-white" onClick={() => setIsShown(true)}>Release Account</Button>
    </Pane></>)}
    </div> 
    </div>
    <Footer />
    </>)
}

export default ManageBannedAccount;