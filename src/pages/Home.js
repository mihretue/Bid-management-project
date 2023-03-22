// import homie2 from '../resources/homie2.png';
import React from "react";
import {Link} from "react-router-dom";
import '../css/Home.css';
import image2 from "../resources/advertIcon.jpg";
import image3 from "../resources/informaiton.png";
import image4 from "../resources/resource.png";
import image5 from "../resources/supplier.jpg";
import image6 from "../resources/registration.png";
import Button from '@mui/material/Button';
import signup from "../resources/howto.jpg";
import {FcQuestions} from 'react-icons/fc'
// import logo4 from "../resources/logo4.png";
// import logo5 from "../resources/logo5.png";

// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';


const Home = () => {
    return (
        <section>
            

                <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',background:"#FFFFFF",width:'70%',margin:'auto',border:'0.1rem solid darkslategray',borderRadius:'1.5rem',height:'25rem'}} >
                    <h1 className='text-center head1 fade-in-fwd fw-bold '>Welcome To <p style={{display
                    :'inline',color:'#074C39'}}>cheretanet</p></h1>
                    <p style={{textAlign:'center',fontWeight:'bold',fontFamily:'sans-serif'}}>Revolutionize Your Bidding Game - Win More, Stress Less with Our Bid Management Software!
</p>
                    <Button style={{textAlign:'center',width:'28%',marginTop
                :'2rem',fontWeight:'bolder'}}variant="contained" >Get Started</Button>
                </div>
            <br /><br /><br />
 
            <div className='fluid'>
            <h2 className='fw-bold text-center'>What Can We Do For You Today?</h2>
            <div className='container fluid px-4 '>
                <div className='row'>
                    <div className='col-lg-4 col-md-6 col-sm-12 ' >
                        <div className='card card_it'>
                            <Link to="/adverts" className='text-decoration-none txt_size fw-bold' >
                                <img src={image2} className='card-img-left  p-2 img_size' alt='' />
                                Advertisments
                            </Link>
                            <hr />
                            <div className='card-body'>
                                <p className='card-text'>Access tender notices of various government agencies for the procurement of goods, services and works. </p>    
                            </div>
                        </div>

                    </div>
                    <div className='col-lg-4 col-md-6 col-sm-12'>
                        <div className='card card_it'>
                            <Link to="/adverts" className='text-decoration-none txt_size fw-bold' >
                                <img src={image3}  className='card-img-left  p-2 img_size' alt='' />
                                Get Bid Information
                            </Link>
                            <hr />
                            <div className='card-body'>
                                <p className='card-text'>Provide access to tender statistics, tender opening minutes, evaluation reports, contract awards, and other procurement information.</p>    
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-sm-12'>
                        <div className='card card_it'>
                            <Link to="/adverts" className='text-decoration-none txt_size fw-bold' >
                                <img src={image6}  className='card-img-left  p-2 img_size' alt='new' />
                                Registration Services
                            </Link>
                            <hr />
                            <div className='card-body'>
                                <p className='card-text'>Register your company in the national suppliers list to be able to identify government procurement opportunities and participate in tenders. </p>    
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-sm-12'>
                        <div className='card card_it'>
                            <Link to="/adverts" className='text-decoration-none txt_size fw-bold' >
                                <img src={image5}  className='card-img-left  p-2 img_size' alt='new' />
                                Suppliers List
                            </Link>
                            <hr />
                            <div className='card-body'>
                                <p className='card-text'>Access registered companies from the national suppliers list. Identify suppliers that are debarred from participating in government procurement.</p>    
                            </div>  

                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-sm-12'>
                        <div className='card card_it'>
                            <Link to="/adverts" className='text-decoration-none txt_size fw-bold' >
                                <img src={image4}  className='card-img-left  p-2 img_size' alt='new' />
                                Resources
                            </Link>
                            <hr />
                            <div className='card-body'>
                                <p className='card-text'>Access various electronic resources related public procurement legislation and standard bidding documents</p>    
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-sm-12'>
                        <div className='card card_it'>
                            <Link to="/adverts" className='text-decoration-none txt_size fw-bold' >
                                <FcQuestions style={{width:'70px',height:'70px'}} />
                                Complaints
                            </Link>
                            <hr />
                            <div className='card-body'>
                                <p className='card-text'>Send your complaints in bidding processes </p>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="container" style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'white',height:'20rem'}}>
                <h5 style={{fontFamily:"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>Steps To Be A Supplier</h5>
                <img src={signup} style={{width:'60%',objectFit:'cover'}} alt="" />
            </div>
        </section>
    )
}
export default Home;