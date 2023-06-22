import {useState,useEffect} from "react"
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';
import { TextField } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import {validator} from "../../../services/validator";
import { TextareaField} from 'evergreen-ui'
import {FormControl} from '@material-ui/core';
import { useNavigate,useParams,Link } from "react-router-dom";
import Footer from '../../../components/footer'
import {BsArrowLeft} from 'react-icons/bs'

const steps = ['Basic Information', 'Eligibility Documents', 'Required Payments','Documents'];
const Newbid = () => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [input , setInput] = useState({id:"" ,title:"",
      cat:"",dead:"",app:"",bsec:"",visitd:"",opend:""
      ,error:false,errorMessage:"",visitError:false,
      openError:false,idError:false,titleError:false,
      catError:false,appError:false,deadError:false,
      bsError:false,idErrorM:'',titleErrorM:'',visitErrorM:'',
      openErrorM:'',catErrorM:'',deadErrorM:'',appErrorM:'',
      bsErrorM:"",vTax:"",vTaxError:"",vTaxErrorM:"",
      coi:"",coiError:"",coiErrorM:"",lic:"",licError:"",
      licErrorM:"",lg:"",lgError:"",lgErrorM:"",
      vent:"",ventError:"",ventErrorM:"",nat:"",natError:"",
      natErrorM:"",vat:"",vatError:"",vatErrorM:"",gow:"",
      gowError:"",gowErrorM:"",
      tc:"",tcError:"",tcErrorM:"",pfee:"",pfeeError:"",
      pfeeErrorM:"",invD:"",ent:JSON.parse(localStorage.getItem('user')).pBody,bidDocFile:''})
    const [isSubmitting,setIsSubmitting]=useState(false)
    const [errorSubmitting,setIsErrorSubmitting]=useState(false)
    const [uploading,setUploading]=useState(false)
    const [errorUploading,setErrorUploading]=useState(false)
    const [uploaded,setUploaded]=useState(false)
     const navigate=useNavigate()
     const {id}=useParams()
    const blue = {
        100: '#DAECFF',
        200: '#b6daff',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        900: '#003A75',
      };
    const grey = {
        50: '#f6f8fa',
        100: '#eaeef2',
        200: '#d0d7de',
        300: '#afb8c1',
        400: '#8c959f',
        500: '#6e7781',
        600: '#57606a',
        700: '#424a53',
        800: '#32383f',
        900: '#24292f',
      };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (e,page) => {
      e.preventDefault()
      if(page==1){
         if(validator(input,"tender")==="idl"){
          setInput({...input,idError:true,idErrorM:"Id must be at least 15 characters long"})
          }else{
          input.idError=false;input.idErrorM=''
          if(validator(input,"tender")==="dead"){
          setInput({...input,deadError:true,deadErrorM:"This date is past"})
          }else{
            input.deadError=false;input.deadErrorM=''
            if(validator(input,"tender")==="open"){
            setInput({...input,openError:true,openErrorM:"This date is past"})
            }else{
            input.openError=false;input.openErrorM=''
            if(validator(input,"tender")==="visitd"){
            setInput({...input,visitError:true,visitErrorM:"This date is past"})
            }else{
             input.visitError=false;input.visitErrorM=''
             let newSkipped = skipped;
             if (isStepSkipped(activeStep)) {
             newSkipped = new Set(newSkipped.values());
             newSkipped.delete(activeStep);
             }
             setActiveStep((prevActiveStep) => prevActiveStep + 1);
             setSkipped(newSkipped);
             
      }}}}}
      else{
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
        }
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
      }
  
  } 
 const handleSubmit=()=>{
   setIsSubmitting(true)
   fetch(`http://localhost:3001/checkprocid/${input.id}`)
    .then((res)=>res.json())
    .then((res)=>{
      if(res!==null){
        setIsErrorSubmitting(true)
        input.idError=true
        input.idErrorM="Procurement ID Exists."
        document.getElementById('final_result').innerHTML="You have entered an existing procurement ID, please correct it and try again."
     }else{
        input.idError=false
        input.idErrorM=""
     fetch('http://localhost:3001/newtender',{
      method:"POST",
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(input)
     })
     .then((res)=>res.json())
     .then((res)=>{
        setIsSubmitting(false)
         if(res.res=="ok"){
            document.getElementById('sub_btn').style.display="none"
            document.getElementById('res_btn').style.display="none"
            document.getElementById('final_result').innerHTML="Tender Successfully Submitted!"
            document.getElementById('final_result').style.fontWeight="bold"
            setTimeout(()=>{navigate(`/userpage/phead/${id}/manage-bids/all-bids`)},5000)
         }else{
           setIsErrorSubmitting(true)
         }
     })
     .catch((err)=>{
      setIsErrorSubmitting(true)
     })}
    })
    .catch((err)=>setIsErrorSubmitting(true))
   
 }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFileChange=(event)=>{
      setFile(event.target.files[0]);
  }

     function handleFileSubmit(event){
      event.preventDefault();
      const formData = new FormData();
      formData.append('file', file);
      setUploading(true)
      fetch('http://localhost:3001/uploadbiddocument',{
        method:'post',
        body:formData
       }).then((res)=>res.json())
       .then((res)=>{
        setUploading(false)
        if(res.res=="error"){
          setErrorUploading(true)
        }else{
          setUploaded(true)
          setInput({...input,bidDocFile:res.res})
        }
       })
       .catch((err)=>{
           setErrorUploading(true)
       })
     }

   const [selected, setSelected] = useState();

   const [file,setFile]=useState(null)
   let footer = <p>Please pick a day.</p>;
   if (selected) {
     footer = <p>You picked {format(selected, 'PP')}.</p>;
   }

   const minDate=new Date()
   const disabledDays={before:minDate,}


  const handleReset = () => {
    setActiveStep(0);
  };
  let act = activeStep +1;
    const content = ()=>{
    if (act===1){
      return (
        <div className="container">
          <form id="form"onSubmit={(e)=>{handleNext(e,1)}} >  
            <div className="form-group mt-3">
            <TextField
          error={input.idError}
          id="outlined-error-helper-text"
          label="Procurement ID"
          name="id"
          type="text"
          helperText={input.idErrorM || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Procurement ID example: 'OPE-NCB-G-0029-2015-BID'</p> }
          required
          size="small"
          style={{width:'100%'}}
          value= {input.id}
          onChange={handleChange}

        />
            </div> 
            <div className="form-group mt-3">
            <TextField
          error={input.titleError}
          id="outlined-error-helper-text"
          label="Title"
          name="title"
          type="text"
          helperText={input.titleErrorM || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Procurement title, example :'TextBooks'</p> }
          required
          size="small"
          style={{width:'100%'}}
          value= {input.title}
          onChange={handleChange}

        />
            </div> 
            <div className="form-group mt-3">
            <TextField
          error={input.catError}
          id="outlined-error-helper-text"
          label="Category"
          name="cat"
          type="text"
          helperText={input.catErrorM || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Procurement Category, example: Goods</p> }
          required
          size="small"
          style={{width:'100%'}}
          value= {input.cat}
          onChange={handleChange}

        />
            </div> 
            <div className="form-group mt-3">
             <FormControl style={{width:'100%'}}>
        <InputLabel id="demo-simple-select-autowidth-label">Market Approach</InputLabel>
        <Select
          // labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={input.app}
          onChange={handleChange}
          autoWidth
          label="Market Approach"
          name="app"
          size="small"
          required
          error={input.appError}
          helperText={input.appErrorM ||<p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Choose Market Approach</p> }

        >
          <MenuItem value='National'>National</MenuItem>
          <MenuItem value="International">International</MenuItem>
        </Select>
      </FormControl>
          </div>
            <div className="form-group mt-3">
      <DayPicker 
mode="single"
selected={selected}
onSelect={setSelected}
footer={footer}
disabledDays={disabledDays}
    />
            <TextField
          error={input.deadError}
          id="outlined-error-helper-text"
          label=""
          required
          name="dead"
          helperText={input.deadErrorM ||<p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Submission Deadline in Date Format</p> }
          size="small"
          style={{width:'100%'}}
          type="date"
          value={input.dead}
          onChange={handleChange}
        />
            </div>
            <div className="form-group mt-3">
            <TextField
          error={input.openError}
          id="outlined-error-helper-text"
          label=""
          required
          name="opend"
          helperText={input.openErrorM ||<p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Bid Opening Schedule in Date Format</p> }
          size="small"
          style={{width:'100%'}}
          type="date"
          value={input.opend}
          onChange={handleChange}
          inputProps={{min:new Date().toLocaleDateString('en-US', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).split('/')[2]+'-'+new Date().toLocaleDateString('en-US', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).split('/')[2]+'-'+new Date().toLocaleDateString('en-US', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).split('/')[0]}}
        />
            </div>
            <div className="form-group mt-3">
            <TextField
          error={input.visitError}
          id="outlined-error-helper-text"
          label=""
          required
          name="visitd"
          helperText={input.visitErrorM ||<p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Site Visit Schedule in Date Format</p> }
          size="small"
          style={{width:'100%'}}
          type="date"
          value={input.visitd}
          onChange={handleChange}
          inputProps={{min:new Date().toLocaleDateString('en-US', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).split('/')[2]+'-'+new Date().toLocaleDateString('en-US', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).split('/')[2]+'-'+new Date().toLocaleDateString('en-US', { 
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
          }).split('/')[0]}}
        />
            </div>
          </form>
        </div>
      )
    }
    else if (act===2){
      return (<form id="form" onSubmit={(e)=>{handleNext(e,2)}}>
        <TextareaField
         name="vTax"
         value={input.vTax} 
        label="Valid tax clearance certificate"
        required
        hint="Valid tax clearance certificate"
        onChange={handleChange}
         />
         <TextareaField
         name="coi"
         value={input.coi} 
        label="Conflict of Interest"
        required
        hint="Conflict of Interest"
        onChange={handleChange}
         />
         <TextareaField
         name="lic"
         value={input.lic} 
        label="Valid trade license or business organization registration certificate"
        required
        hint="Valid trade license or business organization registration certificate"
        onChange={handleChange}
         />
         <TextareaField
         name="lg"
         value={input.lg} 
        label="Eligibility by decision of the FPPA"
        required
        hint="Eligibility by decision of the FPPA"
        onChange={handleChange}
         />
         <TextareaField
         name="vent"
         value={input.vent} 
        label="Form Data on Joint Ventures"
        required
        hint="Form Data on Joint Ventures"
        onChange={handleChange}
         />
         <TextareaField
         name="nat"
         value={input.nat} 
        label="Nationality"
        required
        hint="Nationality"
        onChange={handleChange}
         />
         <TextareaField
         name="vat"
         value={input.vat} 
        label="VAT registration certificate"
        required
        hint="VAT registration certificate"
        onChange={handleChange}
         />
         <TextareaField
         name="gow"
         value={input.gow} 
        label="Government Owned Entity"
        required
        hint="Government Owned Entity"
        onChange={handleChange}
         />
         <TextareaField
         name="tc"
         value={input.tc} 
        label="Terms and Conditions"
        required
        hint="Terms and Conditions"
        onChange={handleChange}
         />
       </form>) 
      }
    else if(act==3){
      return (
        <form  id="form" onSubmit={(e)=>{handleNext(e,3)}}>
          <TextareaField
         name="pfee"
         value={input.pfee} 
        label="Participation Fee"
        required
        hint="Participation Fee"
        onChange={handleChange}
         />
         <TextareaField
         name="bsec"
         value={input.bsec} 
        label="Bid Security Amount"
        required
        hint="Bid Security Amount"
        onChange={handleChange}
         />
        </form>
      )
    }else{
      return(<div style={{minHeight:'10rem'}}>
        <h5 className="text-center">Attach The Bid Document here.</h5>
        <form onSubmit={handleFileSubmit} className="d-flex flex-column justify-content-center align-items-center">
          <input id="file_input" hidden type="file" onChange={handleFileChange} />
          <button type="button" className="btn btn-primary">
          <label className="text-white" htmlFor="file_input">
            Attach Bid Document ( pdf format )
          </label>
          </button>
          <p className="m-0">{file&&"File Attached."}</p>
          <button type="submit" className="mt-2 btn btn-secondary">Upload</button>
          <p className="m-0">{uploading?"Uploading File":(errorUploading?"Error Uploading File":uploaded&&"Successfully Uploaded!")}</p>
        </form>      </div>)
    }
    };

    const handleChange = (event) => {
        const {name,value}=event.target;
        setInput({...input,[name]:value,invD:Date.now()})
      };
    return(<>
    <div className="container p-2 w-100 fluid" style={{minHeight:'2rem'}}>
               <a className="icon-link text-decoration-none text-black">
                <BsArrowLeft className='me-2' />
                <Link className="text-decoration-none" to={`/userpage/phead/${id}`}>Back to Dashboard</Link>
               </a>
            </div>
        <div className="mb-5 mt-3 container border rounded">
          <h2 className="text-center">Post New Tender</h2>
          <hr />
          <Box className="mt-5">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <div id="final_result" className="container mt-3" style={{padding:'0rem',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
             {
              isSubmitting?<p className="text-center fw-bold">Submitting Tender...</p>:(
              errorSubmitting?<p className="text-center fw-bold">Error Submitting Tender...</p>:<p className="text-center fw-bold">You Have Finished Filling The Required Details, Click SUBMIT To Submit New Tender, Or Click RESET To Enter Data Again.</p>)
             }
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button id="res_btn" disabled={isSubmitting?true:(errorSubmitting?false:false)} onClick={handleReset}>Reset</Button>
            <Button id="sub_btn" disabled={isSubmitting?true:(errorSubmitting?false:false)}  onClick={handleSubmit}>Submit</Button>
        </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography className="text-center" sx={{ mt: 2, mb: 1 }}>Step {act}
          </Typography>
          <div className="container">{content()}</div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button form='form' type="submit" onClick={(e)=>activeStep===steps.length-1?handleNext(e,4):""}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
          </Box>
        </div>
        <Footer />
        </>
    )
}
export default Newbid;