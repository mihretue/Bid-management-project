import homie2 from '../resources/homie2.png';
import React from "react";
import {Link} from "react-router-dom";
import '../css/Home.css';
import image2 from "../resources/advertIcon.jpg";
import image3 from "../resources/informaiton.png";
import image4 from "../resources/resource.png";
import image5 from "../resources/supplier.jpg";
import image6 from "../resources/registration.png";
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';


const Home = () => {
    return (
        <section>
            
            <div>
                <div >
                    <img src={homie2} className="img-fluid img-thumbnail mx-auto d-block" alt='home image ' />
                </div>
            </div>
            <br />
            <br />
            <br />
            <div className='fluid '>
            <h2 className='fw-bold text-center'>What Can We Do For You Today?</h2>
            <div className='container fluid px-4 '>
                <div className='row'>
                    <div className='col-lg-4 col-md-6 col-sm-12 ' >
                        <div className='card card_it'>
                            <Link to="/adverts" className='text-decoration-none txt_size fw-bold' >
                                <img src={image2} className='card-img-left  p-2 img_size'  />
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
                                <img src={image3}  className='card-img-left  p-2 img_size'  />
                                Bid Information
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
                                <img src={image6}  className='card-img-left  p-2 img_size' alt='new' />
                                Registration
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
                                <img src={image5}  className='card-img-left  p-2 img_size' alt='new' />
                                Suppliers List
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
                                <img src={image4}  className='card-img-left  p-2 img_size' alt='new' />
                                Resources
                            </Link>
                            <hr />
                            <div className='card-body'>
                                <p className='card-text'>Access tender notices of various government agencies for the procurement of goods, services and works. </p>    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            
        </section>
    )
}
export default Home;