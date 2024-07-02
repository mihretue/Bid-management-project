import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../css/Home.css";
import image2 from "../../resources/advertIcon.jpg";
import image3 from "../../resources/informaiton.png";
import image4 from "../../resources/resource.png";
import image5 from "../../resources/supplier.jpg";
import image6 from "../../resources/registration.png";
import Button from "@mui/material/Button";
import signup from "../../resources/howto.jpg";
import { useEffect } from "react";
import { FcQuestions } from "react-icons/fc";
import serv from "../../resources/serv.svg";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer";
const Home = () => {
  const navigate = useNavigate();
  const [roleFound, setRoleFound] = useState(false);
  useEffect(() => {
    document.title = "Cheretanet | Home";
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const role = JSON.parse(localStorage.getItem("user")).role;
      const id = JSON.parse(localStorage.getItem("user")).id;
      switch (role) {
        case "admin":
          navigate(`./userpage/admin/${id}`);
          return;
        case "ppa it officer":
          navigate(`./userpage/admin/${id}`);
          return;
        case "bidder":
          navigate(`./userpage/supplier/${id}`);
          return;
        case "procurement department head":
          navigate(`./userpage/phead/${id}`);
          return;
        case "procurement endorsing committee head":
          navigate(`./userpage/pendch/${id}`);
          return;
        default:
          navigate("/");
          setRoleFound(true);
      }
    }
  }, []);

  return (
    roleFound && (
      <section>
        <div
          className="welcome"
          style={{ maxWidth: "100%", minHeight: "70vh" }}
        >
          <span
            style={{
              gridColumn: "1/2",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: "1rem",
            }}
          >
            <h1 className="text-center head1 fade-in-fwd fw-bold ">
              Welcome To{" "}
              <p style={{ display: "inline", color: "#074C39" }}>cheretanet</p>
            </h1>
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                maxWidth: "40%",
              }}
              className="text-wrap"
            >
              Revolutionize Your Bidding Game - Win More, Stress Less with Our
              Bid Management Software!
            </p>
            <Link to="/login" class="animated-button">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Get Started
            </Link>
          </span>
          <span
            style={{
              gridColumn: "2/3",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <span
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img style={{ height: "20rem", maxWidth: "100%" }} src={serv} />
              <p
                style={{
                  color: "white",
                  margin: "0",
                  textAlign: "center",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                }}
              >
                cheretanet, An All-In-One Bidding Platform In Ethiopia
              </p>
            </span>
          </span>
        </div>
        <div className="fluid mt-5">
          <h2 className="fw-bold text-center">What Can We Do For You Today?</h2>
          <div className="container fluid px-4 ">
            <div className="row">
              <div className="col-6 ">
                <div className="card card_it">
                  <Link
                    to="/tenders"
                    className=" text-center text-decoration-none txt_size fw-bold"
                  >
                    <img
                      src={image2}
                      className="card-img-left  p-2 img_size"
                      alt=""
                    />
                    Advertisments
                  </Link>
                  <hr />
                  <div className="card-body">
                    <p className="card-text text-center">
                      Access tender notices of various government agencies for
                      the procurement of goods, services and works.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card card_it">
                  <Link
                    to="/tenders"
                    className=" text-center text-decoration-none txt_size fw-bold"
                  >
                    <img
                      src={image3}
                      className="card-img-left  p-2 img_size"
                      alt=""
                    />
                    Get Bid Information
                  </Link>
                  <hr />
                  <div className="card-body">
                    <p className="card-text text-center">
                      Provide access to tender statistics, tender opening
                      minutes, evaluation reports, contract awards, and other
                      procurement information.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card card_it">
                  <Link
                    to="/signup"
                    className=" text-center text-decoration-none txt_size fw-bold"
                  >
                    <img
                      src={image6}
                      className="card-img-left  p-2 img_size"
                      alt="new"
                    />
                    Registration Services
                  </Link>
                  <hr />
                  <div className="card-body">
                    <p className="card-text  text-center">
                      Register your company in the national suppliers list to be
                      able to identify government procurement opportunities and
                      participate in tenders.{" "}
                    </p>
                  </div>
                </div>
              </div>
              {/* <div className='col-6'>
                        <div className='card card_it'>
                            <Link to="/tenders" className='text-decoration-none txt_size fw-bold' >
                                <img src={image5}  className='card-img-left  p-2 img_size' alt='new' />
                                Suppliers List
                            </Link>
                            <hr />
                            <div className='card-body'>
                                <p className='card-text'>Access registered companies from the national suppliers list. Identify suppliers that are debarred from participating in government procurement.</p>    
                            </div>  

                        </div>
                    </div>
                    <div className='col-6'>
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
                    </div> */}
              <div className="col-6">
                <div className="card card_it">
                  <Link
                    to="/tenders"
                    className=" text-center text-decoration-none txt_size fw-bold"
                  >
                    <FcQuestions style={{ width: "70px", height: "70px" }} />
                    Complaints
                  </Link>
                  <hr />
                  <div className="card-body">
                    <p className="card-text  text-center">
                      Send your complaints in bidding processes{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="mb-5 container d-flex flex-column justify-content-center align-items-center bg-white mt-5"
          style={{ height: "20rem" }}
        >
          <h5
            style={{
              fontFamily:
                "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
              fontWeight: "bold",
            }}
            className=""
          >
            Steps To Be A Supplier
          </h5>
          <img
            src={signup}
            style={{ width: "60%", objectFit: "cover" }}
            alt=""
          />
        </div>
        <Footer />
      </section>
    )
  );
};
export default Home;
