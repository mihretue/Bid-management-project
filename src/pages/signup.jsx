import Button from '@mui/material/Button';
import {useState,useEffect} from 'react';
import {validator} from '../services/validator';
import {Link} from "react-router-dom"
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
const Signup=()=>{
    useEffect(()=>{
      document.title='Cheretanet - Sign Up'
    },[])
    const [error,setError]=useState('');
    const [input,setInput]=useState({
        fName:'',lName:'',email:'',pass:'',cPass:'',error:'',errorMessage:''
    });

    const handleSubmit=(e)=>{
      e.preventDefault();
      if(validator(input)!=='0')
        setInput({...input,error:validator(input),color:'red'})
      else{}//validated!
      }
const handleChange=(e)=>{
  const {name,value}=e.target;
  setInput({...input,[name]:value})
}
/////////////////////////

const navigateToFormStep = (stepNumber) => {
    /**
     * Hide all form steps.
     */
    document.querySelectorAll(".form-step").forEach((formStepElement) => {
        formStepElement.classList.add("d-none");
    });
    /**
     * Mark all form steps as unfinished.
     */
    document.querySelectorAll(".form-stepper-list").forEach((formStepHeader) => {
        formStepHeader.classList.add("form-stepper-unfinished");
        formStepHeader.classList.remove("form-stepper-active", "form-stepper-completed");
    });
    /**
     * Show the current form step (as passed to the function).
     */
    document.querySelector("#step-" + stepNumber).classList.remove("d-none");
    /**
     * Select the form step circle (progress bar).
     */
    const formStepCircle = document.querySelector('li[step="' + stepNumber + '"]');
    /**
     * Mark the current form step as active.
     */
    formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-completed");
    formStepCircle.classList.add("form-stepper-active");
    /**
     * Loop through each form step circles.
     * This loop will continue up to the current step number.
     * Example: If the current step is 3,
     * then the loop will perform operations for step 1 and 2.
     */
    for (let index = 0; index < stepNumber; index++) {
        /**
         * Select the form step circle (progress bar).
         */
        const formStepCircle = document.querySelector('li[step="' + index + '"]');
        /**
         * Check if the element exist. If yes, then proceed.
         */
        if (formStepCircle) {
            /**
             * Mark the form step as completed.
             */
            formStepCircle.classList.remove("form-stepper-unfinished", "form-stepper-active");
            formStepCircle.classList.add("form-stepper-completed");
        }
    }
};
/**
 * Select all form navigation buttons, and loop through them.
 */
document.querySelectorAll(".btn-navigate-form-step").forEach((formNavigationBtn) => {
    /**
     * Add a click event listener to the button.
     */
    formNavigationBtn.addEventListener("click", () => {
        /**
         * Get the value of the step.
         */
        const stepNumber = parseInt(formNavigationBtn.getAttribute("step_number"));
        /**
         * Call the function to navigate to the target form step.
         */
        navigateToFormStep(stepNumber);
    });
});
const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];
    return(<>
   <div style={{maxWidth:'80%',minHeight:'30rem',height:'auto',border:'0.1rem solid black',borderRadius:'1rem',margin:'1rem auto'}}>
    <h2 className='h2ss'>Create Your <strong>cheretanet</strong> Account</h2>
    <div id="multi-step-form-container" style={{width:'100%'}}>
        <ul className="form-stepper form-stepper-horizontal text-center mx-auto pl-0">
            <li className="form-stepper-active text-center form-stepper-list" step="1">
                <a className="mx-2">
                    <span className="form-stepper-circle">
                        <span>1</span>
                    </span>
                    <div className="label">Account Basic Details</div>
                </a>
            </li>
            <li className="form-stepper-unfinished text-center form-stepper-list" step="2">
                <a className="mx-2">
                    <span className="form-stepper-circle text-muted">
                        <span>2</span>
                    </span>
                    <div className="label text-muted">Role Details</div>
                </a>
            </li>
            <li className="form-stepper-unfinished text-center form-stepper-list" step="3">
                <a className="mx-2">
                    <span className="form-stepper-circle text-muted">
                        <span>3</span>
                    </span>
                    <div className="label text-muted">Personal Details</div>
                </a>
            </li>
        </ul>
        <form id="userAccountSetupForm" name="userAccountSetupForm" enctype="multipart/form-data" method="POST">
            <section id="step-1" className="form-step">
                <h2 className="font-normal h2ss">Tell us about yourself</h2>
                <div className="mt-3" style={{display:'flex',flexDirection:'column'}}> 
                    <TextField
          error={input.fName.error}
          label="First Name"
          placeholder='First Name'
          helperText={input.fName.errorMessage}
          required
        />
        <TextField
          error={input.lName.error}
          label="Last Name"
          placeholder='Last Name'
          helperText={input.lName.errorMessage}
          required
          style={{marginTop:'1rem'}}
        />
        <TextField
          error={input.lName.error}
          label="Email"
          placeholder='Email'
          helperText={input.email.errorMessage}
          required
          style={{marginTop:'1rem'}}
        />
                </div>
                <div className="mt-3">
                    <button className="buttonss btn-navigate-form-step" type="button" step_number="2">Next</button>
                </div>
            </section>
            <section id="step-2" className="form-step d-none">
                <h2 className="font-normal h2ss">What is your role in cheretanet?</h2>

                <div className="mt-3">
                    <div className="mt-3" style={{display:'flex',flexDirection:'column'}}> 
                    <form class="p-3">
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" id="name" placeholder="Joe Smith" />
  </div>
  
  <div class="form-group">
    <label for="seeAnotherField">Do You Want To See Another Field?</label>
    <select class="form-control" id="seeAnotherField">
          <option value="no">No Way.</option>
          <option value="yes">Absolutely!</option>
    </select>
  </div>
  
  <div class="form-group" id="otherFieldDiv">
    <label for="otherField">Here you go!</label>
    <select class="form-control" id="otherField">
      <option>Yay</option>
      <option>Woo</option>
      <option>Hazah</option>
      <option>Yipee</option>
      <option>Hoorah</option>
    </select>
  </div>
  
  <div class="form-group">
    <label for="seeAnotherFieldGroup">Do You Want To See Another Group of Fields?</label>
    <select class="form-control" id="seeAnotherFieldGroup">
          <option value="no">Not Particularly.</option>
          <option value="yes">I Guess!</option>
    </select>
  </div>
  
  <div class="form-group" id="otherFieldGroupDiv">
    <div class="row">
      <div class="col-6">
        <label for="otherField1">Group: Heres One!</label>
        <input type="text" class="form-control w-100" id="otherField1" />
      </div>
      <div class="col-6">
        <label for="otherField2">Group: Another One!</label>
        <input type="text" class="form-control w-100" id="otherField2" />
      </div>
    </div>
  </div>
  
  <div class="form-group">
    <label for="comments">Comments/Questions</label>
    <textarea class="form-control" id="comments" rows="3"></textarea><button class="btn btn-primary" type="submit">Submit</button>
   <h2>CSS</h2>
<p>The CSS here makes the form centered and look nice on desktop in case you wish to download.</p>
<textarea className="codemirror-monokai" style={{maxWidth: '900px',display: 'block',margin:'0 auto'}}>form</textarea>
</div>

</form>

                </div>
                </div>
                <div className="mt-3">
                    <button className="buttonss btn-navigate-form-step" type="button" step_number="1">Prev</button>
                    <button className="buttonss btn-navigate-form-step" type="button" step_number="3">Next</button>
                </div>
            </section>
            <section id="step-3" class="form-step d-none">
                <h2 className="font-normal h2ss">Personal Details</h2>
                <div className="mt-3">
                    Step 3 input fields goes here..
                </div>
                <div className="mt-3">
                    <button className="buttonss btn-navigate-form-step" type="button" step_number="2">Prev</button>
                    <button className="buttonss submit-btn" type="submit">Save</button>
                </div>
            </section>
        </form>
    </div>
</div>
    </>)
}

