import { useNavigate } from "react-router-dom"
import { useEffect,useState } from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { validator } from "../services/validator";
import LoadingButton from '@mui/lab/LoadingButton';
import { BiError } from "react-icons/bi";
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
import Footer from "../components/footer";

const Login=()=>{
    useEffect(()=>{document.title='Cheretanet | Log in'})
    const navigate=useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [input , setInput] = useState({email:"",pass:"",error:false,errorMessage:"",emError:false,pError:false,emErrorM:'',pErrorM:''})

    const [isLoggingIn,setIsLoggingIn]=useState(false)
    const [errorLoggingIn,setErrorLoggingIn]=useState()

    const handleClickShowPassword = (a) =>{
    setShowPassword((show) => !show);

  } 
const handleChange = (event) => {
    const {name,value}=event.target;
    setInput({...input,[name]:value})
  };

  const fetchUserData=()=>{
    fetch('http://localhost:3001/user',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(input)
    })
    .then((res)=>res.json())
    .then((res)=>{
       if(res.approved==false){
          navigate('/waitforapproval')
       }else{
        //navigate to home
        // localStorage.setItem('user',true)
        if(res.status=="banned"){

        }else{
          if(res.status=="active"){
            switch(res.role) {
              case 'ppa it officer':
                localStorage.setItem('user',JSON.stringify({id:res._id,fName:res.fName,lName:res.lName,name:res.fName+' '+res.lName,pBody:res.pBody,approved:res.approved,bDay:res.bDay,email:res.email,pass:res.pass,role:res.role,status:res.status,uName:res.uName}))
                navigate(`/userpage/admin/${res._id}`)
                break;
              case 'bidder':
                localStorage.setItem('user',JSON.stringify({id:res._id,fName:res.fName,lName:res.lName,name:res.fName+' '+res.lName,pBody:res.pBody,approved:res.approved,bDay:res.bDay,email:res.email,pass:res.pass,role:res.role,status:res.status,uName:res.uName}))
                navigate(`/userpage/supplier/${res._id}`)
                break;
              case 'procurement department head':
                localStorage.setItem('user',JSON.stringify({id:res._id,fName:res.fName,lName:res.lName,name:res.fName+' '+res.lName,pBody:res.pBody,approved:res.approved,bDay:res.bDay,email:res.email,pass:res.pass,role:res.role,status:res.status,uName:res.uName}))
                navigate(`/userpage/phead/${res._id}`)
                break;
              case 'procurement endorsing committee head':
                localStorage.setItem('user',JSON.stringify({id:res._id,fName:res.fName,lName:res.lName,name:res.fName+' '+res.lName,pBody:res.pBody,approved:res.approved,bDay:res.bDay,email:res.email,pass:res.pass,role:res.role,status:res.status,uName:res.uName}))
                navigate(`/userpage/pendch/${res._id}`)
                break;
              default:
                navigate('*')
                break;
            }
          }
        }
       }
    })
  }

  const checkData=()=>{
    setIsLoggingIn(true)
    fetch('http://localhost:3001/login',{
      method:'post',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(input)
    })
    .then(res=>res.json())
    .then((res)=>{
      setIsLoggingIn(false)
      if(res.res=="ok"){
        input.emError=false;input.emErrorM=''
        input.pError=false;input.pErrorM=''
        setInput({...input,pError:false,pErrorM:""})
        fetchUserData(input.email)
      }else{
        if(res.res=="email")
            setInput({...input,emError:true,emErrorM:"This email doesn't exist!"})
        else if(res.res=="pass"){
           input.emError=false;input.emErrorM=''
           setInput({...input,pError:true,pErrorM:"Incorrect Password"})
      }else{
         setIsLoggingIn(false)
         setErrorLoggingIn(true)
      }
    }
    })
    .catch((err)=>{
         setIsLoggingIn(false)
         setErrorLoggingIn(true)
    })
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
      if(validator(input,"login")==="Em"){
      setInput({...input,emError:true,emErrorM:"Invalid Email Format"})
      }else{
      input.emError=false;input.emErrorM=''
      if(validator(input,"login")==="pl"){
      setInput({...input,pError:true,pErrorM:"Password must be at least 8 characters long"})
      }else{
      input.pError=false;input.pErrorM=''
      setInput({...input,pError:false,pErrorM:""})
      checkData()
      }
    }
    }

return(<>
    <div className="mb-5 Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Log In To Your <p style={{display:'inline',color:'green'}}>cheretanet</p> Account</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" style={{cursor:'pointer'}} onClick={()=>{navigate('/signup')}}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
            <TextField
          error={input.emError}
          id="outlined-error-helper-text"
          label="Email"
          name="email"
        //   defaultValue="Hello World"
          helperText={input.emErrorM}
          required
          size="small"
          style={{width:'100%'}}
          value= {input.email}
          onChange={handleChange}

        />
          </div> 
            <div className="form-group mt-3">
           <TextField
           label="Password"
           name="pass"
            size="small"
          error={input.pError}
            required
            helperText={input.pErrorM}
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
          <div className="d-grid gap-2 mt-3">
            <LoadingButton
            loading={isLoggingIn?true:false}
            loadingPosition="end"
            variant="contained"
            id="subBtn"
            style={{fontFamily:'serif',textTransform:'none',width:'35%',margin:'1rem auto',justifyContent:'center',alignItems:'center'}} 
            type="submit"
            size="small"
          >
            Log in
          </LoadingButton>
          {errorLoggingIn&&
          <span style={{justifyContent:'center',alignItems:'center',display:'flex',flexDirection:'column',maxWidth:"30rem",minHeight:'1.5rem',height:'auto',margin:'auto'}}>
            <BiError size="1.5rem" color="red" />
            <p style={{margin:'0',color:'red',fontSize:'0.8rem',fontFamily:'monospace'}}>Some Error occurred, please try again</p>
         </span>}
          
          </div>
            <div></div>
            <p className="text-center mt-2">
              <a href="#" style={{color:'brown'}}>Forgot password?</a>
            </p>
          </div>
        </form>
      </div>
      <Footer />
      </>
      
)
}

export default Login