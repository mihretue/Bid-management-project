import React from "react"
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect,useState } from "react";
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { validator } from "../services/validator";
import { agecalc } from "../services/agecalc";
import { useNavigate } from "react-router-dom";
export default function (props) {
    useEffect(()=>{document.title='Cheretanet | Sign Up'})

  const navigate=useNavigate()
  const [input , setInput] = useState({fName:"" ,lName:"",email:"",pass:"",cPass:"",role:"",publicBody:"",bDay: '' ,userName:'',error:false,errorMessage:"",uError:false,emError:false,pError:false,cpError:false,bdError:false,uErrorM:'',emErrorM:'',pErrorM:'',cpErrorM:'',bdErrorM:''})
    useEffect(()=>{document.title= 'Cheretanet || signUp' },[])
  const [showPassword, setShowPassword] = React.useState(false);
  const [showCPassword, setShowCPassword] = React.useState(false);

  const handleClickShowPassword = (a) =>{
    if(a=='p') setShowPassword((show) => !show);
    else setShowCPassword((show) => !show);

  } 
const handleChange = (event) => {
    const {name,value}=event.target;
    setInput({...input,[name]:value})
  };

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(agecalc(input)<18){
      setInput({...input,bdError:true,bdErrorM:"You are under 18 years old, you can't have cheretanet account"})
    }else{
      input.bdError=false;input.bd=''
      if(validator(input)==="ul"){
      setInput({...input,uError:true,uErrorM:"Username must be at least 3 characters long"})
      }else{
      input.uError=false;input.uErrorM=''
      if(validator(input)==="Em"){
      setInput({...input,emError:true,emErrorM:"Invalid Email Format"})
      }else{
      input.emError=false;input.emErrorM=''
      if(validator(input)==="pl"){
      setInput({...input,pError:true,pErrorM:"Password must be at least 8 characters long"})
      }else{
      input.pError=false;input.pErrorM=''
      if(validator(input)==="cpl"){
      setInput({...input,cpError:true,cpErrorM:"Password must be at least 8 characters long"})
      }else{
      input.cpError=false;input.cpErrorM=''
      if(validator(input)==="un"){
      setInput({...input,cpError:true,cpErrorM:"Passwords don't match"})
      }else{
      input.cpError=false;input.cpErrorM=''
      
      }
      }
      }
      }
      }
    }
  }

  return (
    <div className="Auth-form-container" style={{width:'85%',margin:'1rem auto'}}>
      <form className="Auth-form" onSubmit={handleSubmit} >
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Create Your cheretanet Account</h3>
          <div className="text-center">
            <p style={{margin:'0',display:'inline'}}>Already registered?{" "}</p>
            <span className="link-primary" style={{cursor:'pointer'}} onClick={()=>{
              navigate('/login');
              }}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
             <TextField
          id="outlined-error-helper-text"
          label="First Name"
          name="fName"
          helperText={input.errorMessage || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Your First Name, example: John</p> }
          required
          size="small"
          style={{width:'100%'}}
          value= {input.fName}
          onChange={handleChange}

        />
          </div>
          <div className="form-group mt-3">
            <TextField
          id="outlined-error-helper-text"
          label="Last Name"
          name="lName"
          helperText={input.errorMessage || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Your Last Name, example: Doe</p> }
          required
          size="small"
          style={{width:'100%'}}
          value= {input.lName}
          onChange={handleChange}

        />
          </div>
          <div className="form-group mt-3">
            <TextField
          error={input.uError}
          id="outlined-error-helper-text"
          label="User Name"
          name="userName" 
        //   defaultValue="Hello World"
          helperText={input.uErrorM || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Your Username example: John_Doe12</p> }
          required
          size="small"
          style={{width:'100%'}}
          value= {input.userName}
          onChange={handleChange}

        />
          </div>
          <div className="form-group mt-3">
            <TextField
          error={input.bdError}
          id="outlined-error-helper-text"
          label=""
          required
          name="bDay"
        //   defaultValue="Hello World"
          helperText={input.bdErrorM || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Your Birth Date, example: 12-Feb-2000</p> }
          size="small"
          style={{width:'100%'}}
          type="date"
          value={input.bDay}
          onChange={handleChange}
        />
          </div>
          <div className="form-group mt-3">
             <FormControl style={{width:'100%'}}>
        <InputLabel id="demo-simple-select-autowidth-label">Role</InputLabel>
        <Select
          // labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={input.role}
          onChange={handleChange}
          autoWidth
          label="Role"
          name="role"
          size="small"
          required
        >
          <MenuItem value='Bidder'>Bidder</MenuItem>
          <MenuItem value="PPA IT officer">PPA IT officer</MenuItem>
          <MenuItem value='Procurement Department Head'>Procurement Department Head</MenuItem>
          <MenuItem value='Procurement Endorsing Committee Head'>Procurement Endorsing Committee Head</MenuItem>

        </Select>
      </FormControl>
          </div>
          <>  { 
            (input.role === "Procurement Department Head" || input.role === "Procurement Endorsing Committee Head")&& <div className="form-group mt-3">
            <TextField
          error={false}
          id="outlined-error-helper-text"
          label="Public Body"
          value={input.publicBody}
          name="publicBody"
        //   defaultValue="Hello World"
          helperText={input.errorMessage || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Which Public body are you from? example: Ministry of Education</p> }
          required
          size="small"
          style={{width:'100%'}}
          onChange={handleChange}

              />
          </div>
                }

          
          </> 
          <div className="form-group mt-3">
            <TextField
          error={input.emError}
          id="outlined-error-helper-text"
          label="Email"
          name="email"
        //   defaultValue="Hello World"
          helperText={input.emErrorM || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Your Email, example: John_Doe6@gmail.com</p> }
          required
          size="small"
          style={{width:'100%'}}
          value= {input.email}
          onChange={handleChange}

        />
          </div>  
           <div className="form-group mt-3">
           <TextField
           label="New Password"
           name="pass"
            size="small"
          error={input.pError}
            required
            helperText={input.pErrorM || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Your Password, example: John_Doe@4$^^</p> }
            value={input.pass}
           onChange={handleChange}
           style={{width:'100%'}}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>handleClickShowPassword('p')}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>,
          }}
          />
          </div>  
          <div className="form-group mt-3">
           <TextField
           error={input.cpError}
           label="Confirm Password"
           name="cPass"
helperText={input.cpErrorM || <p style={{margin:'0',fontSize:'1rem',fontFamily:"'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",fontWeight:'bold'}}>Enter Your Password Once Again</p> }
            size="small"
            required
            value={input.cPass}
          onChange={handleChange}
           style={{width:'100%'}}
            type={showCPassword ? 'text' : 'password'}
            InputProps={{
            endAdornment: <InputAdornment position="end">
              <IconButton
                  aria-label="toggle password visibility"
                  onClick={()=>handleClickShowPassword('c')}
                  edge="end"
                >
                  {showCPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
            </InputAdornment>,
          }}
          />
          </div>  
            <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}