export default Signup;
// import 'whatwg-fetch';

// import {
//   getFromStorage,
//   setInStorage,
// } from '../../utils/storage';

// class Home extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isLoading: true,
//       token: '',
//       signUpError: '',
//       signInError: '',
//       signInEmail: '',
//       signInPassword: '',
//       signUpEmail: '',
//       signUpPassword: '',
//     };

//     this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
//     this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
//     this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
//     this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
    
//     this.onSignIn = this.onSignIn.bind(this);
//     this.onSignUp = this.onSignUp.bind(this);
//     this.logout = this.logout.bind(this);
//   }

//   componentDidMount() {
//     const obj = getFromStorage('the_main_app');
//     if (obj && obj.token) {
//       const { token } = obj;
//       // Verify token
//       fetch('/api/account/verify?token=' + token)
//         .then(res => res.json())
//         .then(json => {
//           if (json.success) {
//             this.setState({
//               token,
//               isLoading: false
//             });
//           } else {
//             this.setState({
//               isLoading: false,
//             });
//           }
//         });
//     } else {
//       this.setState({
//         isLoading: false,
//       });
//     }
//   }

//   onTextboxChangeSignInEmail(event) {
//     this.setState({
//       signInEmail: event.target.value,
//     });
//   }

//   onTextboxChangeSignInPassword(event) {
//     this.setState({
//       signInPassword: event.target.value,
//     });
//   }

