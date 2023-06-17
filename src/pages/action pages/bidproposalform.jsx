import Footer from '../../components/footer'
import { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
const BidProposal=()=>{
    const {tid}=useParams()
    const navigate=useNavigate()
    const [input,setInput]=useState({tid:"",bid:"",bidPropFile:"",appTime:Date.now()})
    const handleFileChange=(event)=>{
        setFile(event.target.files[0]);
    }

    function handleFileSubmit(event){
        event.preventDefault();
        let q={tid:tid,uid:JSON.parse(localStorage.getItem('user')).id}
        const formData = new FormData();
        formData.append('file', file);
        setUploading(true)
        fetch(`http://localhost:3001/uploadbidproposal?${q}`,{
          method:'post',
          body:formData
         }).then((res)=>res.json())
         .then((res)=>{
          setUploading(false)
          if(res.res=="error"){
            setErrorUploading(true)
          }else{
            setUploaded(true)
            setInput({...input,bidPropFile:res.res,appTime:Date.now()})
          }
         })
         .catch((err)=>{
             setErrorUploading(true)
         })
    }

    const registerBidder=()=>{
      let q={tid:tid,uid:JSON.parse(localStorage.getItem('user')).id}
      fetch(`http://localhost:3001/registerbidder?${q}`)
        .then((res)=>res.json())
        .then((res)=>{
            if(res.res=="ok"){
                navigate(`/tenders/${tid}/apply/success`)
            }
        })
        .catch((err)=>{console.log(err)})
    }

    const saveBidProposal=()=>{
        let q={tid:tid,uid:JSON.parse(localStorage.getItem('user')).id}
        q=new URLSearchParams(q).toString()
        fetch(`http://localhost:3001/savebidproposal?${q}`,{
            method:'post',
            body:JSON.stringify(input),
            headers:{'Content-Type':'application/json'}
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.res=="ok"){
                registerBidder()
                setInput([])
            }
        })
        .catch((err)=>{console.log(err)})
    }
     const [file,setFile]=useState(null)
     const [uploading,setUploading]=useState(false)
     const [errorUploading,setErrorUploading]=useState(false)
     const [uploaded,setUploaded]=useState(false)
    
    return(<>
    <div style={{minHeight:'10rem'}} className='d-flex flex-column justify-content-center align-items-center mb-5 p-2 container border rounded'>
        <h5 className="text-center">Attach Your Bid Proposal here.</h5>
        <form onSubmit={handleFileSubmit} className="d-flex flex-column justify-content-center align-items-center">
          <input id="file_input" hidden type="file" onChange={handleFileChange} />
          <button disabled={uploaded?true:false} type="button" className="btn btn-primary">
          <label className="text-white" htmlFor="file_input">
            Attach Bid Proposal ( pdf format )
          </label>
          </button>
          <p className="m-0">{file&&"File Attached."}</p>
          <button disabled={uploaded?true:false} type="submit" className="mt-2 btn btn-secondary">Upload</button>
          <p className="m-0">{uploading?"Uploading File":(errorUploading?"Error Uploading File":uploaded&&"Successfully Uploaded!")}</p>
        </form>   
        <button onClick={saveBidProposal} hidden={uploaded?false:true} className='btn mt-2 btn-success'>Continue</button>
    </div>
    <Footer />
    </>)
}

export default BidProposal;