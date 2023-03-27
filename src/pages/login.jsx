import { useNavigate } from "react-router-dom"
import { useEffect,useState } from "react";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
const Login=()=>{
    useEffect(()=>{document.title='Cheretanet | Log in'})
    const navigate=useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [input , setInput] = useState({email:"",pass:"",error:false,errorMessage:"",emError:false,pError:false,emErrorM:'',pErrorM:''})
    const handleClickShowPassword = (a) =>{
    setShowPassword((show) => !show);

  } 
const handleChange = (event) => {
    const {name,value}=event.target;
    setInput({...input,[name]:value})
  };
return(
    <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Log In To Your cheretanet Account</h3>
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
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="text-center mt-2">
              Forgot <a href="#">password?</a>
            </p>
          </div>
        </form>
      </div>
)
}

export default Login