//   onTextboxChangeSignUpEmail(event) {
//     this.setState({
//       signUpEmail: event.target.value,
//     });
//   }

//   onTextboxChangeSignUpPassword(event) {
//     this.setState({
//       signUpPassword: event.target.value,
//     });
//   }

//   onSignUp() {
//     // Grab state
//     const {
//       signUpEmail,
//       signUpPassword,
//     } = this.state;

//     this.setState({
//       isLoading: true,
//     });

//     // Post request to backend
//     fetch('/api/account/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email: signUpEmail,
//         password: signUpPassword,
//       }),
//     }).then(res => res.json())
//       .then(json => {
//         console.log('json', json);
//         if (json.success) {
//           this.setState({
//             signUpError: json.message,
//             isLoading: false,
//             signUpEmail: '',
//             signUpPassword: '',
//           });
//         } else {
//           this.setState({
//             signUpError: json.message,
//             isLoading: false,
//           });
//         }
//       });
//   }

//   onSignIn() {
//     // Grab state
//     const {
//       signInEmail,
//       signInPassword,
//     } = this.state;

//     this.setState({
//       isLoading: true,
//     });

//     // Post request to backend
//     fetch('/api/account/signin', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         email: signInEmail,
//         password: signInPassword,
//       }),
//     }).then(res => res.json())
//       .then(json => {
//         console.log('json', json);
//         if (json.success) {
//           setInStorage('the_main_app', { token: json.token });
//           this.setState({
//             signInError: json.message,
//             isLoading: false,
//             signInPassword: '',
//             signInEmail: '',
//             token: json.token,
//           });
//         } else {
//           this.setState({
//             signInError: json.message,
//             isLoading: false,
//           });
//         }
//       });
//   }

//   logout() {
//     this.setState({
//       isLoading: true,
//     });
//     const obj = getFromStorage('the_main_app');
//     if (obj && obj.token) {
//       const { token } = obj;
//       // Verify token
//       fetch('/api/account/logout?token=' + token)
//         .then(res => res.json())
//         .then(json => {
//           if (json.success) {
//             this.setState({
//               token: '',
//               isLoading: false
//             });
//           } else {
//             this.setState({
//               isLoading: false,
//             });
//           }
//         });
//     } else {
//       this.setState({
//         isLoading: false,
//       });
//     }
//   }

//   render() {
//     const {
//       isLoading,
//       token,
//       signInError,
//       signInEmail,
//       signInPassword,
//       signUpEmail,
//       signUpPassword,
//       signUpError,
//     } = this.state;

//     if (isLoading) {
//       return (<div><p>Loading...</p></div>);
//     }

//     if (!token) {
//       return (
//         <div>
//           <div>
//             {
//               (signInError) ? (
//                 <p>{signInError}</p>
//               ) : (null)
//             }
//             <p>Sign In</p>
//             <input
//               type="email"
//               placeholder="Email"
//               value={signInEmail}
//               onChange={this.onTextboxChangeSignInEmail}
//             />
//             <br />
//             <input
//               type="password"
//               placeholder="Password"
//               value={signInPassword}
//               onChange={this.onTextboxChangeSignInPassword}
//             />
//             <br />
//             <button onClick={this.onSignIn}>Sign In</button>
//           </div>
//           <br />
//           <br />
//           <div>
//             {
//               (signUpError) ? (
//                 <p>{signUpError}</p>
//               ) : (null)
//             }
//             <p>Sign Up</p>
//             <input
//               type="email"
//               placeholder="Email"
//               value={signUpEmail}
//               onChange={this.onTextboxChangeSignUpEmail}
//             /><br />
//             <input
//               type="password"
//               placeholder="Password"
//               value={signUpPassword}
//               onChange={this.onTextboxChangeSignUpPassword}
//             /><br />
//             <button onClick={this.onSignUp}>Sign Up</button>
//           </div>

//         </div>
//       );
//     }

//     return (
//       <div>
//         <p>Account</p>
//         <button onClick={this.logout}>Logout</button>
//       </div>
//     );
//   }
// }

// export default Home;