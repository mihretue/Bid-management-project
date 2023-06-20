import { useParams,useNavigate } from "react-router-dom"
import Footer from "../../../components/footer"
import { useEffect, useState } from "react"
const RequestBidApproval=()=>{
    const [endorser,setEndorser]=useState({})
    const [tender,setTender]=useState({})
    const {bid,id}=useParams()
    const navigate=useNavigate()

    const [isFetching,setIsFetching]=useState(false)
    const [errorIsFetching,setErrorFetching]=useState(false)
    const [errorSaving,setErrorSaving]=useState(false)
    const [uploading,setUploading]=useState(false)
    const [errorUploading,setErrorUploading]=useState(false)
    const [uploaded,setUploaded]=useState(false)
    const [award , setAward] = useState({bidReqFile:''})
    
useEffect(()=>{fetchEndorsingCInfo()},[])
    const fetchEndorsingCInfo=()=>{
        setIsFetching(true)
        let q={pBody:JSON.parse(localStorage.getItem('user')).pBody,role:"procurement endorsing committee head"}
        q=new URLSearchParams(q)
        fetch(`http://localhost:3001/userbyprop?${q}`)
        .then((res)=>res.json())
        .then((res)=>{
            setEndorser(res);console.log(res)
            fetchBid()
        })
        .catch((err)=>{console.log(err)
            setErrorFetching(true)
        })
    }
    const fetchBid=()=>{
        fetch(`http://localhost:3001/gettender?id=${bid}`)
        .then((res)=>res.json())
        .then((res)=>{setTender(res)
            setIsFetching(false)
        })
        .catch((err)=>{console.log(err)
            setErrorFetching(true)
        })
    }

    const [file,setFile]=useState(null)


    const handleFileChange=(event)=>{
        setFile(event.target.files[0]);
    }
    const handleFileSubmit=(event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        setUploading(true)
        fetch('http://localhost:3001/uploadbidrequest',{
          method:'post',
          body:formData
         }).then((res)=>res.json())
         .then((res)=>{
          setUploading(false)
          if(res.res=="error"){
            setErrorUploading(true)
          }else{
            setUploaded(true)
            setAward({...award,bidReqFile:res.res})
            console.log(res)
          }
         })
         .catch((err)=>{
             setErrorUploading(true)
         })
    }

    const requestApproval=(file)=>{
        fetch(`http://localhost:3001/requestApproval/${bid}`,{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(award)
        })
        .then((res)=>res.json())
        .then((res)=>{
            if(res.res=="ok"){
               setTimeout(()=>{navigate(`/userpage/phead/${id}/manage-bids/${bid}/request-bid-approval/success`)},[])
            }else{
                setErrorSaving(true)
            }
    })
        .catch((err)=>{setErrorSaving(true)})
    }
    



    return(
    <>
      {isFetching?
         <div className="text-center fs-5 mb-5">Please Wait...</div>
      :(errorIsFetching?
        <div className="text-center fs-5 mb-5 text-danger">Some Error Occurred, Please Reload This Page!</div>
        :(Object.keys(endorser).length==0?
            <div className="text-center fs-9 mb-5 w-50 mx-auto">
                Dear Procurement Department Head, There is no account associated with a
                procurement endorsing committee head in your public body.</div>
            :(endorser.status=="banned"?
            <div className="text-center fs-9 mb-5 w-50 mx-auto">
                Dear Procurement Department Head, There is an issue with an account associated with a
                procurement endorsing committee head in your public body.</div>
            :
            <div className='container mb-5 d-flex flex-column justify-content-center align-items-center mx-auto'>
        <h2 className="text-center">Request Bid Approval</h2>
         <div className="w-50 mt-2 mx-auto d-flex flex-column justify-content-center align-items-center">
            <h6>Tender Information</h6>
            <ul className="list-unstyled">
                <li>Tender Id : <p className="m-0 d-inline fw-bold">{tender.id}</p></li>
                <li>Tender Title : <p className="m-0 d-inline fw-bold">{tender.title}</p></li>
            </ul>
            <h6>To be approved by :</h6>
            <ul className="list-unstyled">
                <li>Name : <p className="m-0 d-inline fw-bold">{endorser.fName + ' ' +endorser.lName}</p></li>
                <li>Email : <p className="m-0 d-inline fw-bold">{endorser.email}</p></li>
            </ul><hr className="w-100" />
            <h6>Upload a bid approval request file</h6>
              <form onSubmit={handleFileSubmit} className="d-flex flex-column justify-content-center align-items-center">
              <input id="file_input" hidden type="file" onChange={handleFileChange} />
              <button type="button" className="btn d-inline btn-primary">
              <label className="text-white d-inline" htmlFor="file_input">
                 Attach 
               </label>
              </button>
              <p className="m-0 d-inline">{file&&"File Attached."}</p>
              <button disabled={file?false:true} type="submit" className="mt-2 btn btn-secondary">Upload</button>
              <p className="m-0">{uploading?"Uploading File":(errorUploading?"Error Uploading File":uploaded&&"Successfully Uploaded!")}</p>
              <button onClick={requestApproval} className="mt-3 btn btn-success" hidden={uploaded==true?false:true}>Finish</button>
              <p>{errorSaving&&"Some Error Occurred, Please Try Again!"}</p>
        </form>   
         </div>
      </div>)))

      }
      <Footer />
    </>)
}

export default RequestBidApproval;