import { useParams,Link,useNavigate } from "react-router-dom";
import Footer from '../components/footer'
import { BsArrowLeft } from "react-icons/bs";
import { useEffect,useState } from "react";
import { Pane, Dialog} from 'evergreen-ui'

const Message=()=>{
    const {id,mid}=useParams()
    const navigate=useNavigate()
    const [message,setMessage]=useState({})
    const [isFetching,setIsFetching]=useState(false)
    const [errorFetching,setErrorFetching]=useState(false)
    const [isDeleting,setIsDeleting]=useState(false)
    const [errorDeleting,setErrorDeleting]=useState(false)
    const fetchMessage=()=>{
        setIsFetching(true)
       fetch(`http://localhost:3001/getmessage/${mid}`)
       .then((res)=>res.json())
       .then((res)=>{        
        setIsFetching(false)
        setMessage(res)})
       .catch(()=>{setErrorFetching(true)})
    }

    const deleteMessage=()=>{
        setIsDeleting(true)
        document.getElementById('del_btn').disabled=true
       fetch(`http://localhost:3001/deletemessage/${mid}`)
       .then((res)=>res.json())
       .then((res)=>{     
        if(res.res=="ok"){
          setIsDeleting(false)
          document.getElementById('del_res').innerHTML="Deleted Successfully!"
          setTimeout(()=>{
            switch(JSON.parse(localStorage.getItem('user')).role){
              case "bidder":
                navigate(`/userpage/supplier/${id}/messages`)
                document.getElementById('del_res').innerHTML=""
          document.getElementById('del_btn').disabled=false
                break;
              case "procurement department head":
                navigate(`/userpage/phead/${id}/messages`)
                document.getElementById('del_res').innerHTML=""
          document.getElementById('del_btn').disabled=false
                break;
              case "procurement endorsing committee head":
                navigate(`/userpage/pendch/${id}/messages`)
                document.getElementById('del_res').innerHTML=""
          document.getElementById('del_btn').disabled=false
                break;
              case "ppa it officer":
                navigate(`/userpage/admin/${id}/messages`)
                document.getElementById('del_res').innerHTML=""
          document.getElementById('del_btn').disabled=false
                break;
              default :
;
            }
          },3000)
          }
        else {
          setErrorDeleting(true)
          document.getElementById('del_res').innerHTML="Error Deleting Message!"
          document.getElementById('del_btn').disabled=false
          console.log(res)
        }
        })
       .catch(()=>{setErrorDeleting(true);document.getElementById('del_res').innerHTML="Error Deleting Message!"})
    }

    const [isShown, setIsShown] = useState(false)
    useEffect(()=>{fetchMessage()},[])
return(<>
<div className="container p-2" style={{minHeight:'2rem'}}>
               <a className="icon-link text-decoration-none text-black">
                <BsArrowLeft className='me-2' />
                {JSON.parse(localStorage.getItem('user')).role=="bidder"&&<Link className="text-decoration-none" to={`/userpage/supplier/${id}/messages`}>Back to All Messages</Link>}
                {JSON.parse(localStorage.getItem('user')).role=="procurement department head"&&<Link className="text-decoration-none" to={`/userpage/phead/${id}/messages`}>Back to All Messages</Link>}
                {JSON.parse(localStorage.getItem('user')).role=="procurement endorsing committee head"&&<Link className="text-decoration-none" to={`/userpage/pendch/${id}/messages`}>Back to All Messages</Link>}
                {JSON.parse(localStorage.getItem('user')).role=="ppa it officer"&&<Link className="text-decoration-none" to={`/userpage/admin/${id}/messages`}>Back to All Messages</Link>}
               </a>
    </div>
    <div className="border mb-5 container rounded" style={{minHeight:'10rem'}}>
        <h3 className="text-center">Message Details</h3>
        {isFetching?
        <div className="mx-auto" style={{width:'5rem'}}>Fetching...</div>:(errorFetching?
        <div className="mx-auto text-danger" style={{width:'5rem'}}>Error Fetching!</div>:
        <div className="mx-auto container" style={{minHeight:'10rem'}}>
            <ul className="list-unstyled">
                <li>{message.from==JSON.parse(localStorage.getItem('user')).email?"To :":"From :"} <p className="m-0 d-inline fw-bold">{message.from_name}</p></li>
                <li className="mt-2">Subject : <p className="m-0 d-inline fw-bold">{message.subject}</p></li>
                <li className="mt-2">Message : <div className="border container p-2"style={{maxHeight:'5rem',overflow:'auto'}}>
                    <p className="m-0 d-inline text-break" style={{fontSize:'0.9rem'}}>{message.body}
                    </p>
                              </div>
                </li>{message.file&&
                <li className="mt-2">Attached File : <div className="d-inline-block container p-2"style={{maxHeight:'5rem',overflow:'auto'}}>
                    <a href={`/backend/uploads/msgfiles/${message.file}`} download>
                        <button className="btn btn-primary">Download File</button>
                    </a>
                              </div>
                </li>}
            </ul>
            <hr />
            <Pane className="mx-auto mt-2 d-flex justify-content-center">
      <Dialog
        isShown={isShown}
        title="Confirm Action"
        onCloseComplete={() => setIsShown(false)}
        confirmLabel="Confirm"
        onCancel={() => {setIsShown(false)}}
        onConfirm={() => {setIsShown(false);deleteMessage()}}
      >
        Are You Sure You Want To Delete This Message ?
      </Dialog>
      <button id="del_btn" className="btn btn-danger " onClick={()=>{setIsShown(true)}}>Delete</button>

    </Pane>
    <p id="del_res" className="text-center mt-1 mx-0 mb-3"></p>
        </div>)}
    </div>
    
{JSON.parse(localStorage.getItem('user')).role!=="ppa it officer"&&<Footer />}
</>)
}

export default Message;