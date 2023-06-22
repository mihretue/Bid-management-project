import React from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Pane, Tablist, Tab, Paragraph } from 'evergreen-ui'
import TextField from '@mui/material/TextField';
import { useEffect } from 'react'
import { validator } from '../../services/validator'
export default function SidebarTabsExample() {
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const tabs = React.useMemo(() => ['New Message','Inbox', 'Sent'], [])
  const [inbox,setInbox]=useState([])
  const [inboxIsFetching,setInboxIsFetching]=useState(false)
  const [inboxErrorFetching,setInboxErrorFetching]=useState(false)
  const [sent,setSent]=useState([])
  const [isSending,setIsSending]=useState(false)
  const [sentIsFetching,setSentIsFetching]=useState(false)
  const [sentErrorFetching,setSentErrorFetching]=useState(false)
  const [result,setResult]=useState({value:"",error:false})
  const [newMsg,setNewMsg]=useState({to:"",from_name:JSON.parse(localStorage.getItem('user')).name,from:JSON.parse(localStorage.getItem('user')).email,subject:"",body:"",file:""})
  const fetchInbox=()=>{
    setInboxIsFetching(true)
    fetch(`http://localhost:3001/getinbox?email=${JSON.parse(localStorage.getItem('user')).email}`)
    .then((res)=>res.json())
    .then((res)=>{
     setInboxIsFetching(false)
        setInbox(res)
    }).catch((err)=>{
        setInboxErrorFetching(true)
    })
  }

  const fetchSent=()=>{
    setSentIsFetching(true)
    fetch(`http://localhost:3001/getsent?email=${JSON.parse(localStorage.getItem('user')).email}`)
    .then((res)=>res.json())
    .then((res)=>{
     setSentIsFetching(false)
        setSent(res)
    }).catch((err)=>{
        setSentErrorFetching(true)
    })
  }

  const handleChange=(e)=>{
     const {name,value}=e.target;
     setNewMsg({...newMsg,[name]:value})
  }

  const handleSubmit=(e)=>{
  e.preventDefault()
  document.getElementById('subbtn').disabled=true
  if(validator(newMsg,"new_message")=="em"){
     setNewMsg({...newMsg,toError:true,toErrorM:"Invalid Email Format"})
     document.getElementById('subbtn').disabled=false
  }else{
    setNewMsg({...newMsg,toError:false,toErrorM:""})
   setIsSending(true)
  if(file) {setNewMsg({...newMsg,file:file})}
  fetch('http://localhost:3001/savemsg',{
    method:'post',
    headers:{'Content-Type':"application/json"},
    body:JSON.stringify(newMsg)
  }).then((res)=>res.json())
  .then((res)=>{
    if(res.res=="ok"){
        setResult({value:"Message Sent Successfully!"})
         setIsSending(false)
         setNewMsg({to:"",from_name:JSON.parse(localStorage.getItem('user')).name,from:JSON.parse(localStorage.getItem('user')).email,subject:"",body:"",file:""})
         setTimeout(()=>{
           setSelectedIndex(2);fetchSent();
         },3000)
    }else{
        setResult({value:"Error Sending Message, Please Try again."})
    }
  })
  .catch((err)=>{console.log(err)})
  }}
  const [file,setFile]=useState(null)

  const handleFileChange=(event)=>{
    setFile(event.target.files[0]);
}

  useEffect(()=>{fetchInbox();fetchSent()},[])

  const navigate = useNavigate();
  const  {id}= useParams();

  return (
    <Pane className='row container-fluid pb-5 p-2' style={{height:'auto'}}>
      <Tablist className="col-md-3 col-12" style={{height:'auto'}}>
        {tabs.map((tab, index) => {
          return (
            <Tab
              aria-controls={`panel-${tab}`}
              direction="vertical"
              isSelected={index === selectedIndex}
              key={tab}
              onSelect={() => setSelectedIndex(index)}
              className={tab=="New Message"&&"bg-success w-50 text-white"}
            >
               {tab}
            </Tab>
          )
        })}
      </Tablist>
      <Pane className="col-md-9 col-12 " style={{height:'auto'}}>
        {tabs.map((tab, index) => (
          <Pane
            aria-labelledby={tab}
            aria-hidden={index !== selectedIndex}
            display={index === selectedIndex ? 'inline-block' : 'none'}
            key={tab}
            role="tabpanel"
            className='container-fluid'
          >
            {tab=="Inbox"?
            <div className='w-100' style={{minHeight:'10rem',height:"auto"}}>
               <div className='row align-items-center'>
                   <h3 className='m-0 text-center col-10 fs-6'>Inbox Messages</h3>
                   <button onClick={fetchInbox} className='text-white btn ms-auto col-2 rounded bg-dark'>Refresh</button>
                </div>
               {inboxIsFetching?
               <div className='mt-2 container border rounded p-4 text-center'>
                 Fetching Inbox Messages...
               </div>
               :(inboxErrorFetching?
                <div className='mt-2 container text-danger border rounded p-4 text-center'>
                 Error Fetching Inbox Messages...
               </div>:(inbox.length==0?
               <div className='mt-2 container border rounded p-4 text-center'>
                 No Inbox Messages
             </div>:
                <div className='d-flex overflow-y-auto flex-column justify-content-center container-fluid my-3 mx-auto' style={{minHeight:'10rem',maxHeight:'20rem'}}>
                 {inbox.map((inb)=>{
                       return(
                        <div onClick={()=>{navigate(`/userpage/supplier/${id}/messages/${inb._id}`)}} className='row border mt-1' style={{height:'3rem',cursor:'pointer'}}>
                          <div className='col-2 justify-content-center align-items-center d-flex'>
                          <p className="d-inline-flex m-0 border rounded p-1" style={{backgroundColor:inb.Seen?'white':'red'}} >
                           {inb.seen==true?"Seen":"New"}
                          </p>
                          </div>
                          <div className='col-8 row'>
                            <div className='fw-bold col-12'>{inb.from_name}</div>
                            <div className=' col-12 row'>
                            <div className=' col-8 text-truncate' style={{fontSize:'0.8rem'}}>
                                {inb.body}
                            </div>
                            <div className=' col-4 fw-bold' style={{fontSize:'0.8rem'}}>
                                {inb.file?"File":""}
                            </div>
                            </div>
                          </div>
                          <div className='col-2 justify-content-center align-items-center d-flex'>12:30PM</div>
                        </div>
                       )
                 })}
               </div>))}
            </div>
            :
            (tab=="Sent"?
            <div className='w-100' style={{minHeight:'10rem',height:"auto"}}>
                <div className='row align-items-center'>
                   <h3 className='m-0 text-center col-10 fs-6'>Sent Messages</h3>
                   <button onClick={fetchSent} className='text-white btn ms-auto col-2 rounded bg-dark'>Refresh</button>
                </div>
               {sentIsFetching?
               <div className='container mt-2 border rounded p-4 text-center'>
               Fetching Sent Messages...
             </div>:(sentErrorFetching?
             <div className='mt-2 container text-danger border rounded p-4 text-center'>
             Error Fetching Sent Messages!
           </div>:(sent.length==0?
           <div className='mt-2 container border rounded p-4 text-center'>
                No Sent Messages
             </div>:
                <div className='d-flex overflow-y-auto flex-column justify-content-center container-fluid my-3 mx-auto' style={{minHeight:'10rem',maxHeight:'20rem'}}>
                 {sent.map((snt)=>{
                       return(
                        <div onClick={()=>{navigate(`/userpage/supplier/${id}/messages/${snt._id}`)}} className='row border mt-1' style={{height:'3rem',cursor:'pointer'}}>
                          <div className='col-10 row'>
                            <div className='fw-bold col-12'>{snt.to}</div>
                            <div className=' col-12 row'>
                              <div className=' col-8 text-truncate' style={{fontSize:'0.8rem'}}>{snt.body}</div>
                              <div className=' col-4 fw-bold' style={{fontSize:'0.8rem'}}>
                                {snt.file?"File":""}
                            </div>
                             </div>
                           </div>
                          <div className='col-2 justify-content-center align-items-center d-flex'>12:30PM</div>
                        </div>
                       )
                 })}
               </div>))}
            </div>
            :
          (tab=="New Message"?
            <div className='w-100' style={{minHeight:'10rem',height:"auto"}}>
               <h3 className='m-0 text-center pt-3 fs-6'>New Message</h3>
               <div className='justify-between container my-3 mx-auto' style={{minHeight:'10rem',height:'auto'}}>
                 <form onSubmit={handleSubmit}>
            <div className="form-group mt-3">
            <TextField
          error={newMsg.toError}
          id="outlined-error-helper-text"
          label="To"
          name="to"
          helperText={newMsg.toError?newMsg.toErrorM:"Receipient's Email Address"}
          required
          size="small"
          style={{width:'100%'}}
          value= {newMsg.to}
          onChange={handleChange}

        />
          </div> 
            <div className="form-group mt-3">
           <TextField
           label="Subject"
           name="subject"
            size="small"
          error={newMsg.sError}
            required
            helperText={newMsg.sErrorM}
            value={newMsg.subject}
           onChange={handleChange}
           style={{width:'100%'}}
            type={ 'text'}
          />
          </div>
          <div className="form-group mt-3">
            <TextField
          error={newMsg.bError}
          id="outlined-error-helper-text"
          label="Message"
          name="body"
          helperText={newMsg.bErrorM}
          required
          size="small"
          style={{width:'100%'}}
          value= {newMsg.body}
          onChange={handleChange}
          multiline
        />
          </div> 
          <div className='form-group mt-3'>
          <input id="file_input" hidden type="file" onChange={handleFileChange} />
          <button type="button" className="btn border rounded bg-light">
          <label htmlFor="file_input">
            Attach File (optional)
          </label>
          </button>
          <p className="m-0 d-inline ms-2">{file?"File Attached.":"No File Attached"}</p>
          </div>
          <button id='subbtn' type='submit' className='mt-2 btn btn-primary'>{isSending?"Sending...":"Send"}</button>
                 </form>
                 <p className='text-center' color={result.error?"red":"black"}>{result.value}</p>
               </div>
            </div>
            :
            <p>hi</p>))}
          </Pane>
          
        ))}
      </Pane>
    </Pane>
  )
}
