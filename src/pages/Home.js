import homie2 from '../resources/homie2.png';
import React from "react";
import {Link} from "react-router-dom";
import '../css/Home.css';
import image2 from "../resources/advertIcon.jpg";
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
                        {/* <Container>
                <Row>
                    <Col sm={12}> <img src={homie2} alt="message" /></Col>
                </Row>
            </Container> */}
            {/* <Row className="justify-content-md-center ">
                <Col xs={12} sm={4} md={4}>
                    <img src={fac} alt="new start"  className='img-fluid img-thumbnail mx-auto d-block'/>
                    <br />
                    <h1 ><a href='About' className='text-decoration-none text-dark text-center'>FPPA</a></h1>
                </Col>
            </Row> */}
            {/* <div className='jsutify-content-center container fluid'>
                <img src={fac} alt="new start" />
            </div> */}
            <br />
            <br />
            <br />
            <div className='fluid'>
            <h2 className='fw-bold text-center'>What Can We Do For You Today?</h2>
            <div className='container fluid px-4'>
                <div className='row'>
                    <div className='col-lg-4 col-md-6 col-sm-12' >
                        <div className='card '>
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
                         <div className='card '>
                            <Link to="/adverts" className='text-decoration-none txt_size fw-bold' >
                                <img src={image2}  className='card-img-left  p-2 img_size'  />
                                Bid Information
                            </Link>
                            <hr />
                            <div className='card-body'>
                                <p className='card-text'>Access tender notices of various government agencies for the procurement of goods, services and works. </p>    
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-4 col-md-6 col-sm-12'>
                         <div className='card '>
                            <Link to="/adverts" className='text-decoration-none txt_size fw-bold' >
                                <img src={image2}  className='card-img-left  p-2 img_size' alt='new' />
                                Registration
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