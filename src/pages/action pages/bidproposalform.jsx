import Footer from '../../components/footer'
import { useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
const BidProposal=()=>{
    const {tid}=useParams()
    const navigate=useNavigate()
    var inp={}
    const [input,setInput]=useState({tid:"",bid:"",bidPropFile:"",appTime:Date.now(),bidderName:""})
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
            const bidderName=`${JSON.parse(localStorage.getItem('user')).fName} ${JSON.parse(localStorage.getItem('user')).lName}`
            console.log(bidderName)
            inp={
              bidId:tid,
              bidderId:JSON.parse(localStorage.getItem('user')).id,
              bidderName:`${JSON.parse(localStorage.getItem('user')).fName} ${JSON.parse(localStorage.getItem('user')).lName}`,
              bidderStatus:"bidding",
              bidDocPayment:"payed",
              bidPropFile:res.res,
              appTime:Date.now()}
            registerBidder(inp)
          }
         })
         .catch((err)=>{
             setErrorUploading(true)
             console.log(err)
         })
    }

    const registerBidder=(inp)=>{
      fetch(`http://localhost:3001/registerbidder`,{
        method:'post',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(inp)
      })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.res=="ok"){
                document.getElementById('fin_btn').hidden=false
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
          <button disabled={(!file || uploaded )?true:false} type="submit" className="mt-2 btn btn-secondary">Upload</button>
          <p className="m-0">{uploading?"Uploading File":(errorUploading?"Error Uploading File":uploaded&&"Successfully Uploaded!")}</p>
        </form>   
        <button id="fin_btn" onClick={()=>{navigate(`/tenders/${tid}/apply/success`)}} hidden className='btn mt-2 btn-success'>Continue</button>
    </div>
    <Footer />
    </>)
}

export default BidProposal;