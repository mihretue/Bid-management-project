import {useState,useEffect} from "react"
import { TextField } from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { TextareaAutosize, FormControl, FormLabel } from '@material-ui/core';


const steps = ['For the front part of the Advert', 'Eligibility Documents', 'next to be filled'];


const Newbid = () => {

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

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
    
      const StyledTextarea = styled(TextareaAutosize)(
        ({ theme }) => `
        width: 320px;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
      
        &:hover {
          border-color: ${blue[400]};
        }
      
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
        }
      
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `,
      );

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };



  let act = activeStep +1;
    const content = ()=>{
     if (act===1){
       return (
        <div className="container">
            <div className="form-group mt-3">
            <TextField
          error={input.idErrorM}
          id="outlined-error-helper-text"
          label="ID"
          name="id"
          type="id"
        //   defaultValue="Hello World"
          helperText={input.idErrorM || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Like : 'OPE-NCB-G-0029-2015-BID'</p> }
          required
          size="small"
          style={{width:'100%'}}
          value= {input.id}
          onChange={handleChange}

        />
          </div> 
          <div className="form-group mt-3">
            <TextField
          error={input.titError}
          id="outlined-error-helper-text"
          label="Title"
          name="title"
          type="title"
        //   defaultValue="Hello World"
          helperText={input.titErrorM || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>your title :'TextBooks'</p> }
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
          type="cat"
        //   defaultValue="Hello World"
          helperText={input.catErrorM || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Your Email, example: John_Doe6@gmail.com</p> }
          required
          size="small"
          style={{width:'100%'}}
          value= {input.cat}
          onChange={handleChange}

        />
          </div> 
          <div className="form-group mt-3">
            <TextField
          error={input.dlError}
          id="outlined-error-helper-text"
          label=""
          required
          name="deadline"
        //   defaultValue="Hello World"
          helperText={input.dlErrorM ||<p>Dead line, example: 2023-04-05</p> }
          size="small"
          style={{width:'100%'}}
          type="date"
          value={input.dead}
          onChange={handleChange}
        />
          </div>
          <div className="form-group mt-3">
            <TextField
          error={input.dlError}
          id="outlined-error-helper-text"
          label=""
          required
          name="invitation date"
        //   defaultValue="Hello World"
          helperText={input.dlErrorM ||<p>Dead line, example: 2023-04-05</p> }
          size="small"
          style={{width:'100%'}}
          type="date"
          value={input.invd}
          onChange={handleChange}
        />
          </div>
          <div className="form-group mt-3">
            <TextField
          error={input.dlError}
          id="outlined-error-helper-text"
          label=""
          required
          name="deadline"
        //   defaultValue="Hello World"
          helperText={input.dlErrorM ||<p>Dead line, example: 2023-04-05</p> }
          size="small"
          style={{width:'100%'}}
          type="date"
          value={input.dead}
          onChange={handleChange}
        />
          </div>
          <div className="form-group mt-3">
            <TextField
          error={input.dlError}
          id="outlined-error-helper-text"
          label=""
          required
          name="opening date"
        //   defaultValue="Hello World"
          helperText={input.dlErrorM ||<p>Dead line, example: 2023-04-05</p> }
          size="small"
          style={{width:'100%'}}
          type="date"
          value={input.dead}
          onChange={handleChange}
        />
          </div>
          <div className="form-group mt-3">
            <TextField
          error={input.dlError}
          id="outlined-error-helper-text"
          label=""
          required
          name="site visit Schedule"
        //   defaultValue="Hello World"
          helperText={input.dlErrorM ||<p>Dead line, example: 2023-04-05</p> }
          size="small"
          style={{width:'100%'}}
          type="date"
          value={input.dead}
          onChange={handleChange}
        />
          </div>
          <div className="form-group mt-3">
            <TextField
          error={input.appError}
          id="outlined-error-helper-text"
          label="Market Approach"
          name="app"
          type="app"
        //   defaultValue="Hello World"
          helperText={input.appErrorM || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>National</p> }
          required
          size="small"
          style={{width:'100%'}}
          value= {input.app}
          onChange={handleChange}

        />
          </div> 
          <div className="form-group mt-3">
            <TextField
          error={input.appError}
          id="outlined-error-helper-text"
          label="procurement method"
          name="meth"
          type="meth"
        //   defaultValue="Hello World"
          helperText={input.appErrorM || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>National</p> }
          required
          size="small"
          style={{width:'100%'}}
          value= {input.app}
          onChange={handleChange}

        />
          </div> 
          
          <div className="form-group mt-3">
            <TextField
          error={input.bsError}
          id="outlined-error-helper-text"
          label="Bid Security"
          name="bidsec"
          type="bidsec"
        //   defaultValue="Hello World"
          helperText={input.bsErrorM || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>10,000 </p> }
          required
          size="small"
          style={{width:'100%'}}
          value= {input.bsec}
          onChange={handleChange}

        />
          </div>
        </div>
       )
     }
     else if (act===2){
       return (<FormControl >
        <FormLabel style={{fontWeight:"bold",fontFamily:"sans-serif"}}>Valid Tax Clearance Certiticate</FormLabel>
        <StyledTextarea
        required
          aria-label="Your Label"
        />
      </FormControl>) 
     }
    };



    const [input , setInput] = useState({id:"" ,title:"",cat:"",dead:"",app:"",bsec:"",error:false,errorMessage:"",idError:false,titError:false,catError:false,appError:false,dlError:false,bsError:false,idErrorM:'',titErrorM:'',catErrorM:'',dlErrorM:'',appErrorM:'',bsErrorM:"",agreed:false})
    const [agreed,setAgreed]=useState(false)



    const handleChange = (event) => {
        const {name,value}=event.target;
        setInput({...input,[name]:value})
        if(document.getElementById('agreed').checked==true)
           setAgreed(true)
        else
           setAgreed(false)
      };


    return(
        <div className="container">
        <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
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
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
            <Button >Submit</Button>
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
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
    </div>
    )
}
export default Newbid;